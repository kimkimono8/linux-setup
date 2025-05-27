#!/bin/bash

# ========== Basic System Time Setup ==========
echo "==> ตั้ง timezone เป็น Asia/Bangkok"
sudo timedatectl set-timezone Asia/Bangkok

echo "==> ปิด RTC ใน local time (ใช้ UTC แทน, เหมาะกับ Linux)"
sudo timedatectl set-local-rtc 0 --adjust-system-clock

echo "==> เปิด NTP เพื่อ sync เวลาอัตโนมัติ"
sudo timedatectl set-ntp true

# ========== ติดตั้ง plugin สำหรับใช้ภายหลัง (ถ้ายังไม่มี) ==========
echo "==> ติดตั้ง xfce4-xkb-plugin (สำหรับแสดง layout บน panel)"
sudo apt update
sudo apt install -y xfce4-xkb-plugin

echo "✅ เสร็จเรียบร้อย! กรุณาเพิ่ม Keyboard Layout Plugin ด้วยตนเองผ่าน Panel settings"
