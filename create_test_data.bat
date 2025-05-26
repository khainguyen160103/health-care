@echo off
echo 🧪 Creating test data...

REM ========================================
REM BƯỚC 1: TẠO SUPERUSER
REM ========================================
echo 👤 Creating superuser...

REM Tạo script Python tạm để tạo superuser
(
echo from django.contrib.auth import get_user_model
echo User = get_user_model^(^)
echo if not User.objects.filter^(username='admin'^).exists^(^):
echo     User.objects.create_superuser^(
echo         username='admin',
echo         email='admin@healthcare.com',
echo         password='admin123456',
echo         first_name='System',
echo         last_name='Administrator',
echo         user_type='admin'
echo     ^)
echo     print^('✅ Superuser created'^)
echo else:
echo     print^('⚠️ Superuser already exists'^)
) > temp_create_superuser.py

REM Chạy script tạo superuser
docker-compose exec auth-service python manage.py shell < temp_create_superuser.py

REM Xóa file tạm
del temp_create_superuser.py

echo.

REM ========================================
REM BƯỚC 2: TẠO TEST DOCTOR USER
REM ========================================
echo 🧑‍⚕️ Creating test doctor...
curl -X POST "http://localhost:5001/api/auth/users/" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"doctor_test\", \"email\": \"doctor@test.com\", \"password\": \"test123456\", \"first_name\": \"Bác sĩ\", \"last_name\": \"Test\", \"user_type\": \"doctor\"}" ^
  2>nul

if %errorlevel% == 0 (
    echo   ✅ Test doctor created successfully
) else (
    echo   ⚠️ Test doctor might already exist
)

echo.

REM ========================================
REM BƯỚC 3: TẠO TEST PATIENT USER  
REM ========================================
echo 🧑‍🤒 Creating test patient...
curl -X POST "http://localhost:5001/api/auth/users/" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"patient_test\", \"email\": \"patient@test.com\", \"password\": \"test123456\", \"first_name\": \"Bệnh nhân\", \"last_name\": \"Test\", \"user_type\": \"patient\"}" ^
  2>nul

if %errorlevel% == 0 (
    echo   ✅ Test patient created successfully
) else (
    echo   ⚠️ Test patient might already exist
)

echo.

REM ========================================
REM BƯỚC 4: TẠO TEST NURSE USER
REM ========================================
echo 👩‍⚕️ Creating test nurse...
curl -X POST "http://localhost:5001/api/auth/users/" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"nurse_test\", \"email\": \"nurse@test.com\", \"password\": \"test123456\", \"first_name\": \"Y tá\", \"last_name\": \"Test\", \"user_type\": \"nurse\"}" ^
  2>nul

if %errorlevel% == 0 (
    echo   ✅ Test nurse created successfully
) else (
    echo   ⚠️ Test nurse might already exist
)

echo.

REM ========================================
REM THÔNG BÁO HOÀN THÀNH
REM ========================================
echo 🎉 Test data creation completed!
echo.
echo 📋 Test Credentials Created:
echo   Admin:   admin / admin123456
echo   Doctor:  doctor_test / test123456
echo   Patient: patient_test / test123456
echo   Nurse:   nurse_test / test123456
echo.
echo 🚀 Ready for Postman Testing!
echo.
echo 📋 Quick Test - Try login with:
echo   POST http://localhost:5001/api/auth/token/
echo   Body: {"username": "doctor_test", "password": "test123456"}

pausecreate_test_data.bat