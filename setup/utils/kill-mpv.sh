#!/bin/bash

echo "🧹 Killing active mpv processes..."

# Kill only non-defunct (non-zombie) processes
ps -eo pid,stat,cmd | grep '[m]pv' | while read -r pid stat cmd; do
    if [[ $stat != *Z* ]]; then
        echo "Killing PID $pid ($cmd)"
        kill -9 "$pid"
    else
        echo "⚠️ Skipping zombie PID $pid ($cmd)"
    fi
done
