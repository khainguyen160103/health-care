import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { PlusIcon } from "../../icons";

export default function StaffSchedule() {
  const [selectedWeek, setSelectedWeek] = useState("2024-W03");
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    staffId: "",
    date: "",
    startTime: "",
    endTime: "",
    shift: "",
    department: "",
  });

  const schedules = [
    {
      id: 1,
      staff: "Dr. John Smith",
      role: "Doctor",
      department: "Cardiology",
      monday: "08:00-16:00",
      tuesday: "08:00-16:00",
      wednesday: "Off",
      thursday: "08:00-16:00",
      friday: "08:00-16:00",
      saturday: "Off",
      sunday: "Off",
    },
    {
      id: 2,
      staff: "Sarah Johnson",
      role: "Pharmacist",
      department: "Pharmacy",
      monday: "09:00-17:00",
      tuesday: "09:00-17:00",
      wednesday: "09:00-17:00",
      thursday: "09:00-17:00",
      friday: "09:00-17:00",
      saturday: "09:00-13:00",
      sunday: "Off",
    },
    {
      id: 3,
      staff: "Mike Wilson",
      role: "Lab Technician",
      department: "Laboratory",
      monday: "07:00-15:00",
      tuesday: "07:00-15:00",
      wednesday: "07:00-15:00",
      thursday: "Off",
      friday: "07:00-15:00",
      saturday: "07:00-15:00",
      sunday: "07:00-15:00",
    },
  ];

  const shifts = ["Morning", "Afternoon", "Night", "Full Day"];
  const departments = [
    "Cardiology",
    "General Medicine",
    "Pharmacy",
    "Laboratory",
    "Emergency",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding schedule:", scheduleForm);
    setShowAddSchedule(false);
    setScheduleForm({
      staffId: "",
      date: "",
      startTime: "",
      endTime: "",
      shift: "",
      department: "",
    });
  };

  return (
    <>
      <PageMeta
        title="Staff Schedule | Health Care System"
        description="Manage staff schedules and shifts"
      />
      <PageBreadcrumb pageTitle="Staff Schedule" />

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div>
          <label className="mb-2 block text-sm font-medium">Select Week:</label>
          <input
            type="week"
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
          />
        </div>
        <Button
          variant="primary"
          startIcon={<PlusIcon />}
          onClick={() => setShowAddSchedule(true)}
        >
          Add Schedule
        </Button>
      </div>

      {/* Add Schedule Form */}
      {showAddSchedule && (
        <ComponentCard title="Add New Schedule">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Staff Member
                </label>
                <select
                  value={scheduleForm.staffId}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      staffId: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                >
                  <option value="">Select Staff</option>
                  <option value="1">Dr. John Smith</option>
                  <option value="2">Sarah Johnson</option>
                  <option value="3">Mike Wilson</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Department
                </label>
                <select
                  value={scheduleForm.department}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      department: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, date: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Shift</label>
                <select
                  value={scheduleForm.shift}
                  onChange={(e) =>
                    setScheduleForm({ ...scheduleForm, shift: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                >
                  <option value="">Select Shift</option>
                  {shifts.map((shift) => (
                    <option key={shift} value={shift}>
                      {shift}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Start Time
                </label>
                <input
                  type="time"
                  value={scheduleForm.startTime}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      startTime: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  End Time
                </label>
                <input
                  type="time"
                  value={scheduleForm.endTime}
                  onChange={(e) =>
                    setScheduleForm({
                      ...scheduleForm,
                      endTime: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowAddSchedule(false)}
              >
                Cancel
              </Button>
              <Button variant="primary">Add Schedule</Button>
            </div>
          </form>
        </ComponentCard>
      )}

      {/* Weekly Schedule */}
      <ComponentCard title={`Weekly Schedule - Week ${selectedWeek}`}>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Staff</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Monday</th>
                <th className="px-4 py-2 text-left">Tuesday</th>
                <th className="px-4 py-2 text-left">Wednesday</th>
                <th className="px-4 py-2 text-left">Thursday</th>
                <th className="px-4 py-2 text-left">Friday</th>
                <th className="px-4 py-2 text-left">Saturday</th>
                <th className="px-4 py-2 text-left">Sunday</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="border-b">
                  <td className="px-4 py-2 font-medium">{schedule.staff}</td>
                  <td className="px-4 py-2">{schedule.role}</td>
                  <td className="px-4 py-2">{schedule.department}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs ${
                        schedule.monday === "Off"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.monday}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs ${
                        schedule.tuesday === "Off"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.tuesday}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs ${
                        schedule.wednesday === "Off"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.wednesday}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs ${
                        schedule.thursday === "Off"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.thursday}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs ${
                        schedule.friday === "Off"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.friday}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs ${
                        schedule.saturday === "Off"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.saturday}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs ${
                        schedule.sunday === "Off"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {schedule.sunday}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
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
