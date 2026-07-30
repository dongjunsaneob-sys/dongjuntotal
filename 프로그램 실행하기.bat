@echo off
title OneStop Live Web Builder Server
cd /d "%~dp0"

echo ====================================================
echo  OneStop Live Web Builder Server Starting...
echo ====================================================
echo.
echo  [1/2] Opening Admin Page (http://localhost:8080/admin.html) ...
echo  [2/2] Launching Local Node.js Server ...
echo ====================================================
echo.

start http://localhost:8080/admin.html

node server.js

pause
