@echo off
echo Starting Whisper Server...
echo.
cd /d "%~dp0\whisper-server"
echo Starting server on http://localhost:5000
call start-server.bat
pause
