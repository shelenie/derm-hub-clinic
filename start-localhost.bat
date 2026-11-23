@echo off
rem Derm Hub: запускає локальний сервер (якщо ще не працює) і відкриває сайт
cd /d "%~dp0"
netstat -ano | findstr /R /C:":5173 .*LISTENING" >nul
if errorlevel 1 (
  start "Derm Hub localhost" /min cmd /c "npx --yes serve -l 5173 ."
  timeout /t 4 /nobreak >nul
)
start "" http://localhost:5173
