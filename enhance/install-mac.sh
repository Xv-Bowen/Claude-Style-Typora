#!/bin/bash
# Claude Style Enhance 0.1.4 for Typora: installer for the Mac
# https://github.com/Xv-Bowen/Claude-Style-Typora
# Written by Xv-Bowen (https://github.com/Xv-Bowen)
# Copyright (c) 2026 Xv-Bowen
# Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
# SPDX-License-Identifier: CC-BY-NC-ND-4.0
# Not affiliated with Anthropic
#
#   bash install-mac.sh [/path/to/Typora.app]

set -euo pipefail

app="${1:-/Applications/Typora.app}"
page="$app/Contents/Resources/TypeMark/index.html"
themes="$HOME/Library/Application Support/abnerworks.Typora/themes"
here="$(cd "$(dirname "$0")" && pwd)"
script="$here/claude-style-enhance.js"
backup="$HOME/Library/Application Support/abnerworks.Typora/claude-style-enhance-index.html"
anchor='<script src="./appsrc/main.js" aria-hidden="true" defer></script>'

fail() { printf '%s\n' "$*" >&2; exit 1; }

[ -f "$page" ] || fail "Typora's page is not at $page; pass the path to Typora.app."
[ -f "$script" ] || fail "claude-style-enhance.js is not next to this script ($here)."
[ -d "$themes" ] || fail "Typora's theme folder is not at $themes; open Typora once first."
if pgrep -xq Typora; then
    fail "Quit Typora first, then run this again."
fi
grep -qF "$anchor" "$page" || fail "This Typora's page has changed; the line cannot be added safely."

encode() {
    local LC_ALL=C text="$1" out="" char i
    for ((i = 0; i < ${#text}; i++)); do
        char="${text:i:1}"
        case "$char" in
            [A-Za-z0-9/._~-]) out+="$char" ;;
            *) out+="$(printf '%%%02X' "'$char")" ;;
        esac
    done
    printf '%s' "$out"
}
url="file://$(encode "$themes/claude-style-enhance.js")"
line="	<script src=\"$url\" defer data-claude-style-enhance></script>"

if ! touch "$page" 2>/dev/null; then
    fail "macOS does not let this terminal change Typora. Either allow it in System Settings > Privacy & Security > App Management, or run: sudo xattr -dr com.apple.provenance \"$app\""
fi

cp "$script" "$themes/claude-style-enhance.js"
[ -f "$backup" ] || cp "$page" "$backup"

tmp="$(mktemp)"
grep -vF 'data-claude-style-enhance' "$page" | awk -v anchor="$anchor" -v line="$line" '
    { print }
    index($0, anchor) && !done { print line; done = 1 }
' > "$tmp"
cat "$tmp" > "$page"
rm -f "$tmp"

grep -qF 'data-claude-style-enhance' "$page" || fail "The line was not added."
echo "Claude Style Enhance is installed. Open Typora and choose a Claude Style theme."
