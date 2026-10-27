# Claude Style Enhance 0.1.5 for Typora: installer for Windows
# https://github.com/Xv-Bowen/Claude-Style-Typora
# Written by Xv-Bowen (https://github.com/Xv-Bowen)
# Copyright (c) 2026 Xv-Bowen
# Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
# SPDX-License-Identifier: CC-BY-NC-ND-4.0
# Not affiliated with Anthropic
#
#   Right-click, Run with PowerShell; or
#   powershell -ExecutionPolicy Bypass -File install-windows.ps1 [-Path "C:\Program Files\Typora"]

param(
    [string] $Path = '',
    [string] $Themes = ''
)
$ErrorActionPreference = 'Stop'

function Finish([string] $Message, [bool] $Failed) {
    if ($Failed) { Write-Host $Message -ForegroundColor Red } else { Write-Host $Message -ForegroundColor Green }
    Write-Host ''
    Write-Host 'Press any key to close.'
    try { [void][System.Console]::ReadKey($true) } catch { }
    if ($Failed) { exit 1 }
    exit 0
}

function Find-Typora([string] $Given) {
    if ($Given -and (Test-Path -LiteralPath $Given)) { return $Given }
    $keys = @(
        'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall',
        'HKLM:\SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall',
        'HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall'
    )
    foreach ($key in $keys) {
        if (-not (Test-Path $key)) { continue }
        foreach ($item in Get-ChildItem $key -ErrorAction SilentlyContinue) {
            $props = Get-ItemProperty $item.PSPath -ErrorAction SilentlyContinue
            if ($props -and $props.DisplayName -like '*Typora*' -and $props.InstallLocation -and (Test-Path -LiteralPath $props.InstallLocation)) {
                return $props.InstallLocation
            }
        }
    }
    $places = @(
        @($env:ProgramFiles, 'Typora'),
        @(${env:ProgramFiles(x86)}, 'Typora'),
        @($env:LOCALAPPDATA, 'Programs\Typora'),
        @($env:USERPROFILE, 'scoop\apps\typora\current')
    )
    foreach ($place in $places) {
        if (-not $place[0]) { continue }
        $candidate = Join-Path $place[0] $place[1]
        if (Test-Path -LiteralPath (Join-Path $candidate 'Typora.exe')) { return $candidate }
    }
    return ''
}

function Find-Page([string] $Typora) {
    foreach ($candidate in 'resources\window.html', 'resources\app\window.html', 'resources\appsrc\window.html') {
        $file = Join-Path $Typora $candidate
        if (Test-Path -LiteralPath $file) { return $file }
    }
    return ''
}

function Test-Writable([string] $File) {
    try {
        $stream = [System.IO.File]::Open($File, 'Open', 'ReadWrite')
        $stream.Close()
        return $true
    } catch {
        return $false
    }
}

try {
    $typora = Find-Typora $Path
    if (-not $typora) { Finish "Typora's folder was not found; run this again with -Path and Typora's folder." $true }
    $page = Find-Page $typora
    if (-not $page) { Finish "Typora's page (window.html) is not under $typora\resources." $true }

    if (-not $Themes) { $Themes = Join-Path $env:APPDATA 'Typora\themes' }
    $data = Split-Path -Parent $Themes
    $script = Join-Path $PSScriptRoot 'claude-style-enhance.js'
    $backup = Join-Path $data 'claude-style-enhance-window.html'
    if (-not (Test-Path -LiteralPath $script)) { Finish "claude-style-enhance.js is not next to this script ($PSScriptRoot)." $true }
    if (-not (Test-Path -LiteralPath $Themes)) { Finish "Typora's theme folder is not at $Themes; open Typora once first." $true }
    if (Get-Process -Name Typora -ErrorAction SilentlyContinue) { Finish 'Quit Typora first, then run this again.' $true }

    if (-not (Test-Writable $page)) {
        $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
        $admin = ([Security.Principal.WindowsPrincipal] $identity).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
        if ($admin) { Finish "$page cannot be changed, even as an administrator." $true }
        Write-Host 'Typora is in a folder only an administrator can change; asking for one...'
        $arguments = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$PSCommandPath`"", '-Path', "`"$typora`"", '-Themes', "`"$Themes`"")
        Start-Process powershell.exe -Verb RunAs -ArgumentList $arguments
        exit 0
    }

    $utf8 = New-Object System.Text.UTF8Encoding $false
    $html = [System.IO.File]::ReadAllText($page, $utf8)

    $found = [regex]::Match($html, 'typora://(?:app/)?userData')
    $prefix = if ($found.Success) { $found.Value } else { 'typora://app/userData' }
    $tag = "<script src=`"$prefix/themes/claude-style-enhance.js`" defer data-claude-style-enhance></script>"

    Copy-Item -LiteralPath $script -Destination (Join-Path $Themes 'claude-style-enhance.js') -Force
    if (-not (Test-Path -LiteralPath $backup)) { Copy-Item -LiteralPath $page -Destination $backup }

    $html = [regex]::Replace($html, '<script[^>]*data-claude-style-enhance[^>]*></script>', '')
    $placed = $false
    foreach ($frame in '<script src="./appsrc/window/frame.js" defer="defer"></script>', '<script src="./app/window/frame.js" defer="defer"></script>') {
        $at = $html.IndexOf($frame)
        if ($at -ge 0) {
            $html = $html.Insert($at + $frame.Length, $tag)
            $placed = $true
            break
        }
    }
    if (-not $placed) {
        $at = $html.LastIndexOf('</body>')
        if ($at -lt 0) { Finish "The tag could not be placed in $page; it is left as it was." $true }
        $html = $html.Insert($at, $tag)
    }
    [System.IO.File]::WriteAllText($page, $html, $utf8)
    Finish 'Claude Style Enhance is installed. Open Typora and choose a Claude Style theme.' $false
} catch {
    Finish ("The install stopped: " + $_.Exception.Message) $true
}
