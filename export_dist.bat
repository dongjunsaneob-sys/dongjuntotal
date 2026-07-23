@echo off
chcp 65001 > NUL
title Vercel 배포용 파일 동기화 프로그램
echo ====================================================
echo  원스톱 웹사이트 — Vercel 배포용 dist/ 폴더 최적화 동기화
echo ====================================================
echo.
echo Vercel 업로드용 순수 웹 파일만 dist/ 폴더에 모으는 중...

if not exist "dist" mkdir dist

copy /Y "index.html" "dist\index.html" > NUL
copy /Y "interior.html" "dist\interior.html" > NUL
copy /Y "admin.html" "dist\admin.html" > NUL
copy /Y "admin.css" "dist\admin.css" > NUL
copy /Y "admin.js" "dist\admin.js" > NUL
copy /Y "vercel.json" "dist\vercel.json" > NUL
copy /Y "demolition.gif" "dist\demolition.gif" > NUL
copy /Y "interior.gif" "dist\interior.gif" > NUL
copy /Y "structure_demolition.gif" "dist\structure_demolition.gif" > NUL
copy /Y "logo.jpg" "dist\logo.jpg" > NUL
xcopy /E /I /Y "design_handoff_onestop_landing" "dist\design_handoff_onestop_landing" > NUL

echo.
echo [성공] dist/ 폴더 군더더기 없이 100% 깔끔하게 최적화 동기화되었습니다!
echo Vercel에 업로드 시 'dist' 폴더 내부의 파일들만 올려주세요.
echo.
pause
