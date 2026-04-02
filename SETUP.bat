@echo off
REM Quick setup script for Local Defense Backend
echo =================================
echo Local Defense Backend Setup
echo =================================
echo.

REM Navigate to backend folder
cd backend

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download it from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.
echo Installing dependencies...
call npm install

if errorlevel 1 (
    echo ERROR: npm install failed
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed
echo.
echo IMPORTANT: Before starting the server, you need to:
echo.
echo 1. Create a .env file in the backend folder
echo 2. Copy contents from .env.example
echo 3. Fill in your Discord OAuth credentials:
echo    - Get them from: https://discord.com/developers/applications
echo 4. Add your MongoDB connection string
echo    - Get it from: https://www.mongodb.com/cloud/atlas
echo.
echo Next steps:
echo -----------
echo cd backend
echo npm start
echo.
pause
