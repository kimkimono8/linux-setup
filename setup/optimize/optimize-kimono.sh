#!/bin/bash
echo "=== 🧠 Kimono Optimizer Starting ==="

### 1. Enable zswap with lz4
echo "[1/6] Configuring zswap..."
sudo sed -i 's/GRUB_CMDLINE_LINUX_DEFAULT=".*"/GRUB_CMDLINE_LINUX_DEFAULT="quiet splash zswap.enabled=1 zswap.compressor=lz4 zswap.max_pool_percent=20"/' /etc/default/grub
sudo update-grub

### 2. Install TLP and disable USB autosuspend
echo "[2/6] Installing TLP..."
sudo apt update && sudo apt install -y tlp
sudo systemctl enable tlp && sudo systemctl start tlp
sudo sed -i 's/^#*\s*USB_AUTOSUSPEND=.*/USB_AUTOSUSPEND=0/' /etc/tlp.conf
sudo systemctl restart tlp

### 3. Fix .xinitrc
echo "[3/6] Updating .xinitrc..."
cat << EOF > ~/.xinitrc
#!/bin/bash
xrdb -merge ~/.Xresources &
xsetroot -solid "#000000" &
exec startxfce4
EOF
chmod +x ~/.xinitrc

### 4. Limit Jellyfin service
echo "[4/6] Configuring Jellyfin resource limits..."
sudo mkdir -p /etc/systemd/system/jellyfin.service.d
cat << EOF | sudo tee /etc/systemd/system/jellyfin.service.d/limits.conf
[Service]
CPUQuota=40%
Nice=10
IOWeight=50
MemoryMax=1.5G
EOF

### 5. Create systemd for OpenVINO multi-projects
echo "[5/6] Creating OpenVINO inference service..."
cat << EOF | sudo tee /etc/systemd/system/openvino-infer.service
[Unit]
Description=OpenVINO 24/7 Inference Runner
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/openvino-launcher.sh
Restart=always
Nice=-5
CPUWeight=100
IOWeight=100
MemoryHigh=6G

[Install]
WantedBy=multi-user.target
EOF

### 6. Create runner script
echo "[6/6] Creating OpenVINO launcher..."
cat << 'EOF' | sudo tee /usr/local/bin/openvino-launcher.sh
#!/bin/bash
for script in /home/kimono/*/infer*.sh; do
  if [[ -x "$script" ]]; then
    echo "Launching: $script"
    nice -n -5 ionice -c1 -n0 "$script" &
  fi
done
wait
EOF
sudo chmod +x /usr/local/bin/openvino-launcher.sh

# Reload systemd
sudo systemctl daemon-reexec
sudo systemctl daemon-reload
sudo systemctl enable --now openvino-infer
sudo systemctl restart jellyfin

echo "=== ✅ Optimization complete. Please reboot to enable zswap ==="
