#!/bin/bash
# Claude Style Enhance 0.1.4 for Typora: uninstaller for the Mac
# https://github.com/Xv-Bowen/Claude-Style-Typora
# Written by Xv-Bowen (https://github.com/Xv-Bowen)
# Copyright (c) 2026 Xv-Bowen
# Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
# SPDX-License-Identifier: CC-BY-NC-ND-4.0
# Not affiliated with Anthropic
#
#   bash uninstall-mac.sh [/path/to/Typora.app]

set -euo pipefail

app="${1:-/Applications/Typora.app}"
page="$app/Contents/Resources/TypeMark/index.html"
themes="$HOME/Library/Application Support/abnerworks.Typora/themes"

fail() { printf '%s\n' "$*" >&2; exit 1; }

[ -f "$page" ] || fail "Typora's page is not at $page; pass the path to Typora.app."
if pgrep -xq Typora; then
    fail "Quit Typora first, then run this again."
fi

if grep -qF 'data-claude-style-enhance' "$page"; then
    if ! touch "$page" 2>/dev/null; then
        fail "macOS does not let this terminal change Typora. Allow it in System Settings > Privacy & Security > App Management, then run this again."
    fi
    tmp="$(mktemp)"
    grep -vF 'data-claude-style-enhance' "$page" > "$tmp"
    cat "$tmp" > "$page"
    rm -f "$tmp"
fi
rm -f "$themes/claude-style-enhance.js"
echo "Claude Style Enhance is removed."
