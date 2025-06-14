import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { useState } from "react";
import { format } from "date-fns";

export default function MyAppointments() {
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const appointments = [
    {
      id: 1,
      date: "2024-01-20",
      time: "10:00 AM",
      doctor: "Dr. John Smith",
      department: "Cardiology",
      status: "Confirmed",
      reason: "Regular checkup",
      doctor_info: {
        name: "Dr. John Smith",
        department: "Cardiology",
        phone: "0901234567",
        specialization: "Heart Specialist",
        experience: "15 years experience",
        education: "Harvard Medical School",
      },
      scheduled_time: "2024-01-20T10:00:00Z",
      note: "Regular checkup",
      appointment_type: "Regular checkup",
      room: "Room 101",
      estimated_duration: "30 minutes",
      preparation_notes: "No special preparation needed",
      created_at: "2024-01-15T09:00:00Z",
    },
    {
      id: 2,
      date: "2024-01-25",
      time: "02:00 PM",
      doctor: "Dr. Sarah Johnson",
      department: "General Medicine",
      status: "Pending",
      reason: "Follow-up consultation",
      doctor_info: {
        name: "Dr. Sarah Johnson",
        department: "General Medicine",
        phone: "0907654321",
        specialization: "General Practitioner",
        experience: "12 years experience",
        education: "Stanford Medical School",
      },
      scheduled_time: "2024-01-25T14:00:00Z",
      note: "Follow-up consultation",
      appointment_type: "Follow-up",
      room: "Room 205",
      estimated_duration: "45 minutes",
      preparation_notes: "Bring previous test results",
      created_at: "2024-01-18T11:30:00Z",
    },
  ];

  const openAppointmentDetail = (appointment: any) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Appointment Detail Modal Component
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
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Doctor Information</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p><strong>Name:</strong> {selectedAppointment.doctor_info.name}</p>
                    <p><strong>Department:</strong> {selectedAppointment.doctor_info.department}</p>
                    <p><strong>Specialization:</strong> {selectedAppointment.doctor_info.specialization}</p>
                    <p><strong>Experience:</strong> {selectedAppointment.doctor_info.experience}</p>
                    <p><strong>Education:</strong> {selectedAppointment.doctor_info.education}</p>
                    <p><strong>Phone:</strong> {selectedAppointment.doctor_info.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Appointment Details</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <p><strong>Date & Time:</strong> {format(new Date(selectedAppointment.scheduled_time), "dd/MM/yyyy HH:mm")}</p>
                    <p><strong>Type:</strong> {selectedAppointment.appointment_type}</p>
                    <p><strong>Room:</strong> {selectedAppointment.room}</p>
                    <p><strong>Duration:</strong> {selectedAppointment.estimated_duration}</p>
                    <p><strong>Status:</strong> 
                      <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                        selectedAppointment.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedAppointment.status}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Notes</h3>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                  <p><strong>Reason:</strong> {selectedAppointment.note}</p>
                  <p><strong>Preparation:</strong> {selectedAppointment.preparation_notes}</p>
                  <p><strong>Booked:</strong> {format(new Date(selectedAppointment.created_at), "dd/MM/yyyy HH:mm")}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary">
                Edit Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <PageMeta
        title="My Appointments | Health Care System"
        description="View and manage your appointments"
      />
      <PageBreadcrumb pageTitle="My Appointments" />

      <ComponentCard title="Upcoming Appointments">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Date & Time</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className="border-b">
                  <td className="px-4 py-2">
                    <div>
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-gray-500">
                        {appointment.time}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-2">{appointment.doctor}</td>
                  <td className="px-4 py-2">{appointment.department}</td>
                  <td className="px-4 py-2">{appointment.reason}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </td>                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => openAppointmentDetail(appointment)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        // startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        // startIcon={<TrashIcon />}
                      >
                        Cancel
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>          </table>
        </div>
      </ComponentCard>

      {/* Appointment Detail Modal */}
      <AppointmentDetailModal />
    </>
  );
}
