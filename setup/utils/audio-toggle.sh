#!/bin/bash

# Define sink names
Q3="alsa_output.usb-GuangZhou_FiiO_Electronics_Co._Ltd_FiiO_Q3_FA340447-00.analog-stereo"
BT="bluez_sink.54_B7_E5_85_98_80.a2dp_sink"
INT="alsa_output.pci-0000_00_1f.3.analog-stereo"

STATE_FILE="$HOME/.config/ytaudio-output-device"

# Get current sink and all available sinks
current=$(pactl get-default-sink)
available_sinks=$(pactl list short sinks | awk '{print $2}')

# Helper: check if sink exists
is_sink_available() {
  echo "$available_sinks" | grep -Fxq "$1"
}

# Rotation logic: Q3 → BT → INT → Q3 ...
next_sink="$INT"  # Default fallback

if [[ "$current" == "$Q3" ]]; then
  if is_sink_available "$BT"; then
    next_sink="$BT"
    msg="🔊 Output → B&O Bluetooth"
  elif is_sink_available "$INT"; then
    next_sink="$INT"
    msg="🔈 Output → Built-in Speaker"
  fi
elif [[ "$current" == "$BT" ]]; then
  if is_sink_available "$INT"; then
    next_sink="$INT"
    msg="🔈 Output → Built-in Speaker"
  elif is_sink_available "$Q3"; then
    next_sink="$Q3"
    msg="🎧 Output → Fiio Q3"
  fi
else
  if is_sink_available "$Q3"; then
    next_sink="$Q3"
    msg="🎧 Output → Fiio Q3"
  elif is_sink_available "$BT"; then
    next_sink="$BT"
    msg="🔊 Output → B&O Bluetooth"
  fi
fi

# Set sink and log it
if is_sink_available "$next_sink"; then
  pactl set-default-sink "$next_sink"
  echo "$next_sink" > "$STATE_FILE"
  notify-send "$msg"
else
  notify-send "⚠️ No available sinks found!"
fi
