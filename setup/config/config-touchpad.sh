#!/bin/bash

# ชื่ออุปกรณ์ Touchpad (ต้องเปลี่ยนตามเครื่อง ถ้าไม่ตรง)
TOUCHPAD_NAME="DELL0815:00 044E:120A Touchpad"

# ตรวจสอบว่าอุปกรณ์มีจริงก่อนตั้งค่า
if xinput list | grep -q "$TOUCHPAD_NAME"; then
    echo "พบ Touchpad: $TOUCHPAD_NAME"
else
    echo "ไม่พบ Touchpad: $TOUCHPAD_NAME"
    echo "กรุณาใช้ 'xinput list' เพื่อหาชื่อที่ถูกต้อง แล้วแก้ในสคริปต์"
    exit 1
fi

echo "ตั้งค่าระบบ..."

# สร้าง ~/.xinitrc
cat <<EOF > ~/.xinitrc
#!/bin/sh

# ตั้งค่า Touchpad
xinput set-prop "$TOUCHPAD_NAME" "libinput Tapping Enabled" 1
xinput set-prop "$TOUCHPAD_NAME" "libinput Natural Scrolling Enabled" 1
xinput set-prop "$TOUCHPAD_NAME" "libinput Scrolling Pixel Distance" 25

# ตั้งค่าแป้นพิมพ์
setxkbmap -layout us,th -option grp:win_space_toggle

# ตั้งค่าภาษา
export LANG=th_TH.UTF-8

# เรียกใช้ Desktop Environment
exec startxfce4
EOF

chmod +x ~/.xinitrc
echo "สร้าง ~/.xinitrc เรียบร้อย"

# แนะนำการใช้งาน
echo
echo "✅ เสร็จสิ้น! ใช้ 'startx' เพื่อเริ่มใช้งาน XFCE พร้อมตั้งค่าที่กำหนด"
