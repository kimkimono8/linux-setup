#!/bin/bash
set -e

echo "🔥 เริ่ม Setup ระบบ Kimono Minimal..."

### 1. อัปเดตระบบ
sudo apt update && sudo apt upgrade -y

### 2. ติดตั้ง XFCE Desktop + TigerVNC
sudo apt install -y xfce4 xfce4-goodies tigervnc-standalone-server dbus-x11 x11-xserver-utils xinit xinput

### 3. ปิด LightDM (ถ้าเคยติดตั้งไว้)
sudo systemctl disable lightdm || true
sudo systemctl stop lightdm || true
sudo apt remove -y lightdm || true

### 4. สร้างไฟล์ .xinitrc สำหรับ startx
echo "exec startxfce4" > ~/.xinitrc
chmod +x ~/.xinitrc

### 5. ติดตั้งของสำคัญ
sudo apt install -y git curl htop net-tools neofetch xfce4-terminal ntfs-3gunzip bash-completion

### 6. ติดตั้ง Python + pyenv
sudo apt install -y build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget llvm libncursesw5-dev xz-utils \
tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev python3-pip

curl https://pyenv.run | bash

echo '
# >>> pyenv config >>>
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
# <<< pyenv config <<<
' >> ~/.bashrc

source ~/.bashrc

pyenv install 3.10.9
pyenv install 3.13.0
pyenv global 3.13.0

### 7. setup NFS
echo "🗂️  กำลังเพิ่ม mount entries ไปยัง /etc/fstab..."

# === สร้างโฟลเดอร์ปลายทางก่อน (ถ้ายังไม่มี) ===
sudo mkdir -p /mnt/DS220J/NFS/{Backup,Downloads,Media,Musics,Surveillance}
sudo mkdir -p /mnt/ext_hdd_1

# === เพิ่ม fstab entries ===
FSTAB_FILE="/etc/fstab"

NFS_ENTRIES=$(cat <<EOF

# === NFS Mounts ===
192.168.1.30:/volume1/Backup        /mnt/DS220J/NFS/Backup        nfs  rw,soft,intr,x-systemd.automount,_netdev  0  0
192.168.1.30:/volume1/DOWNLOADS     /mnt/DS220J/NFS/Downloads     nfs  rw,soft,intr,x-systemd.automount,_netdev  0  0
192.168.1.30:/volume1/Media         /mnt/DS220J/NFS/Media         nfs  rw,soft,intr,x-systemd.automount,_netdev  0  0
192.168.1.30:/volume1/music         /mnt/DS220J/NFS/Musics        nfs  rw,soft,intr,x-systemd.automount,_netdev  0  0
192.168.1.30:/volume1/surveillance  /mnt/DS220J/NFS/Surveillance  nfs  rw,soft,intr,x-systemd.automount,_netdev  0  0
EOF
)

NTFS_ENTRY=$(cat <<EOF

# === External NTFS Drive ===
UUID=B4EE4EEFEE4EAA06  /mnt/ext_hdd_1  ntfs-3g  uid=jellyfin,gid=jellyfin,umask=0022,defaults  0  0
EOF
)

# === ตรวจสอบและเพิ่มหากยังไม่มีอยู่ ===
if ! grep -q "192.168.1.30:/volume1/Backup" "$FSTAB_FILE"; then
    echo "$NFS_ENTRIES" | sudo tee -a "$FSTAB_FILE" > /dev/null
    echo "$NTFS_ENTRY" | sudo tee -a "$FSTAB_FILE" > /dev/null
    echo "✅ เพิ่ม fstab entries เรียบร้อย"
else
    echo "ℹ️  fstab มีข้อมูลนี้อยู่แล้ว, ข้ามการเพิ่ม"
fi

### เพิ่ม PATH สำหรับ scripts และโฟลเดอร์ย่อย (1 ชั้น) ใน ~/.bashrc
echo "🛠️ กำลังตั้งค่า PATH สำหรับ scripts folder..."

read -r -d '' ADD_PATH_CODE <<'EOF'

# --- BEGIN Kimono scripts PATH ---
export PATH="$HOME/scripts:$PATH"
for dir in "$HOME/scripts"/*/ ; do
  if [ -d "$dir" ]; then
    export PATH="$dir:$PATH"
  fi
done
# --- END Kimono scripts PATH ---

EOF

# ตรวจสอบว่ามีการตั้งค่าแล้วหรือยัง
if ! grep -q "BEGIN Kimono scripts PATH" ~/.bashrc; then
  echo "$ADD_PATH_CODE" >> ~/.bashrc
  echo "✅ เพิ่ม PATH ใน ~/.bashrc เรียบร้อย"
else
  echo "ℹ️ PATH สำหรับ scripts ถูกตั้งค่าไว้แล้วใน ~/.bashrc"
fi

# (ขั้นตอนอื่น ๆ ของ setup ... )

echo "🔄 รีโหลด systemd daemon..."
sudo systemctl daemon-reexec
sudo mount -a
echo "✅ เสร็จสิ้นการตั้งค่า! กรุณาเปิด shell ใหม่หรือรัน 'source ~/.bashrc' เพื่อใช้งาน PATH ใหม่"

### 8. ติดตั้ง Home Assistant
mkdir -p ~/homeassistant
cd ~/homeassistant
pyenv shell 3.13.0
python -m venv venv_HASS
source venv_HASS/bin/activate
pip install --upgrade pip
pip install homeassistant

### 9. ติดตั้ง Jellyfin Media Server
echo "🎥 กำลังติดตั้ง Jellyfin Media Server..."

# ติดตั้งแพ็กเกจพื้นฐานที่จำเป็น
sudo apt install -y apt-transport-https gnupg2 curl

# เพิ่ม GPG key ของ Jellyfin
curl -fsSL https://repo.jellyfin.org/ubuntu/jellyfin_team.gpg.key | gpg --dearmor | sudo tee /etc/apt/keyrings/jellyfin.gpg > /dev/null

# เพิ่ม repository ของ Jellyfin (Ubuntu 24.04)
echo "deb [signed-by=/etc/apt/keyrings/jellyfin.gpg arch=$(dpkg --print-architecture)] https://repo.jellyfin.org/ubuntu $(lsb_release -cs) main" | \
  sudo tee /etc/apt/sources.list.d/jellyfin.list > /dev/null

# อัปเดตรายการแพ็กเกจ
sudo apt update

# ติดตั้ง Jellyfin
sudo apt install -y jellyfin

echo "✅ ติดตั้ง Jellyfin เรียบร้อยแล้ว!"
echo "📺 เปิดใช้งานที่: http://localhost:8096 หรือ http://<ip-address>:8096"


### 10. ติดตั้ง VSCode (minimal)
wget -qO - https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install -y code
rm -f packages.microsoft.gpg

### 11. ตั้งค่าแป้นพิมพ์ไทย Pattachote + toggle ภาษา
echo 'setxkbmap -layout us,th -variant ,pat -option grp:win_space_toggle' >> ~/.xprofile
chmod +x ~/.xprofile

### 12. ตั้งค่า VNC startup XFCE
mkdir -p ~/.vnc
cat << 'EOF' > ~/.vnc/xstartup
#!/bin/sh
unset SESSION_MANAGER
unset DBUS_SESSION_BUS_ADDRESS
exec startxfce4
EOF

chmod +x ~/.vnc/xstartup

### 13. สั่งรัน VNC ครั้งแรกให้ตั้งรหัส
vncserver -kill :1 >/dev/null 2>&1 || true
vncserver :1
vncserver -kill :1

### 14. ตั้ง auto-start VNC ตอนบูต
(crontab -l 2>/dev/null; echo "@reboot /usr/bin/vncserver -localhost no :1") | crontab -


echo "✅ เสร็จแล้ว! Reboot เครื่อง แล้วเชื่อม VNC ที่ :1 ได้เลย"
