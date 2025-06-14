import {
  usePatientProfile,
  usePatientAppointments,
  useMyBills,
} from "../../hooks";
import { format } from "date-fns";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import { useState } from "react";

export default function PatientDashboard() {
  const { user } = useAuthContext();
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<any>(null);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  console.log(user);
  // Mock data for demo purposes when user is not logged in or API is unavailable
  const mockAppointments = {
    results: [
      {
        id: "1",
        doctor_info: {
          name: "BS. Trần Thị B",
          department: "Nội khoa",
          phone: "0901234567",
          specialization: "Bác sĩ chuyên khoa I",
          experience: "15 năm kinh nghiệm",
          education: "Đại học Y Hà Nội",
        },
        scheduled_time: "2024-01-16T14:30:00Z",
        note: "Khám tổng quát định kỳ",
        status: "confirmed",
        appointment_type: "Khám tổng quát",
        room: "Phòng 101",
        estimated_duration: "30 phút",
        preparation_notes: "Nhịn ăn 8 tiếng trước khám",
        created_at: "2024-01-10T10:00:00Z",
      },
      {
        id: "2",
        doctor_info: {
          name: "BS. Nguyễn Văn D",
          department: "Tim mạch",
          phone: "0907654321",
          specialization: "Bác sĩ chuyên khoa II",
          experience: "20 năm kinh nghiệm",
          education: "Đại học Y TP.HCM",
        },
        scheduled_time: "2024-01-18T09:00:00Z",
        note: "Kiểm tra huyết áp",
        status: "pending",
        appointment_type: "Khám chuyên khoa",
        room: "Phòng 205",
        estimated_duration: "45 phút",
        preparation_notes: "Mang theo kết quả xét nghiệm cũ",
        created_at: "2024-01-12T15:30:00Z",
      },
      {
        id: "3",
        doctor_info: {
          name: "BS. Phạm Văn F",
          department: "Tiêu hóa",
          phone: "0912345678",
          specialization: "Thạc sĩ Y học",
          experience: "12 năm kinh nghiệm",
          education: "Đại học Y Huế",
        },
        scheduled_time: "2024-01-20T10:15:00Z",
        note: "Tái khám sau điều trị",
        status: "confirmed",
        appointment_type: "Tái khám",
        room: "Phòng 102",
        estimated_duration: "20 phút",
        preparation_notes: "Mang theo đơn thuốc cũ",
        created_at: "2024-01-13T09:00:00Z",
      },
    ],
    count: 3,
  };

  const mockBills = [
    {
      id: "1",
      amount: 500000,
      description: "Khám nội khoa",
      status: "unpaid",
      due_date: "2024-01-20",
      created_date: "2024-01-10",
      doctor: "BS. Trần Thị B",
      services: [
        { name: "Khám tổng quát", price: 200000 },
        { name: "Xét nghiệm máu", price: 150000 },
        { name: "Chụp X-quang", price: 150000 },
      ],
      payment_methods: "Tiền mặt, Chuyển khoản, Thẻ",
    },
    {
      id: "2",
      amount: 350000,
      description: "Xét nghiệm máu",
      status: "unpaid",
      due_date: "2024-01-25",
      created_date: "2024-01-15",
      doctor: "BS. Nguyễn Văn D",
      services: [
        { name: "Công thức máu", price: 100000 },
        { name: "Sinh hóa máu", price: 150000 },
        { name: "Phí phụ thu", price: 100000 },
      ],
      payment_methods: "Tiền mặt, Chuyển khoản, Thẻ",
    },
    {
      id: "3",
      amount: 200000,
      description: "Thuốc điều trị",
      status: "paid",
      due_date: "2024-01-15",
      created_date: "2024-01-08",
      doctor: "BS. Phạm Văn F",
      services: [
        { name: "Thuốc điều trị", price: 180000 },
        { name: "Phí tư vấn", price: 20000 },
      ],
      payment_methods: "Đã thanh toán bằng tiền mặt",
      paid_date: "2024-01-10",
    },
  ];

  const mockProfile = {
    id: user?.id || "demo",
    name: user?.first_name || "Bệnh Nhân Mẫu",
    email: user?.email || "patient@demo.com",
    phone: "0901234567",
    date_of_birth: "1990-01-01",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    medical_history: "Không có tiền sử bệnh lý đặc biệt",
    allergies: "Không có dị ứng",
    emergency_contact: "Nguyễn Văn A - 0987654321",
    blood_type: "O+",
    height: "170cm",
    weight: "65kg",
    insurance: "BHYT - Mã số: GD123456789",
  };

  const healthStats = {
    totalVisits: 12,
    lastVisit: "2024-01-10",
    nextAppointment: "2024-01-16",
    activePrescriptions: 2,
    completedTests: 8,
    pendingResults: 1,
  };
  // Chỉ fetch data nếu user đã đăng nhập
  const { data: profile, isLoading: profileLoading } = usePatientProfile();
  const { data: appointments, isLoading: appointmentsLoading } =
    usePatientAppointments({});
  const { data: bills, isLoading: billsLoading } = useMyBills(
    user ? user.id : ""
  );
  // Functions to handle detail modals
  const openAppointmentDetail = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const openBillDetail = (bill: any) => {
    setSelectedBill(bill);
    setIsBillModalOpen(true);
  };
  const closeBillModal = () => {
    setIsBillModalOpen(false);
    setSelectedBill(null);
  };

  const openProfileDetail = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  // Modal Component
  const AppointmentDetailModal = () => {
    if (!isModalOpen || !selectedAppointment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Chi Tiết Cuộc Hẹn
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Thông Tin Bác Sĩ</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p><strong>Tên:</strong> {selectedAppointment.doctor_info.name}</p>
                    <p><strong>Khoa:</strong> {selectedAppointment.doctor_info.department}</p>
                    <p><strong>Chuyên môn:</strong> {selectedAppointment.doctor_info.specialization}</p>
                    <p><strong>Kinh nghiệm:</strong> {selectedAppointment.doctor_info.experience}</p>
                    <p><strong>Học vấn:</strong> {selectedAppointment.doctor_info.education}</p>
                    <p><strong>Điện thoại:</strong> {selectedAppointment.doctor_info.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Thông Tin Cuộc Hẹn</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p><strong>Ngày giờ:</strong> {format(new Date(selectedAppointment.scheduled_time), "dd/MM/yyyy HH:mm")}</p>
                    <p><strong>Loại khám:</strong> {selectedAppointment.appointment_type}</p>
                    <p><strong>Phòng:</strong> {selectedAppointment.room}</p>
                    <p><strong>Thời gian dự kiến:</strong> {selectedAppointment.estimated_duration}</p>
                    <p><strong>Trạng thái:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        selectedAppointment.status === 'confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedAppointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Ghi Chú</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p><strong>Lý do khám:</strong> {selectedAppointment.note}</p>
                  <p><strong>Chuẩn bị trước khám:</strong> {selectedAppointment.preparation_notes}</p>
                  <p><strong>Ngày đặt lịch:</strong> {format(new Date(selectedAppointment.created_at), "dd/MM/yyyy HH:mm")}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={closeModal}>
                Đóng
              </Button>
              <Button variant="primary">
                Sửa Lịch Hẹn
              </Button>
            </div>
          </div>        </div>
      </div>
    );
  };

  // Bill Detail Modal Component
  const BillDetailModal = () => {
    if (!isBillModalOpen || !selectedBill) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Chi Tiết Hóa Đơn #{selectedBill.id}
              </h2>
              <button
                onClick={closeBillModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Thông Tin Hóa Đơn</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p><strong>Mã hóa đơn:</strong> #{selectedBill.id}</p>
                    <p><strong>Ngày tạo:</strong> {selectedBill.created_date}</p>
                    <p><strong>Hạn thanh toán:</strong> {selectedBill.due_date}</p>
                    <p><strong>Bác sĩ phụ trách:</strong> {selectedBill.doctor}</p>
                    <p><strong>Trạng thái:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        selectedBill.status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedBill.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                      </span>
                    </p>
                    {selectedBill.paid_date && (
                      <p><strong>Ngày thanh toán:</strong> {selectedBill.paid_date}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Tổng Tiền</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p className="text-2xl font-bold text-primary">
                      {selectedBill.amount.toLocaleString("vi-VN")}đ
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{selectedBill.description}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Chi Tiết Dịch Vụ</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-600">
                        <th className="text-left py-2">Dịch vụ</th>
                        <th className="text-right py-2">Giá tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedBill.services.map((service: any, index: number) => (
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-600">
                          <td className="py-2">{service.name}</td>
                          <td className="text-right py-2">{service.price.toLocaleString("vi-VN")}đ</td>
                        </tr>
                      ))}
                      <tr className="font-bold">
                        <td className="py-2">Tổng cộng:</td>
                        <td className="text-right py-2">{selectedBill.amount.toLocaleString("vi-VN")}đ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Phương Thức Thanh Toán</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p>{selectedBill.payment_methods}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={closeBillModal}>
                Đóng
              </Button>
              {selectedBill.status === 'unpaid' && (
                <Button variant="primary">
                  Thanh Toán Ngay
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Profile Detail Modal Component
  const ProfileDetailModal = () => {
    if (!isProfileModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-90vh overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Thông Tin Hồ Sơ
              </h2>
              <button
                onClick={closeProfileModal}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Thông Tin Cá Nhân</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
                    <p><strong>Họ tên:</strong> {mockProfile.name}</p>
                    <p><strong>Email:</strong> {mockProfile.email}</p>
                    <p><strong>Điện thoại:</strong> {mockProfile.phone}</p>
                    <p><strong>Ngày sinh:</strong> {mockProfile.date_of_birth}</p>
                    <p><strong>Nhóm máu:</strong> {mockProfile.blood_type}</p>
                    <p><strong>Chiều cao:</strong> {mockProfile.height}</p>
                    <p><strong>Cân nặng:</strong> {mockProfile.weight}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Địa Chỉ & Liên Hệ</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
                    <p><strong>Địa chỉ:</strong> {mockProfile.address}</p>
                    <p><strong>Liên hệ khẩn cấp:</strong> {mockProfile.emergency_contact}</p>
                    <p><strong>Bảo hiểm:</strong> {mockProfile.insurance}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Thông Tin Y Tế</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg space-y-2">
                  <p><strong>Tiền sử bệnh:</strong> {mockProfile.medical_history}</p>
                  <p><strong>Dị ứng:</strong> {mockProfile.allergies}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={closeProfileModal}>
                Đóng
              </Button>
              <Button variant="primary">
                Chỉnh Sửa Hồ Sơ
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <PageMeta
        title="Bảng Điều Khiển Bệnh Nhân | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Cổng thông tin bệnh nhân để quản lý chăm sóc sức khỏe"
      />
      <PageBreadcrumb pageTitle="Bảng Điều Khiển Bệnh Nhân" />
      {/* Guest Welcome Message */}
      {!user && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 dark:bg-blue-900 dark:border-blue-700">
          <h3 className="text-lg text-blue-800 dark:text-blue-200 mb-2">
            Chào Mừng Đến Với Hệ Thống Chăm Sóc Sức Khỏe
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-3">
            Bạn đang trong chế độ khách. Đăng nhập để truy cập hồ sơ sức khỏe cá
            nhân, lịch hẹn và nhiều tính năng khác.
          </p>
          <div className="flex space-x-3">
            <Link to="/signin">
              <Button variant="primary" size="sm">
                Đăng Nhập
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="outline" size="sm">
                Tạo Tài Khoản
              </Button>
            </Link>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick Stats */}
        <ComponentCard title="Lịch Hẹn Sắp Tới">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">
                {user
                  ? appointmentsLoading
                    ? "..."
                    : appointments?.results?.length || mockAppointments.results.length
                  : mockAppointments.results.length}
              </p>
              <p className="text-sm text-gray-500">Đã Lên Lịch</p>
            </div>
            <svg className="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 4h6m-6 0a1 1 0 00-1 1v8a1 1 0 001 1h6a1 1 0 001-1v-8a1 1 0 00-1-1" />
            </svg>
          </div>
        </ComponentCard>        <ComponentCard title="Hồ Sơ Y Tế">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-success">
                {user ? (profileLoading ? "..." : "Có Sẵn") : "Có Dữ Liệu Mẫu"}
              </p>
              <p className="text-sm text-gray-500">Hồ Sơ</p>
            </div>
            <div>
              <Button 
                size="sm" 
                variant="outline"
                onClick={openProfileDetail}
              >
                Xem chi tiết
              </Button>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard title="Đơn Thuốc">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-warning">
                {user ? "Đang Hoạt Động" : healthStats.activePrescriptions}
              </p>
              <p className="text-sm text-gray-500">Hiện Tại</p>
            </div>
            <svg className="h-8 w-8 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </ComponentCard>

        <ComponentCard title="Hóa Đơn Chưa Thanh Toán">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-error">
                {user
                  ? billsLoading
                    ? "..."
                    : `${
                        Array.isArray(bills)
                          ? bills
                              .reduce(
                                (sum, bill) => sum + (bill.amount || 0),
                                0
                              )
                              .toLocaleString("vi-VN")
                          : 0
                      }đ`
                  : `${mockBills
                      .filter(bill => bill.status === 'unpaid')
                      .reduce((sum, bill) => sum + bill.amount, 0)
                      .toLocaleString("vi-VN")}đ`}
              </p>
              <p className="text-sm text-gray-500">Số Tiền</p>
            </div>
            {/* <DollarLineIcon className="h-8 w-8 text-error" /> */}
          </div>
        </ComponentCard>
      </div>
      <h1>asdasd</h1>
      {/* Recent Appointments */}
      {user && (
        <div className="mt-6">
          <ComponentCard title="Lịch Hẹn Gần Đây">
            <div className="space-y-4">
              {appointmentsLoading ? (
                <div>Đang tải lịch hẹn...</div>
              ) : appointments?.results?.length ? (
                appointments.results.slice(0, 3).map((appointment: any) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Bác sĩ {appointment.doctor_info?.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {appointment.note || "Khám tổng quát"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(
                          new Date(appointment.scheduled_time),
                          "dd/MM/yyyy"
                        )}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          appointment.status === "confirmed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {appointment.status === "confirmed"
                          ? "Đã Xác Nhận"
                          : appointment.status === "pending"
                          ? "Chờ Xác Nhận"
                          : appointment.status === "cancelled"
                          ? "Đã Hủy"
                          : appointment.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Không tìm thấy lịch hẹn nào
                </p>
              )}
            </div>
          </ComponentCard>
        </div>
      )}
      {/* Health Summary for guests */}
      {!user && (
        <div className="mt-6">
          <ComponentCard title="Tóm Tắt Sức Khỏe - Dữ Liệu Mẫu">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-xl font-bold text-blue-600">{healthStats.totalVisits}</p>
                <p className="text-sm text-blue-800 dark:text-blue-200">Lần khám</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                <p className="text-xl font-bold text-green-600">{healthStats.completedTests}</p>
                <p className="text-sm text-green-800 dark:text-green-200">Xét nghiệm</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                <p className="text-xl font-bold text-yellow-600">{healthStats.pendingResults}</p>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">Chờ kết quả</p>
              </div>            </div>
          </ComponentCard>        </div>
      )}

      {/* Bills Section for guests */}
      {!user && (
        <div className="mt-6">
          <ComponentCard title="Hóa Đơn - Dữ Liệu Mẫu">
            <div className="space-y-4">
              {mockBills.map((bill) => (
                <div
                  key={bill.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {bill.description}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ngày tạo: {bill.created_date} | Hạn: {bill.due_date}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Bác sĩ: {bill.doctor}
                    </p>
                  </div>
                  <div className="text-right mr-4">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
                      {bill.amount.toLocaleString("vi-VN")}đ
                    </p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      bill.status === 'paid' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {bill.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </span>
                  </div>
                  <div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openBillDetail(bill)}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center pt-4">
              <Link to="/signin">
                <Button variant="outline" size="sm">
                  Đăng Nhập Để Xem Tất Cả Hóa Đơn
                </Button>  
              </Link>
            </div>
          </ComponentCard>
        </div>
      )}

      {/* Recent Appointments - Show for both logged in and guest users */}
      <div className="mt-6">
        <ComponentCard title={user ? "Lịch Hẹn Gần Đây" : "Lịch Hẹn Mẫu"}>
          <div className="space-y-4">
            {user ? (
              appointmentsLoading ? (
                <div>Đang tải lịch hẹn...</div>
              ) : appointments?.results?.length ? (
                appointments.results.slice(0, 3).map((appointment: any) => (
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        Bác sĩ {appointment.doctor_info?.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {appointment.note || "Khám tổng quát"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {format(
                          new Date(appointment.scheduled_time),
                          "dd/MM/yyyy"
                        )}
                      </p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(appointment.scheduled_time), "HH:mm")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-500">
                  Chưa có lịch hẹn nào
                </div>
              )
            ) : (              // Show mock appointments for guest users
              mockAppointments.results.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex justify-between items-center p-3 border rounded-lg"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {appointment.doctor_info.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {appointment.note} - {appointment.doctor_info.department}
                    </p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Đã xác nhận' : 'Chờ xác nhận'}
                    </span>
                  </div>
                  <div className="text-right mr-4">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(appointment.scheduled_time), "dd/MM/yyyy")}
                    </p>
                    <p className="text-sm text-gray-500">
                      {format(new Date(appointment.scheduled_time), "HH:mm")}
                    </p>
                  </div>
                  <div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openAppointmentDetail(appointment)}
                    >
                      Chi tiết
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="text-center pt-4">
            <Link to={user ? "/patient/my-appointments" : "/signin"}>
              <Button variant="outline" size="sm">
                {user ? "Xem Tất Cả Lịch Hẹn" : "Đăng Nhập Để Xem Lịch Hẹn"}
              </Button>  
            </Link>
          </div>
        </ComponentCard>
      </div>
      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl text-gray-900 dark:text-white mb-4">
          Thao Tác Nhanh
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link to="/patient/book-appointment">
            <Button className="w-full">Đặt Lịch Hẹn</Button>
          </Link>
          <Link to={user ? "/patient/medical-records" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Hồ Sơ Y Tế" : "Đăng Nhập Để Xem Hồ Sơ"}
            </Button>
          </Link>
          <Link to={user ? "/patient/prescriptions" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Đơn Thuốc" : "Đăng Nhập Để Xem Đơn Thuốc"}
            </Button>
          </Link>
          <Link to={user ? "/patient/my-appointments" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Lịch Hẹn Của Tôi" : "Đăng Nhập Để Xem Lịch Hẹn"}
            </Button>
          </Link>
          <Link to={user ? "/patient/billing-payments" : "/signin"}>
            <Button variant="outline" className="w-full">
              {user ? "Thanh Toán" : "Đăng Nhập Để Thanh Toán"}
            </Button>          </Link>
        </div>
      </div>      {/* Appointment Detail Modal */}
      <AppointmentDetailModal />
      
      {/* Bill Detail Modal */}
      <BillDetailModal />

      {/* Profile Detail Modal */}
      <ProfileDetailModal />
    </>
  );
}
