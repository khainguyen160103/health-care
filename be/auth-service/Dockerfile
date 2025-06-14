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

# Tạo script để chạy migrations và khởi động server
RUN echo '#!/bin/bash\n\
    echo "🔄 Waiting for database..."\n\
    sleep 10\n\
    echo "🔄 Running migrations..."\n\
    python manage.py makemigrations\n\
    python manage.py migrate\n\
    echo "🚀 Starting server..."\n\
    exec python manage.py runserver 0.0.0.0:5001' > /start.sh && chmod +x /start.sh

# Chạy script khởi động
CMD ["/start.sh"]
