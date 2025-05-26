@echo off
echo 🔧 Fixing migration issues specifically...

echo 📋 Step 1: Restarting auth-service
docker-compose restart auth-service

echo 📋 Step 2: Waiting for restart
timeout /t 15 /nobreak > nul

echo 📋 Step 3: Checking database connection
docker exec postgresUserService pg_isready -U postgres -d UserDb

echo 📋 Step 4: Clearing migration files (if needed)
docker-compose exec auth-service find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
docker-compose exec auth-service find . -path "*/migrations/*.pyc" -delete

echo 📋 Step 5: Creating fresh migrations
docker-compose exec auth-service python manage.py makemigrations users
docker-compose exec auth-service python manage.py makemigrations

echo 📋 Step 6: Running migrations
docker-compose exec auth-service python manage.py migrate

echo 📋 Step 7: Verifying database tables
docker exec postgresUserService psql -U postgres -d UserDb -c "\dt"

echo ✅ Migration fix completed!
pause