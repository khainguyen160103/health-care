import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { Link } from "react-router-dom";
import { CalenderIcon, UserIcon } from "../../icons";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  rating: number;
  availableSlots: string[];
  consultationFee: number;
  image?: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function BookAppointment() {
  const { user } = useAuthContext();
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("");
  const [appointmentReason, setAppointmentReason] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);

  const specialties = [
    "Tim Mạch",
    "Thần Kinh",
    "Nhi Khoa",
    "Da Liễu",
    "Mắt",
    "Tai Mũi Họng",
    "Xương Khớp",
    "Tiêu Hóa",
  ];

  const doctors: Doctor[] = [
    {
      id: 1,
      name: "BS. Nguyễn Văn A",
      specialty: "Tim Mạch",
      qualification: "Tiến sĩ Y học",
      experience: 15,
      rating: 4.8,
      availableSlots: ["09:00", "10:30", "14:00", "15:30"],
      consultationFee: 500000,
    },
    {
      id: 2,
      name: "BS. Trần Thị B",
      specialty: "Thần Kinh",
      qualification: "Thạc sĩ Y học",
      experience: 12,
      rating: 4.6,
      availableSlots: ["08:30", "10:00", "13:30", "16:00"],
      consultationFee: 450000,
    },
    {
      id: 3,
      name: "BS. Lê Văn C",
      specialty: "Nhi Khoa",
      qualification: "Tiến sĩ Y học",
      experience: 18,
      rating: 4.9,
      availableSlots: ["09:30", "11:00", "14:30", "16:30"],
      consultationFee: 400000,
    },
  ];

  const timeSlots: TimeSlot[] = [
    { time: "08:00", available: true },
    { time: "08:30", available: true },
    { time: "09:00", available: false },
    { time: "09:30", available: true },
    { time: "10:00", available: true },
    { time: "10:30", available: false },
    { time: "11:00", available: true },
    { time: "13:30", available: true },
    { time: "14:00", available: true },
    { time: "14:30", available: false },
    { time: "15:00", available: true },
    { time: "15:30", available: true },
    { time: "16:00", available: true },
    { time: "16:30", available: true },
  ];

  const filteredDoctors = selectedSpecialty
    ? doctors.filter((doctor) => doctor.specialty === selectedSpecialty)
    : doctors;

  const handleBookAppointment = () => {
    if (!user) {
      // Redirect to login
      return;
    }

    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert("Vui lòng chọn đầy đủ thông tin");
      return;
    }

    // Handle booking logic here
    alert("Đặt lịch hẹn thành công!");
    setShowBookingForm(false);
  };

  return (
    <>
      <PageMeta
        title="Đặt Lịch Hẹn | Hệ Thống Chăm Sóc Sức Khỏe"
        description="Đặt lịch hẹn khám bệnh với bác sĩ"
      />
      <PageBreadcrumb pageTitle="Đặt Lịch Hẹn" />

      <div className="space-y-6">
        {/* Step 1: Select Specialty */}
        <ComponentCard title="Bước 1: Chọn Chuyên Khoa">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty) => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`p-4 border rounded-lg text-center transition-colors ${
                  selectedSpecialty === specialty
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">{specialty}</div>
              </button>
            ))}
          </div>
        </ComponentCard>

        {/* Step 2: Select Doctor */}
        {selectedSpecialty && (
          <ComponentCard title="Bước 2: Chọn Bác Sĩ">
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedDoctor?.id === doctor.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                        <UserIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{doctor.name}</h3>
                        <p className="text-blue-600">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600">
                          {doctor.qualification}
                        </p>
                        <p className="text-sm text-gray-600">
                          {doctor.experience} năm kinh nghiệm
                        </p>
                        <div className="flex items-center space-x-1 mt-1">
                          <span className="text-yellow-500">⭐</span>
                          <span className="text-sm font-medium">
                            {doctor.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">
                        {doctor.consultationFee.toLocaleString("vi-VN")}đ
                      </p>
                      <p className="text-sm text-gray-500">Phí khám</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ComponentCard>
        )}

        {/* Step 3: Select Date and Time */}
        {selectedDoctor && (
          <ComponentCard title="Bước 3: Chọn Ngày và Giờ">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Chọn Ngày
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Chọn Giờ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() =>
                        slot.available && setSelectedTime(slot.time)
                      }
                      disabled={!slot.available}
                      className={`p-2 text-sm rounded-lg border transition-colors ${
                        selectedTime === slot.time
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : slot.available
                          ? "border-gray-200 hover:border-gray-300"
                          : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </ComponentCard>
        )}

        {/* Step 4: Appointment Details */}
        {selectedDoctor && selectedDate && selectedTime && (
          <ComponentCard title="Bước 4: Thông Tin Lịch Hẹn">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Lý Do Khám
                </label>
                <textarea
                  value={appointmentReason}
                  onChange={(e) => setAppointmentReason(e.target.value)}
                  className="w-full p-3 border rounded-lg"
                  rows={4}
                  placeholder="Mô tả triệu chứng hoặc lý do khám bệnh..."
                />
              </div>

              {/* Appointment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3">Tóm Tắt Lịch Hẹn</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Bác sĩ:</span>
                    <span className="font-medium">{selectedDoctor.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chuyên khoa:</span>
                    <span className="font-medium">
                      {selectedDoctor.specialty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ngày:</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giờ:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span>Tổng phí khám:</span>
                    <span className="font-medium text-green-600">
                      {selectedDoctor.consultationFee.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleBookAppointment}
                >
                  Xác Nhận Đặt Lịch
                </Button>
              </div>
            </div>
          </ComponentCard>
        )}
      </div>
    </>
  );
}
