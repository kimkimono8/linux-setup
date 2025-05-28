#!/bin/sh

# ตั้งค่า Touchpad
xinput set-prop "DELL0815:00 044E:120A Touchpad" "libinput Tapping Enabled" 1
xinput set-prop "DELL0815:00 044E:120A Touchpad" "libinput Natural Scrolling Enabled" 1
xinput set-prop "DELL0815:00 044E:120A Touchpad" "libinput Scrolling Pixel Distance" 25

# ตั้งค่าแป้นพิมพ์
setxkbmap -layout us,th -option grp:win_space_toggle

# ตั้งค่าภาษา
export LANG=en_US.UTF-8

# เรียกใช้ Desktop Environment
exec startxfce4
