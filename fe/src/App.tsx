import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import AppLayout from "./layout/AppLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Patient Pages
import PatientDashboard from "./pages/Patient/Dashboard";
import MedicalRecords from "./pages/Patient/MedicalRecords";
import BookAppointment from "./pages/Patient/BookAppointment";
import MyAppointments from "./pages/Patient/MyAppointments";
import Prescriptions from "./pages/Patient/Prescriptions";
import BillingPayments from "./pages/Patient/BillingPayments";

// Doctor Pages
import DoctorDashboard from "./pages/Doctor/Dashboard";
import DoctorSchedule from "./pages/Doctor/Schedule";
import PatientHistory from "./pages/Doctor/PatientHistory";
import Diagnosis from "./pages/Doctor/Diagnosis";
import LabOrders from "./pages/Doctor/LabOrders";
import MedicalReports from "./pages/Doctor/MedicalReports";

// Pharmacy Pages
import PharmacyDashboard from "./pages/Pharmacy/Dashboard";
import PrescriptionVerification from "./pages/Pharmacy/PrescriptionVerification";
import StockManagement from "./pages/Pharmacy/StockManagement";
import PharmacyPayments from "./pages/Pharmacy/Payments";

// Admin Pages
import AdminDashboard from "./pages/Admin/Dashboard";
import UserManagement from "./pages/Admin/UserManagement";
import StaffSchedule from "./pages/Admin/StaffSchedule";
import BillingInsurance from "./pages/Admin/BillingInsurance";

// Laboratory Pages
import LabDashboard from "./pages/Laboratory/Dashboard";
import TestManagement from "./pages/Laboratory/TestManagement";
import TestReports from "./pages/Laboratory/TestReports";
// import Notifications from "./pages/Laboratory/Notifications";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Legacy routes - redirect to new auth pages */}
      <Route path="/login" element={<Navigate to="/signin" replace />} />
      <Route path="/register" element={<Navigate to="/signup" replace />} />

      {/* Protected Routes - Sử dụng AppLayout */}
      <Route path="/" element={<AppLayout />}>
        {/* Patient Routes - Cho phép guest access */}
        <Route
          path="patient"
          element={
            <ProtectedRoute
              allowedRoles={["patient"]}
              allowGuest={true} // Cho phép guest access cho patient
            />
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PatientDashboard />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="my-appointments" element={<MyAppointments />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="billing-payments" element={<BillingPayments />} />
        </Route>

        {/* Doctor Routes - Vẫn yêu cầu đăng nhập */}
        <Route
          path="doctor"
          element={<ProtectedRoute allowedRoles={["doctor"]} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="schedule" element={<DoctorSchedule />} />
          <Route path="patient-history" element={<PatientHistory />} />
          <Route path="diagnosis" element={<Diagnosis />} />
          <Route path="lab-orders" element={<LabOrders />} />
          <Route path="medical-reports" element={<MedicalReports />} />
        </Route>

        {/* Pharmacy Routes - Vẫn yêu cầu đăng nhập */}
        <Route
          path="pharmacy"
          element={<ProtectedRoute allowedRoles={["pharmacist"]} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<PharmacyDashboard />} />
          <Route
            path="prescription-verification"
            element={<PrescriptionVerification />}
          />
          <Route path="stock-management" element={<StockManagement />} />
          <Route path="payments" element={<PharmacyPayments />} />
        </Route>

        {/* Admin Routes - Vẫn yêu cầu đăng nhập */}
        <Route
          path="admin"
          element={<ProtectedRoute allowedRoles={["admin"]} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="staff-schedule" element={<StaffSchedule />} />
          <Route path="billing-insurance" element={<BillingInsurance />} />
        </Route>

        {/* Laboratory Routes - Vẫn yêu cầu đăng nhập */}
        <Route
          path="laboratory"
          element={<ProtectedRoute allowedRoles={["lab-technician"]} />}
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<LabDashboard />} />
          <Route path="test-management" element={<TestManagement />} />
          <Route path="test-reports" element={<TestReports />} />
          {/* <Route path="notifications" element={<Notifications />} /> */}
        </Route>

        {/* Root redirect - mặc định đến patient dashboard */}
        <Route index element={<Navigate to="/patient/dashboard" replace />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/patient/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            style={{
              zIndex: 999999,
              position: "fixed",
              top: 0,
              right: 10,
            }}
          />
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
