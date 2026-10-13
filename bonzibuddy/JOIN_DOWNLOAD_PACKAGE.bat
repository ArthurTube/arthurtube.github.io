@echo off
setlocal
cd /d "%~dp0"
for %%F in (bbupdate.zip.part01 bbupdate.zip.part02 bbupdate.zip.part03) do if not exist "%%F" (
 echo Missing %%F. Extract all three download-data ZIPs into the same website folder.
 pause
 exit /b 1
)
copy /b "bbupdate.zip.part01"+"bbupdate.zip.part02"+"bbupdate.zip.part03" "bbupdate-rebuilt.tmp" >nul
if errorlevel 1 goto failed
powershell -NoProfile -Command "$hash=(Get-FileHash -LiteralPath 'bbupdate-rebuilt.tmp' -Algorithm SHA256).Hash; if ($hash -ne '6b4daa00ce32e06a2c782eadc5ba89b7c9c466a3d98789b7b3dd94c4f64a2901') { exit 1 }"
if errorlevel 1 goto failed
if exist "bbupdate.zip" move /y "bbupdate.zip" "bbupdate-before-rebuild.zip" >nul
move /y "bbupdate-rebuilt.tmp" "bbupdate.zip" >nul
if errorlevel 1 goto failed
echo Success: bbupdate.zip was reconstructed and its SHA256 verified.
echo The complete website is now ready.
pause
exit /b 0
:failed
echo Reconstruction failed. Existing bbupdate.zip was not replaced unless verification passed.
pause
exit /b 1
