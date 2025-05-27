#!/bin/bash

DIR="${1:-$HOME/Music}"
echo "🎼 Scanning FLAC files in: $DIR"

find "$DIR" -type f -iname "*.flac" -print0 | while IFS= read -r -d '' file; do
  echo -e "\n🎵 $file"
  mediainfo --Inform="Audio;Format                           : %Format%\nSampling rate                    : %SamplingRate/String%\nBit rate                         : %BitRate/String%\nBit depth                        : %BitDepth% bits\n" "$file"
done
