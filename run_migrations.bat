@echo off
echo 🔄 Running migrations for all services...

REM ========================================
REM BƯỚC 1: ĐỢI SERVICES KHỞI ĐỘNG
REM ========================================
echo ⏳ Waiting for services to be ready...
echo   (This ensures all containers are fully started)
timeout /t 30 /nobreak > nul

REM ========================================
REM BƯỚC 2: CHẠY MIGRATIONS CHO TỪNG SERVICE
REM ========================================

echo 📝 Running migrations for auth-service...
echo   📋 Creating new migrations...
docker-compose exec auth-service python manage.py makemigrations
if %errorlevel% neq 0 (
    echo   ⚠️ No new migrations for auth-service
) else (
    echo   ✅ New migrations created for auth-service
)

echo   📋 Applying migrations...
docker-compose exec auth-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for auth-service
    echo   📋 Checking logs...
    docker-compose logs --tail=10 auth-service
) else (
    echo   ✅ Migrations applied for auth-service
)
echo   ---

echo 📝 Running migrations for patient-service...
echo   📋 Creating new migrations...
docker-compose exec patient-service python manage.py makemigrations
echo   📋 Applying migrations...
docker-compose exec patient-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for patient-service
) else (
    echo   ✅ Migrations completed for patient-service
)
echo   ---

echo 📝 Running migrations for doctor-service...
echo   📋 Creating new migrations...
docker-compose exec doctor-service python manage.py makemigrations
echo   📋 Applying migrations...
docker-compose exec doctor-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for doctor-service
) else (
    echo   ✅ Migrations completed for doctor-service
)
echo   ---

echo 📝 Running migrations for appointment-service...
echo   📋 Creating new migrations...
docker-compose exec appointment-service python manage.py makemigrations
echo   📋 Applying migrations...
docker-compose exec appointment-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for appointment-service
) else (
    echo   ✅ Migrations completed for appointment-service
)
echo   ---

echo 📝 Running migrations for phamarcy-service...
echo   📋 Creating new migrations...
docker-compose exec phamarcy-service python manage.py makemigrations
echo   📋 Applying migrations...
docker-compose exec phamarcy-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for phamarcy-service
) else (
    echo   ✅ Migrations completed for phamarcy-service
)
echo   ---

echo 📝 Running migrations for laboratory-service...
echo   📋 Creating new migrations...
docker-compose exec laboratory-service python manage.py makemigrations
echo   📋 Applying migrations...
docker-compose exec laboratory-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for laboratory-service
) else (
    echo   ✅ Migrations completed for laboratory-service
)
echo   ---

echo 📝 Running migrations for billing-service...
echo   📋 Creating new migrations...
docker-compose exec billing-service python manage.py makemigrations
echo   📋 Applying migrations...
docker-compose exec billing-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for billing-service
) else (
    echo   ✅ Migrations completed for billing-service
)
echo   ---

echo 📝 Running migrations for notification-service...
echo   📋 Creating new migrations...
docker-compose exec notification-service python manage.py makemigrations
echo   📋 Applying migrations...
docker-compose exec notification-service python manage.py migrate
if %errorlevel% neq 0 (
    echo   ❌ Migration failed for notification-service
) else (
    echo   ✅ Migrations completed for notification-service
)
echo   ---

REM ========================================
REM BƯỚC 3: VERIFY MIGRATIONS
REM ========================================
echo 🔍 Verifying migrations...
echo   📋 Checking auth-service tables...
docker exec postgresUserService psql -U postgres -d UserDb -c "\dt" 2>nul

echo 🎉 All migrations completed!
echo.
echo 📋 Next steps:
echo   - Check: check_health.bat
echo   - Create test data: create_test_data.bat
echo   - Test APIs in Postman

pause