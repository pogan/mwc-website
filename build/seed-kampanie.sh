#!/bin/zsh
set -e
BASE="/private/tmp/claude-501/bundled-skills/2.1.251/af7c463d5f8a4eb8505d63d6d31ac2db/design"
cd "$(dirname "$0")"
ARGS=()
for f in kampanie/*.dc.html; do ARGS+=(--artboard "$f"); done
for f in kampanie/bg-*.jpg; do ARGS+=(--image "$f"); done
node "$BASE/seed-canvas.mjs" \
  --template "$BASE/payload.template.html" \
  --out ../kampanie-marczykowska.html \
  --title "Kampanie — Marczykowska" \
  "${ARGS[@]}" \
  --canvas kampanie/canvas.json
