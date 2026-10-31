@echo off
title Sadguru Motors - Python Server
cd /d "%~dp0"
echo ==============================================================
echo 🚗 Starting Sadguru Motors Python Web Server
echo 📍 Sector 14, Old Delhi Road, Gurugram (HR-26)
echo ==============================================================
echo.

where python >nul 2>nul
if %errorlevel% equ 0 (
    python app.py
    goto end
)

where py >nul 2>nul
if %errorlevel% equ 0 (
    py app.py
    goto end
)

echo Python not found in PATH. Opening index.html directly in browser...
start index.html

:end
pause
