#!/bin/bash
# Claude Style Enhance 0.1.3 for Typora: installer for Linux
# https://github.com/Xv-Bowen/Claude-Style-Typora
# Written by Xv-Bowen (https://github.com/Xv-Bowen)
# Copyright (c) 2026 Xv-Bowen
# Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
# SPDX-License-Identifier: CC-BY-NC-ND-4.0
# Not affiliated with Anthropic
#
#   sudo bash install-linux.sh [--path /path/to/typora]

set -euo pipefail

fail() { printf '%s\n' "$*" >&2; exit 1; }

put() {
    if [ -n "$(tail -c 1 "$2")" ]; then printf '%s' "$(cat "$1")" > "$2"; else cat "$1" > "$2"; fi
}

home_dir=""
while [ "$#" -gt 0 ]; do
    case "$1" in
        -p | --path) home_dir="${2:-}"; shift 2 ;;
        *) fail "Unknown option: $1" ;;
    esac
done

if [ -z "$home_dir" ]; then
    for candidate in /usr/share/typora /usr/local/share/typora /opt/typora /opt/Typora \
        "$HOME/.local/share/Typora" "$HOME/.local/share/typora"; do
        if [ -d "$candidate" ]; then home_dir="$candidate"; break; fi
    done
fi
[ -n "$home_dir" ] && [ -d "$home_dir" ] || fail "Typora's folder was not found; pass it with --path."

page=""
for candidate in "$home_dir/resources/window.html" "$home_dir/resources/app/window.html" "$home_dir/resources/appsrc/window.html"; do
    if [ -f "$candidate" ]; then page="$candidate"; break; fi
done
[ -n "$page" ] || fail "Typora's page (window.html) is not under $home_dir/resources."

user="${SUDO_USER:-$(id -un)}"
user_home="$HOME"
if [ -n "${SUDO_USER:-}" ]; then
    user_home="$(getent passwd "$SUDO_USER" 2>/dev/null | cut -d: -f6)"
    [ -n "$user_home" ] || user_home="$(eval echo "~$SUDO_USER")"
fi
data="$user_home/.config/Typora"
themes="$data/themes"
here="$(cd "$(dirname "$0")" && pwd)"
script="$here/claude-style-enhance.js"
backup="$data/claude-style-enhance-window.html"

[ -f "$script" ] || fail "claude-style-enhance.js is not next to this script ($here)."
[ -d "$themes" ] || fail "Typora's theme folder is not at $themes; open Typora once first."
if pgrep -xi typora >/dev/null 2>&1; then
    fail "Quit Typora first, then run this again."
fi
[ -w "$page" ] || fail "This user cannot change $page; run this again with sudo."

prefix="$(grep -o 'typora://\(app/\)\{0,1\}userData' "$page" | head -n 1 || true)"
[ -n "$prefix" ] || prefix="typora://app/userData"
tag="<script src=\"$prefix/themes/claude-style-enhance.js\" defer data-claude-style-enhance></script>"

cp "$script" "$themes/claude-style-enhance.js"
[ -f "$backup" ] || cp "$page" "$backup"
if [ -n "${SUDO_USER:-}" ]; then
    chown "$user" "$themes/claude-style-enhance.js" "$backup" 2>/dev/null || true
fi

tmp="$(mktemp)"
awk -v tag="$tag" '
    { gsub(/<script[^>]*data-claude-style-enhance[^>]*><\/script>/, "") }
    !done {
        for (i = 1; i <= 2; i++) {
            frame = (i == 1) ? "<script src=\"./appsrc/window/frame.js\" defer=\"defer\"></script>" : "<script src=\"./app/window/frame.js\" defer=\"defer\"></script>"
            at = index($0, frame)
            if (at) { $0 = substr($0, 1, at + length(frame) - 1) tag substr($0, at + length(frame)); done = 1; break }
        }
    }
    { lines[NR] = $0 }
    END {
        for (n = 1; n <= NR; n++) {
            line = lines[n]
            if (!done && (at = index(line, "</body>"))) { line = substr(line, 1, at - 1) tag substr(line, at); done = 1 }
            print line
        }
    }
' "$page" > "$tmp"
grep -qF 'data-claude-style-enhance' "$tmp" || { rm -f "$tmp"; fail "The tag could not be placed; the page is left as it was."; }
put "$tmp" "$page"
rm -f "$tmp"

echo "Claude Style Enhance is installed. Open Typora and choose a Claude Style theme."
