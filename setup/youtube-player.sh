#!/bin/bash

MODE=$1
YTDLP="$HOME/.local/bin/yt-dlp"
COOKIES_CMD="--cookies-from-browser firefox"
WRAPPER="/usr/local/bin/yt-dlp-wrapper"
BASENAME="/tmp/yt-$(date +%s)"

# Default output device fallback
MPV_OUTPUT=$(cat ~/.config/ytaudio-output-device 2>/dev/null || echo "pulse")

case "$MODE" in

 audio)
    read -p "Enter YouTube URL: " URL
    echo "[INFO] AUDIO: $URL" >> "$LOGFILE"
    $YTDLP $COOKIES_CMD \
      -f "ba[acodec^=mp4a]" \
      --no-playlist \
      --extract-audio \
      --audio-format mp3 \
      -o "${BASENAME}.%(ext)s" "$URL"
   mpv --no-video "${BASENAME}.mp3" --log-file="$LOGFILE"
    rm -f "${BASENAME}.mp3"
    ;;

  audio-playlist)
    read -p "Enter YouTube playlist URL: " URL
    read -p "How many songs to stream? (e.g. 5, 10, leave blank for all): " COUNT
    WORKDIR="/tmp/ytaudiostream-$(date +%s)"
    mkdir -p "$WORKDIR"
    [[ -n "$COUNT" ]] && PLAYLIST_ITEMS="--playlist-items 1-$COUNT"
    $YTDLP $COOKIES_CMD $PLAYLIST_ITEMS --flat-playlist \
      --print "https://www.youtube.com/watch?v=%(id)s" \
      "$URL" > "$WORKDIR/streamlist.m3u"
    mpv --no-video \
      --ytdl-format="ba[acodec^=mp4a]/ba" \
      --script-opts=ytdl_hook-ytdl_path="$WRAPPER" \
      --playlist="$WORKDIR/streamlist.m3u" \
      --log-file="$LOGFILE"
    rm -rf "$WORKDIR"
    ;;

  lite)
    read -p "Enter YouTube URL: " URL
    TMP="/tmp/ytlite-$(date +%s).mp4"
    $YTDLP $COOKIES_CMD \
      -f "bv*[height<=720][vcodec^=avc1]+ba[acodec^=mp4a]/b[height<=720]" \
      --merge-output-format mp4 \
      -o "$TMP" "$URL"
    mpv "$TMP"
    rm -f "$TMP"
    ;;

  hq)
    read -p "Enter YouTube URL: " URL
    TMP="/tmp/ythq-$(date +%s).mp4"
    $YTDLP $COOKIES_CMD \
      -f "bv*[height<=1080][vcodec^=avc1]+ba[acodec^=mp4a]/b[height<=1080]" \
      --merge-output-format mp4 \
      -o "$TMP" "$URL"
    mpv "$TMP"
    rm -f "$TMP"
    ;;

  play)
    read -p "Enter YouTube playlist URL: " URL
    read -p "How many videos to download and play? (e.g. 5, 10, leave blank for all): " COUNT
    WORKDIR="/tmp/ytplay-$(date +%s)"
    mkdir -p "$WORKDIR"
    [[ -n "$COUNT" ]] && PLAYLIST_ITEMS="--playlist-items 1-$COUNT"
    $YTDLP $COOKIES_CMD $PLAYLIST_ITEMS \
      -f "bv*[height<=1080][vcodec^=avc1]+ba[acodec^=mp4a]/b[height<=1080]" \
      --merge-output-format mp4 \
      -o "$WORKDIR/%(playlist_index,number)02d - %(title).200s.%(ext)s" "$URL"
    find "$WORKDIR" -iname "*.mp4" | sort > "$WORKDIR/playlist.m3u"
    mpv --hwdec=vaapi --playlist="$WORKDIR/playlist.m3u"
    rm -rf "$WORKDIR"
    ;;

  stream)
      read -p "Enter YouTube Playlist URL: " URL
      read -p "How many videos to stream? (e.g. 5, 10): " COUNT
      WORKDIR="/tmp/ytstream-$(date +%s)"
      mkdir -p "$WORKDIR"
      [[ -n "$COUNT" ]] && PLAYLIST_ITEMS="--playlist-items 1-$COUNT"
      $YTDLP $COOKIES_CMD $PLAYLIST_ITEMS --flat-playlist \
        --print "https://www.youtube.com/watch?v=%(id)s" "$URL" \
        > "$WORKDIR/streamlist.m3u"
      mpv --hwdec=vaapi \
        --ytdl-format="bv*[height<=1080][vcodec^=avc1]+ba" \
        --script-opts=ytdl_hook-ytdl_path="$WRAPPER" \
        --playlist="$WORKDIR/streamlist.m3u" \
        --log-file="$LOGFILE"
      rm -rf "$WORKDIR"
      ;;

  *)
    echo "Usage: youtube-player.sh [audio|audio-playlist|hq|lite|play|stream]"
    ;;
esac
