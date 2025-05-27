#!/bin/bash

params=$(cat /proc/asound/card*/pcm*/sub*/hw_params 2>/dev/null)
rate=$(echo "$params" | grep rate | awk '{print $2}')
format=$(echo "$params" | grep format | awk '{print $2}')
notify-send "🎶 Audio Format: $format @ ${rate}Hz"
