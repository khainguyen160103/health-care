@echo off
REM Tắt echo để output sạch sẽ

echo 🚀 Setting up Healthcare Microservices Project...
REM Hiển thị thông báo bắt đầu

REM ========================================
REM BƯỚC 1: TẠO THÚMỤC VOLUMES CHO DATABASES
REM ========================================
echo 📁 Creating volume directories...

REM Tạo thư mục volumes cho từng database
REM 2>nul: Ẩn error nếu thư mục đã tồn tại
mkdir volumes 2>nul
mkdir volumes\medical 2>nul
mkdir volumes\doctor 2>nul
mkdir volumes\appointment 2>nul
mkdir volumes\patient 2>nul
mkdir volumes\user 2>nul
mkdir volumes\notification 2>nul
mkdir volumes\billing 2>nul

echo ✅ Volume directories created!

REM ========================================
REM BƯỚC 2: TẠO REQUIREMENTS.TXT CHO TẤT CẢ SERVICES
REM ========================================
echo 📝 Creating requirements.txt files...

REM Tạo file tạm với all dependencies
(
echo Django==5.2.1
echo django-cors-headers==4.7.0
echo djangorestframework==3.16.0
echo djangorestframework_simplejwt==5.5.0
echo gunicorn==23.0.0
echo idna==3.10
echo packaging==25.0
echo psycopg2-binary==2.9.10
echo PyJWT==2.9.0
echo python-dotenv==1.1.0
echo requests==2.32.3
echo sqlparse==0.5.3
echo tzdata==2025.2
echo urllib3==2.4.0
) > temp_requirements.txt

REM Copy requirements.txt cho từng service
echo   📋 Copying to auth-service...
copy temp_requirements.txt be\auth-service\requirements.txt >nul

echo   📋 Copying to patient-service...
copy temp_requirements.txt be\patient-service\requirements.txt >nul

echo   📋 Copying to doctor-service...
copy temp_requirements.txt be\doctor-service\requirements.txt >nul

echo   📋 Copying to appointment-service...
copy temp_requirements.txt be\appointment-service\requirements.txt >nul

echo   📋 Copying to phamarcy-service...
copy temp_requirements.txt be\phamarcy-service\requirements.txt >nul

echo   📋 Copying to laboratory-service...
copy temp_requirements.txt be\laboratory-service\requirements.txt >nul

echo   📋 Copying to billing-service...
copy temp_requirements.txt be\billing-service\requirements.txt >nul

echo   📋 Copying to notification-service...
copy temp_requirements.txt be\notification-service\requirements.txt >nul

REM Xóa file tạm
del temp_requirements.txt

echo ✅ Requirements files created!

REM ========================================
REM BƯỚC 3: TẠO DOCKERFILES CHO TẤT CẢ SERVICES
REM ========================================
echo 📝 Creating Dockerfiles...

REM Auth Service Dockerfile (Port 5001)
echo   🔧 Creating Dockerfile for auth-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo # Cài đặt các thư viện hệ thống cần thiết
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo # Copy requirements và cài đặt
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo # Copy toàn bộ mã nguồn
echo COPY . .
echo.
echo # Expose port
echo EXPOSE 5001
echo.
echo # Chạy Django development server
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5001"]
) > be\auth-service\Dockerfile

REM Patient Service Dockerfile (Port 5002)
echo   🔧 Creating Dockerfile for patient-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo COPY . .
echo.
echo EXPOSE 5002
echo.
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5002"]
) > be\patient-service\Dockerfile

REM Doctor Service Dockerfile (Port 5003)
echo   🔧 Creating Dockerfile for doctor-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo COPY . .
echo.
echo EXPOSE 5003
echo.
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5003"]
) > be\doctor-service\Dockerfile

REM Appointment Service Dockerfile (Port 5004)
echo   🔧 Creating Dockerfile for appointment-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo COPY . .
echo.
echo EXPOSE 5004
echo.
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5004"]
) > be\appointment-service\Dockerfile

REM Phamacry Service Dockerfile (Port 5005)
echo   🔧 Creating Dockerfile for phamarcy-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo COPY . .
echo.
echo EXPOSE 5005
echo.
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5005"]
) > be\phamarcy-service\Dockerfile

REM Laboratory Service Dockerfile (Port 5006)
echo   🔧 Creating Dockerfile for laboratory-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo COPY . .
echo.
echo EXPOSE 5006
echo.
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5006"]
) > be\laboratory-service\Dockerfile

REM Billing Service Dockerfile (Port 5007)
echo   🔧 Creating Dockerfile for billing-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo COPY . .
echo.
echo EXPOSE 5007
echo.
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5007"]
) > be\billing-service\Dockerfile

REM Notification Service Dockerfile (Port 5008)
echo   🔧 Creating Dockerfile for notification-service...
(
echo FROM python:3.10-slim
echo.
echo WORKDIR /app
echo.
echo RUN apt-get update ^&^& apt-get install -y \
echo     gcc \
echo     libpq-dev \
echo     ^&^& rm -rf /var/lib/apt/lists/*
echo.
echo COPY requirements.txt .
echo RUN pip install --no-cache-dir -r requirements.txt
echo.
echo COPY . .
echo.
echo EXPOSE 5008
echo.
echo CMD ["python", "manage.py", "runserver", "0.0.0.0:5008"]
) > be\notification-service\Dockerfile

echo ✅ All Dockerfiles created!

REM ========================================
REM THÔNG BÁO HOÀN THÀNH
REM ========================================
echo 🎉 Project setup complete!
echo.
echo 📋 What was created:
echo   - Volume directories for 7 databases
echo   - requirements.txt for 8 services  
echo   - Dockerfiles for 8 services
echo.
echo 📋 Next steps:
echo   1. Run: docker-compose up --build -d
echo   2. Run: run_migrations.bat
echo   3. Run: create_test_data.bat

pause