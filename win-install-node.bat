@echo off
setlocal enabledelayedexpansion

:: Define the Node.js version you want to install (LTS version recommended)
set "NODE_VERSION=14.17.6"

:: Define the installation directory (optional)
set "INSTALL_DIR=C:\Program Files\nodejs"

:: Download the Node.js installer
echo Downloading Node.js %NODE_VERSION%...
curl -o nodejs-installer.msi https://nodejs.org/dist/v%NODE_VERSION%/node-v%NODE_VERSION%-x64.msi

:: Install Node.js silently
echo Installing Node.js %NODE_VERSION%...
msiexec /i nodejs-installer.msi /qn

:: Verify the installation
set "NODE_INSTALLED="
for /f %%i in ('where node') do (
  set "NODE_INSTALLED=%%i"
)
if defined NODE_INSTALLED (
  echo Node.js installation successful:
  "%NODE_INSTALLED%" -v
) else (
  echo Node.js installation failed.
)

:: Clean up the installer
del nodejs-installer.msi

endlocal
