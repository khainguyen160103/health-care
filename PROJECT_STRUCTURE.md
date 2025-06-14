# 📋 CẤU TRÚC DỰ ÁN HEALTHCARE MANAGEMENT SYSTEM

## 🏗️ TỔNG QUAN KIẾN TRÚC

Dự án Healthcare sử dụng kiến trúc **Microservices** với:
- **Backend**: Django REST Framework (Python) - 9 microservices độc lập  
- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Database**: PostgreSQL (riêng biệt cho từng service)
- **Containerization**: Docker & Docker Compose
- **Gateway**: Nginx reverse proxy

---

## 📁 CẤU TRÚC THƯ MỤC CHÍNH

```
Health-Care/
├── 📁 be/                              # Backend Services
├── 📁 fe/                              # Frontend React App  
├── 📁 fe2/                             # Frontend backup/alternative
├── 📁 volumes/                         # Docker volumes (databases)
├── 🐳 docker-compose.yml              # Container orchestration
├── 📄 Healthcare_API_Collection.postman_collection.json
├── 📋 Nguyễn Đức Thành.docx           # Documentation
├── 📋 S.A-D_final project_healthcareManagement.pdf
└── 🔧 *.bat files                     # Scripts for Windows
```

---

## 🔙 BACKEND ARCHITECTURE

### 🏥 Microservices (9 services)

```
be/
├── 🔐 auth-service/                    # Xác thực & phân quyền
├── 👥 patient-service/                 # Quản lý bệnh nhân
├── 👨‍⚕️ doctor-service/                   # Quản lý bác sĩ
├── 📅 appointment-service/             # Lịch hẹn khám
├── 🧪 laboratory-service/              # Xét nghiệm
├── 💊 phamarcy-service/                # Nhà thuốc
├── 💰 billing-service/                 # Thanh toán & hóa đơn
├── 💬 chat-service/                    # Chat & hỗ trợ
├── 🔔 notification-service/            # Thông báo
└── 🌐 gateway/                         # API Gateway (Nginx)
```

### 🗄️ Database Design

Mỗi service có database riêng biệt:
- **postgres-user** (Port 5434): UserDb
- **postgres-notification** (Port 5433): NotificationDb  
- **postgres-medical** (Port 5436): MedicalDb
- **postgres-doctor** (Port 5435): DoctorDb
- **postgres-patient** (Port 5437): PatientDb
- **postgres-appointment** (Port 5438): AppointmentDb
- **postgres-billing** (Port 5439): BillingDb

### 🔧 Tech Stack Backend
- **Framework**: Django 4.x + Django REST Framework
- **Database**: PostgreSQL 15+
- **Authentication**: JWT tokens
- **API Documentation**: Django REST Swagger
- **Containerization**: Docker

---

## 🎨 FRONTEND ARCHITECTURE

### 📱 React Application Structure

```
fe/src/
├── 📄 App.tsx                         # Main app component & routing
├── 📄 main.tsx                        # Entry point
├── 🎨 index.css                       # Global styles
├── 📁 components/                     # Reusable components
│   ├── auth/                          # Authentication components
│   ├── common/                        # Shared components
│   ├── ui/                            # UI library components
│   ├── charts/                        # Chart components
│   ├── form/                          # Form components
│   ├── header/                        # Header components
│   ├── layout/                        # Layout components
│   └── tables/                        # Table components
├── 📁 pages/                          # Page components
│   ├── Admin/                         # Admin dashboard pages
│   ├── AuthPages/                     # Login/Register pages
│   ├── Doctor/                        # Doctor dashboard pages
│   ├── Patient/                       # Patient dashboard pages
│   ├── Pharmacy/                      # Pharmacy dashboard pages
│   ├── Laboratory/                    # Lab dashboard pages
│   ├── Charts/                        # Chart demo pages
│   ├── Forms/                         # Form demo pages
│   └── Tables/                        # Table demo pages
├── 📁 hooks/                          # Custom React hooks
│   ├── useAuth.ts                     # Authentication hooks
│   ├── useAppointments.ts             # Appointment management
│   ├── usePatients.ts                 # Patient data hooks
│   ├── useDoctors.ts                  # Doctor data hooks
│   ├── usePharmacy.ts                 # Pharmacy hooks
│   ├── useLaboratory.ts               # Laboratory hooks
│   └── useBilling.ts                  # Billing hooks
├── 📁 services/                       # API service layer
│   ├── apiClient.ts                   # Base HTTP client
│   ├── userService.ts                 # User API calls
│   ├── patientService.ts              # Patient API calls
│   ├── doctorService.ts               # Doctor API calls
│   ├── appointmentService.ts          # Appointment API calls
│   ├── laboratoryService.ts           # Laboratory API calls
│   ├── pharmacyService.ts             # Pharmacy API calls
│   ├── billingService.ts              # Billing API calls
│   └── chatbotService.ts              # Chat API calls
├── 📁 context/                        # React Context providers
│   ├── AuthContext.tsx                # Authentication state
│   ├── ThemeContext.tsx               # Theme management
│   └── SidebarContext.tsx             # Sidebar state
├── 📁 types/                          # TypeScript type definitions
├── 📁 config/                         # Configuration files
├── 📁 icons/                          # Icon components
└── 📁 layout/                         # Layout components
```

### 🎯 Tech Stack Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Custom CSS
- **State Management**: React Query + Context API
- **Routing**: React Router v7
- **Charts**: ApexCharts
- **Icons**: Custom icon library
- **Calendar**: FullCalendar
- **Forms**: React Hook Form
- **HTTP Client**: Axios

---

## 👥 USER ROLES & PERMISSIONS

### 🔐 Role-Based Access Control

1. **👤 Patient (Bệnh nhân)**
   - Dashboard cá nhân
   - Đặt lịch hẹn
   - Xem hồ sơ y tế
   - Xem đơn thuốc
   - Thanh toán hóa đơn

2. **👨‍⚕️ Doctor (Bác sĩ)**
   - Quản lý lịch trình
   - Xem lịch sử bệnh nhân
   - Chẩn đoán & kê đơn
   - Yêu cầu xét nghiệm
   - Viết báo cáo y tế

3. **💊 Pharmacist (Dược sĩ)**
   - Quản lý kho thuốc
   - Xác thực đơn thuốc
   - Cấp phát thuốc
   - Thanh toán

4. **🧪 Lab Technician (Kỹ thuật viên)**
   - Quản lý xét nghiệm
   - Upload kết quả
   - Quản lý thiết bị

5. **👑 Admin (Quản trị viên)**
   - Quản lý người dùng
   - Thống kê hệ thống
   - Quản lý lịch trình nhân viên
   - Báo cáo tổng hợp

---

## 🔗 API INTEGRATION

### 🌐 Service Communication
- **REST API**: HTTP/JSON giữa Frontend và Backend
- **Service Mesh**: Nginx Gateway routing
- **Authentication**: JWT Bearer tokens
- **CORS**: Configured for cross-origin requests

### 📋 API Collections
- **Postman Collection**: `Healthcare_API_Collection.postman_collection.json`
- **Test Data**: Scripts để tạo dữ liệu mẫu
- **Documentation**: Swagger UI cho mỗi service

---

## 🗃️ DATA FLOW

### 📊 Typical Request Flow
```
Frontend (React) 
    ↓ HTTP Request
API Gateway (Nginx)
    ↓ Route to appropriate service
Microservice (Django)
    ↓ Database query
PostgreSQL Database
    ↓ Response
Frontend renders data
```

### 🔄 State Management
- **Server State**: React Query (caching, synchronization)
- **Client State**: React Context + useState
- **Form State**: React Hook Form
- **URL State**: React Router

---

## 🐳 DEPLOYMENT

### 🏗️ Docker Configuration
- **docker-compose.yml**: Orchestrates all services
- **Individual Dockerfiles**: For each service
- **Volumes**: Persistent database storage
- **Networks**: Inter-service communication

### 🔧 Scripts (Windows)
- `setup_project.bat`: Initial project setup
- `start_everything.bat`: Start all services
- `run_migrations.bat`: Database migrations
- `create_test_data.bat`: Generate test data
- `reset_all.bat`: Reset project state

---

## 🎨 UI/UX FEATURES

### 💅 Design System
- **Components**: Reusable UI components
- **Themes**: Light/Dark mode support
- **Responsive**: Mobile-first design
- **Accessibility**: ARIA labels and keyboard navigation

### 📱 Key Features
- **Dashboard**: Role-specific dashboards
- **Calendar**: Appointment scheduling
- **Charts**: Data visualization
- **Tables**: Data grids with sorting/filtering
- **Forms**: Dynamic form generation
- **Notifications**: Real-time alerts
- **Chat**: Patient-doctor communication

---

## 🧪 TESTING & DEVELOPMENT

### 🔧 Development Tools
- **Hot Reload**: Vite dev server
- **Type Checking**: TypeScript strict mode
- **Linting**: ESLint + React rules
- **API Testing**: Postman collections
- **Mock Data**: Frontend fallback data

### 📋 Available Scripts
```bash
# Frontend development
cd fe
npm run dev          # Start dev server
npm run build        # Production build
npm run lint         # Code linting

# Backend development
python manage.py runserver    # Start Django dev server
python manage.py migrate      # Run migrations
python manage.py test         # Run tests
```

---

## 🚀 CURRENT STATUS

### ✅ Completed Features
- ✅ Complete microservices architecture
- ✅ User authentication & authorization
- ✅ Role-based access control
- ✅ Frontend with mock data
- ✅ Basic CRUD operations
- ✅ Docker containerization

### 🔄 In Progress
- 🔄 API integration completion
- 🔄 Real-time notifications
- 🔄 Advanced reporting
- 🔄 Payment integration

### 📋 Planned Features
- 📋 Mobile app (React Native)
- 📋 Advanced analytics
- 📋 Integration with medical devices
- 📋 Telemedicine features

---

## 📚 DOCUMENTATION

- **📖 Project Documentation**: `Nguyễn Đức Thành.docx`
- **📋 System Analysis**: `S.A-D_final project_healthcareManagement.pdf`
- **🔧 API Documentation**: Swagger UI endpoints
- **💻 Frontend Guide**: `fe/README.md`
- **🎭 Mock Data Guide**: `fe/MOCK_DATA_GUIDE.md`

---

*Cấu trúc này được thiết kế để dễ dàng mở rộng và bảo trì, với sự tách biệt rõ ràng giữa các tầng và service.*
