#!/bin/bash

set -e

echo "🎬 Installing YouTube CLI system..."

# Install dependencies
sudo apt update
sudo apt install -y mpv python3-pip pipx curl

# Ensure pipx in PATH
pipx ensurepath
export PATH="$HOME/.local/bin:$PATH"

# Install yt-dlp via pipx
pipx install yt-dlp
pipx inject yt-dlp keyring browser-cookie3

# Wrapper path
WRAPPER_PATH="/usr/local/bin/yt-dlp-wrapper"

echo "🛠️  Creating yt-dlp-wrapper at $WRAPPER_PATH"
sudo tee "$WRAPPER_PATH" > /dev/null <<EOF
#!/bin/bash
exec $HOME/.local/pipx/venvs/yt-dlp/bin/yt-dlp --cookies-from-browser brave "\$@"
EOF
sudo chmod +x "$WRAPPER_PATH"

# Set mpv config
echo "🧠 Setting up mpv.conf..."
mkdir -p ~/.config/mpv
tee ~/.config/mpv/mpv.conf > /dev/null <<EOF
script-opts=ytdl_hook-ytdl_path=$WRAPPER_PATH
hwdec=vaapi
vo=gpu
profile=gpu-hq
ytdl-format=bestvideo[height<=1080][vcodec^=avc1]+bestaudio[acodec^=mp4a]/best
demuxer-max-bytes=20480K
sub-auto=no
EOF

# youtube-player.sh path
PLAYER_SCRIPT=~/.config/youtube-player.sh

echo "🎛️  Writing youtube-player.sh..."
mkdir -p ~/.config
tee "$PLAYER_SCRIPT" > /dev/null <<'EOF'
#!/bin/bash

MODE=$1
YTDLP="$HOME/.local/pipx/venvs/yt-dlp/bin/yt-dlp"
COOKIES_CMD="--cookies-from-browser brave"
WRAPPER="/usr/local/bin/yt-dlp-wrapper"
LOGFILE="/tmp/youtube-player.log"
BASENAME="/tmp/yt-$(date +%s)"

echo -e "\n[$(date)] MODE: $MODE" >> "$LOGFILE"

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
    mpv "$TMP" --log-file="$LOGFILE"
    rm -f "$TMP"
    ;;

  hq)
    read -p "Enter YouTube URL: " URL
    TMP="/tmp/ythq-$(date +%s).mp4"
    $YTDLP $COOKIES_CMD \
      -f "bv*[height<=1080][vcodec^=avc1]+ba[acodec^=mp4a]/b[height<=1080]" \
      --merge-output-format mp4 \
      -o "$TMP" "$URL"
    mpv "$TMP" --log-file="$LOGFILE"
    rm -f "$TMP"
    ;;

  play)
    read -p "Enter YouTube playlist URL: " URL
    read -p "How many videos to download and play? (e.g. 5, 10): " COUNT
    WORKDIR="/tmp/ytplay-$(date +%s)"
    mkdir -p "$WORKDIR"
    [[ -n "$COUNT" ]] && PLAYLIST_ITEMS="--playlist-items 1-$COUNT"
    $YTDLP $COOKIES_CMD $PLAYLIST_ITEMS \
      -f "bv*[height<=1080][vcodec^=avc1]+ba[acodec^=mp4a]/b[height<=1080]" \
      --merge-output-format mp4 \
      -o "$WORKDIR/%(playlist_index,number)02d - %(title).200s.%(ext)s" "$URL"
    find "$WORKDIR" -iname "*.mp4" | sort > "$WORKDIR/playlist.m3u"
    mpv --hwdec=vaapi --playlist="$WORKDIR/playlist.m3u" --log-file="$LOGFILE"
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
EOF

chmod +x "$PLAYER_SCRIPT"

# Set aliases
echo "🔗 Creating aliases in ~/.bashrc..."
tee -a ~/.bashrc > /dev/null <<EOF

# YouTube CLI aliases
alias yt-audio='bash ~/.config/youtube-player.sh audio'
alias yt-audio-playlist='bash ~/.config/youtube-player.sh audio-playlist'
alias yt-lite='bash ~/.config/youtube-player.sh lite'
alias yt-hq='bash ~/.config/youtube-player.sh hq'
alias yt-play='bash ~/.config/youtube-player.sh play'
alias yt-stream='bash ~/.config/youtube-player.sh stream'
EOF

echo "✅ Setup complete! Please run: source ~/.bashrc"
