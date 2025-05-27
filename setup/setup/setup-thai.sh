#!/bin/bash

echo "📦 Installing Thai and Emoji fonts + language support..."

# ติดตั้งฟอนต์ไทย + อีโมจิ + ภาษาไทย
sudo apt update
sudo apt install -y fonts-thai-tlwg fonts-noto fonts-noto-cjk fonts-noto-color-emoji \
  language-pack-th ibus ibus-m17n

echo "🌐 Generating Thai locale..."
sudo locale-gen th_TH.UTF-8

echo "🔧 Configuring ~/.xinitrc..."
cat <<EOF > ~/.xinitrc
#!/bin/sh

# ตั้งค่าแป้นพิมพ์ให้สลับ US/TH ด้วย Super+Space
setxkbmap -layout us,th -option grp:win_space_toggle

# ตั้งค่าภาษา
export LANG=th_TH.UTF-8

# เริ่มต้น XFCE
exec startxfce4
EOF

chmod +x ~/.xinitrc

echo "🧩 Configuring font rendering for terminal..."

# ตั้งค่าให้ Terminal ใช้ฟอนต์ Noto Sans Mono Thai (หรือเลือกฟอนต์ที่คุณชอบ)
cat <<EOF > ~/.Xresources
URxvt.font: xft:Noto Sans Mono:size=12
XTerm*faceName: Noto Sans Mono
XTerm*faceSize: 12
EOF

# โหลดการตั้งค่าฟอนต์เข้า X (ถ้าใช้ Xresources)
xrdb -merge ~/.Xresources

# รีโหลด font cache
fc-cache -fv

echo "✅ Setup complete! Try 'startx' or re-login to see effects."
