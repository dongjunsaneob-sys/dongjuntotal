@echo off
chcp 65001 > NUL
title 원스톱 웹사이트 실시간 관리자 프로그램 실행
cd /d "%~dp0"

echo ====================================================
echo  원스톱 웹사이트 실시간 관리자 프로그램 시동 중...
echo ====================================================
echo.

node server.js
if errorlevel 1 (
  echo Node.js 실행에 실패하여 Python 서버로 대체 실행합니다...
  start "" "http://localhost:8080/admin.html"
  python -m http.server 8080
)

pause
