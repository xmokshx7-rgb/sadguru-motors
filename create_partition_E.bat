@echo off
:: Run partition creation script
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0create_partition_E.ps1"
pause
