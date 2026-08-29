#!/bin/zsh
set -e
BASE="/private/tmp/claude-501/bundled-skills/2.1.251/b99e484980246d78cea582c60ed86121/design"
cd "$(dirname "$0")"
ARGS=()
for f in art/*.dc.html; do ARGS+=(--artboard "$f"); done
node "$BASE/seed-canvas.mjs" \
  --template "$BASE/payload.template.html" \
  --out ../faq-carousele-slubne.html \
  --title "FAQ Carousele — Śluby" \
  "${ARGS[@]}" \
  --image art/bg.jpg \
  --canvas art/canvas.json
