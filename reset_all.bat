@echo off
echo 🗑️ Resetting entire Healthcare system...
echo ⚠️  WARNING: This will delete all data!
echo.
set /p answer=Are you sure? (y/N): 
if /I "%answer%" neq "y" goto :end

echo 📋 Stopping all containers...
docker-compose down -v

echo 📋 Removing volumes...
rmdir /s /q volumes 2>nul

echo 📋 Cleaning Docker system...
docker system prune -f

echo 📋 Running fresh setup...
call setup_project.bat

echo 🎉 System reset complete!
echo Run: start_everything.bat to setup again

:end
pause