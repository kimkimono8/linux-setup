find /mnt/DS220J/NFS/Musics -type f \( -iname "*.flac" -o -iname "*.wav" -o -iname "*.mp3" \) \
  | sort | mpv --playlist=- --shuffle --loop-playlist=inf
