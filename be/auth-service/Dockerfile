FROM python:3.10-slim

WORKDIR /app

# Cài đặt các thư viện hệ thống cần thiết
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements và cài đặt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy toàn bộ mã nguồn
COPY . .

# Expose port
EXPOSE 5001

# Chạy Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:5001"]
