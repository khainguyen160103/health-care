import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

export default function MyAppointments() {
  const appointments = [
    {
      id: 1,
      date: "2024-01-20",
      time: "10:00 AM",
      doctor: "Dr. John Smith",
      department: "Cardiology",
      status: "Confirmed",
      reason: "Regular checkup",
    },
    {
      id: 2,
      date: "2024-01-25",
      time: "02:00 PM",
      doctor: "Dr. Sarah Johnson",
      department: "General Medicine",
      status: "Pending",
      reason: "Follow-up consultation",
    },
  ];

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
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2">
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
            </tbody>
          </table>
        </div>
      </ComponentCard>
    </>
  );
}
