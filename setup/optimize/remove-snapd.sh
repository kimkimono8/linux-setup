#!/bin/bash
echo "📦 Removing cloud-init and snapd..."
sudo systemctl disable cloud-config.service cloud-final.service cloud-init-local.service cloud-init.service
sudo apt purge -y cloud-init snapd
sudo rm -rf /etc/cloud /var/lib/cloud /var/snap /snap ~/snap /var/cache/snapd

echo "⚙️ Disabling unnecessary services..."
SERVICES=(
    ModemManager.service
    avahi-daemon.service
    open-iscsi.service
    rpcbind.service
    rpc-statd.service
    unattended-upgrades.service
)

for svc in "${SERVICES[@]}"; do
    echo "Disabling $svc..."
    sudo systemctl disable "$svc"
done

echo "🧹 Cleaning up..."
sudo apt autoremove -y
sudo apt autoclean

echo "✅ Done. Reboot recommended!"
