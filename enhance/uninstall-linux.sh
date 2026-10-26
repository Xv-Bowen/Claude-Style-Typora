#!/bin/bash
# Claude Style Enhance 0.1.0 for Typora: uninstaller for Linux
# https://github.com/Xv-Bowen/Claude-Style-Typora
# Written by Xv-Bowen (https://github.com/Xv-Bowen)
# Copyright (c) 2026 Xv-Bowen
# Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
# SPDX-License-Identifier: CC-BY-NC-ND-4.0
# Not affiliated with Anthropic
#
#   sudo bash uninstall-linux.sh [--path /path/to/typora]

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

user_home="$HOME"
if [ -n "${SUDO_USER:-}" ]; then
    user_home="$(getent passwd "$SUDO_USER" 2>/dev/null | cut -d: -f6)"
    [ -n "$user_home" ] || user_home="$(eval echo "~$SUDO_USER")"
fi
themes="$user_home/.config/Typora/themes"

if pgrep -xi typora >/dev/null 2>&1; then
    fail "Quit Typora first, then run this again."
fi

if grep -qF 'data-claude-style-enhance' "$page"; then
    [ -w "$page" ] || fail "This user cannot change $page; run this again with sudo."
    tmp="$(mktemp)"
    awk '{ gsub(/<script[^>]*data-claude-style-enhance[^>]*><\/script>/, ""); print }' "$page" > "$tmp"
    put "$tmp" "$page"
    rm -f "$tmp"
fi
rm -f "$themes/claude-style-enhance.js"

echo "Claude Style Enhance is uninstalled."
