@echo off
echo 🚀 Starting Healthcare Microservices System...
echo ============================================
echo   This script will setup the complete system
echo   Estimated time: 3-5 minutes
echo ============================================
echo.

REM ========================================
REM PHASE 1: PROJECT SETUP
REM ========================================
echo 📋 Phase 1/6: Project Setup
echo   Creating volume directories, requirements.txt, and Dockerfiles...
call setup_project.bat

echo.

REM ========================================
REM PHASE 2: DOCKER STARTUP
REM ========================================
echo 📋 Phase 2/6: Starting Docker Services
echo   Stopping any existing containers...
docker-compose down -v 2>nul

echo   Building and starting all containers...
docker-compose up --build -d

echo   ✅ Docker services started
echo.

REM ========================================
REM PHASE 3: WAIT FOR SERVICES
REM ========================================
echo 📋 Phase 3/6: Waiting for services to initialize
echo   Databases need time to initialize...
echo   Applications need time to start...
echo   ⏳ Waiting 90 seconds for full startup...

REM Đếm ngược để user biết progress
for /L %%i in (90,-10,10) do (
    echo     %%i seconds remaining...
    timeout /t 10 /nobreak > nul
)
echo   ⏳ Final 10 seconds...
timeout /t 10 /nobreak > nul

echo   ✅ Wait period completed
echo.

REM ========================================
REM PHASE 4: HEALTH CHECK
REM ========================================
echo 📋 Phase 4/6: Initial Health Check
echo   Checking if all services are responding...
call check_health.bat

echo.

REM ========================================
REM PHASE 5: DATABASE MIGRATIONS
REM ========================================
echo 📋 Phase 5/6: Running Database Migrations
echo   Creating database tables for all services...
call run_migrations.bat

echo.

REM ========================================
REM PHASE 6: TEST DATA CREATION
REM ========================================
echo 📋 Phase 6/6: Creating Test Data
echo   Setting up test users and initial data...
call create_test_data.bat

echo.

REM ========================================
REM FINAL VERIFICATION
REM ========================================
echo 📋 Final Verification: Complete System Check
call check_health.bat

echo.
echo ============================================
echo 🎉 HEALTHCARE SYSTEM READY! 🎉
echo ============================================
echo.
echo 📊 System URLs:
echo   Auth Service:         http://localhost:5001
echo   Patient Service:      http://localhost:5002
echo   Doctor Service:       http://localhost:5003
echo   Appointment Service:  http://localhost:5004
echo   Pharmacy Service:     http://localhost:5005
echo   Laboratory Service:   http://localhost:5006
echo   Billing Service:      http://localhost:5007
echo   Notification Service: http://localhost:5008
echo.
echo 🔐 Test Credentials:
echo   Admin:   admin / admin123456
echo   Doctor:  doctor_test / test123456
echo   Patient: patient_test / test123456
echo   Nurse:   nurse_test / test123456
echo.
echo 🔧 Database Connections for DBeaver:
echo   Auth DB:         localhost:5434 - UserDb - postgres/postgres
echo   Patient DB:      localhost:5438 - PatientDb - postgres/postgres
echo   Doctor DB:       localhost:5437 - DoctorDb - postgres/postgres
echo   Appointment DB:  localhost:5435 - AppointmentDb - postgres/postgres
echo   Medical DB:      localhost:5436 - MedicalDb - postgres/postgres
echo   Notification DB: localhost:5433 - NotificationDb - postgres/postgres
echo   Billing DB:      localhost:5439 - BillingDb - postgres/postgres
echo.
echo 🚀 Next Steps:
echo   1. Import postman.json into Postman
echo   2. Set environment to "Healthcare Local"
echo   3. Start testing APIs!
echo.
echo 🔧 If you encounter issues:
echo   - Check logs: docker-compose logs [service-name]
echo   - Restart service: docker-compose restart [service-name]
echo   - Full reset: reset_all.bat
echo.
echo Press any key to finish...

pause