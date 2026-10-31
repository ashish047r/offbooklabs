#!/usr/bin/env bash
# Makes web copies of the HQ launch videos.
#   videos/<name>-preview.mp4  720p, muted, for the looping card (loads on scroll)
#   videos/<name>.mp4          1080p with sound, for the full-screen player (loads on click)
#   posters/<name>.jpg         frame 0 (the poster baked into each video)
set -euo pipefail
SRC=${1:?usage: prep_videos.sh <folder with *-1080p-HQ.mp4> <out dir>}
OUT=${2:?}
for f in "$SRC"/*-1080p-HQ.mp4; do
  n=$(basename "$f" -1080p-HQ.mp4); n=${n%-server}   # meta-ads-mcp-server -> meta-ads-mcp
  ffmpeg -loglevel error -y -i "$f" -an -vf scale=1280:-2 -c:v libx264 -preset slow -crf 27 \
    -pix_fmt yuv420p -movflags +faststart "$OUT/videos/$n-preview.mp4"
  ffmpeg -loglevel error -y -i "$f" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
    -c:a aac -b:a 128k -movflags +faststart "$OUT/videos/$n.mp4"
  ffmpeg -loglevel error -y -i "$f" -frames:v 1 -vf scale=1280:-2 -q:v 3 "$OUT/posters/$n.jpg"
  echo "done $n"
done
