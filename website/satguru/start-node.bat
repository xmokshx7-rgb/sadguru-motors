@echo off
title Sadguru Motors - Node.js Server
cd /d "%~dp0"
echo ==============================================================
echo 🚗 Starting Sadguru Motors Web Server (Node.js)
echo 📍 Sector 14, Old Delhi Road, Gurugram (HR-26)
echo ==============================================================
echo.

:: Check if agy-node or node exists
where node >nul 2>nul
if %errorlevel% equ 0 (
    node server.js
    goto end
)

if exist "%APPDATA%\Antigravity\bin\agy-node.cmd" (
    call "%APPDATA%\Antigravity\bin\agy-node.cmd" server.js
    goto end
)

echo Node.js not found in PATH. Opening index.html directly in browser...
start index.html

:end
pause
