#!/bin/zsh
set -e
BASE="/private/tmp/claude-501/bundled-skills/2.1.251/af7c463d5f8a4eb8505d63d6d31ac2db/design"
cd "$(dirname "$0")"
ARGS=()
for f in art/*.dc.html; do ARGS+=(--artboard "$f"); done
for f in art/bg-*.jpg; do ARGS+=(--image "$f"); done
node "$BASE/seed-canvas.mjs" \
  --template "$BASE/payload.template.html" \
  --out ../faq-carousele-slubne.html \
  --title "FAQ Carousele — Śluby" \
  "${ARGS[@]}" \
  --canvas art/canvas.json
