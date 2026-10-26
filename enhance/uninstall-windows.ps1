# Claude Style Enhance 0.1.1 for Typora: uninstaller for Windows
# https://github.com/Xv-Bowen/Claude-Style-Typora
# Written by Xv-Bowen (https://github.com/Xv-Bowen)
# Copyright (c) 2026 Xv-Bowen
# Licensed under CC BY-NC-ND 4.0: https://creativecommons.org/licenses/by-nc-nd/4.0/
# SPDX-License-Identifier: CC-BY-NC-ND-4.0
# Not affiliated with Anthropic
#
#   Right-click, Run with PowerShell; or
#   powershell -ExecutionPolicy Bypass -File uninstall-windows.ps1 [-Path "C:\Program Files\Typora"]

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
    if (Get-Process -Name Typora -ErrorAction SilentlyContinue) { Finish 'Quit Typora first, then run this again.' $true }

    $utf8 = New-Object System.Text.UTF8Encoding $false
    $html = [System.IO.File]::ReadAllText($page, $utf8)
    $pattern = '<script[^>]*data-claude-style-enhance[^>]*></script>'
    if ([regex]::IsMatch($html, $pattern)) {
        if (-not (Test-Writable $page)) {
            $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
            $admin = ([Security.Principal.WindowsPrincipal] $identity).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
            if ($admin) { Finish "$page cannot be changed, even as an administrator." $true }
            Write-Host 'Typora is in a folder only an administrator can change; asking for one...'
            $arguments = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-File', "`"$PSCommandPath`"", '-Path', "`"$typora`"", '-Themes', "`"$Themes`"")
            Start-Process powershell.exe -Verb RunAs -ArgumentList $arguments
            exit 0
        }
        [System.IO.File]::WriteAllText($page, [regex]::Replace($html, $pattern, ''), $utf8)
    }
    $installed = Join-Path $Themes 'claude-style-enhance.js'
    if (Test-Path -LiteralPath $installed) { Remove-Item -LiteralPath $installed }
    Finish 'Claude Style Enhance is uninstalled.' $false
} catch {
    Finish ("The uninstall stopped: " + $_.Exception.Message) $true
}
