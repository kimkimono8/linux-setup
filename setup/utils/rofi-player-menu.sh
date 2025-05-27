#!/bin/bash

choice=$(printf "🎵 Local\n🎧 YouTube\n📡 Jellyfin\n" | rofi -dmenu -p "Select source")

case "$choice" in
  🎵*)
    find /mnt/DS220J/NFS/ -type f -iname "*.flac" \
      | sort | mpv --playlist=- --shuffle --loop-playlist=inf \
      --audio-device=alsa/plughw:CARD=Q3,DEV=0 \
      --audio-samplerate=192000 \
      --af=format=s32 \
      --log-file=/tmp/mpv.log
    grep -E 'AO: \|format:' /tmp/mpv.log  # แสดง output ของ audio
    ;;
  🎧*)
    bash ~/.config/youtube-player.sh audio-playlist
    ;;
  📡*)
    jellyfin-mpv-shim
    ;;
esac
