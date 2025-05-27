#!/bin/bash

# 🔊 YouTube lite audio/video player (for music-focused, low RAM use)

read -p "Enter YouTube URL: " URL

# TEMP FILE
TMP="/tmp/ytlite-$(date +%s).mp4"

# 🎯 Select lightweight formats only
FORMAT="bv*[height<=720][vcodec^=avc1]+ba[acodec^=mp4a]/b[height<=720]"

# ✅ Download and auto-merge using yt-dlp
yt-dlp --cookies ~/.config/yt-dlp/cookies.txt \
  -f "$FORMAT" \
  --merge-output-format mp4 \
  -o "$TMP" \
  "$URL"

# ❓ ถ้าโหลดสำเร็จ ค่อยเปิด mpv
if [[ -f "$TMP" ]]; then
    echo -e "\n🎧 Playing with mpv..."
    
    # ถ้าอยาก "ฟังอย่างเดียว" เปิดแค่เสียง
    read -p "Audio-only mode? (y/n): " MODE
    if [[ "$MODE" == "y" || "$MODE" == "Y" ]]; then
        mpv --no-video "$TMP"
    else
        mpv "$TMP"
    fi

    echo -e "\n🧹 Cleaning up..."
    rm -f "$TMP"
else
    echo "❌ Failed to download or merge video."
fi
