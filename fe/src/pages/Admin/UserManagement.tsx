import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { PlusIcon } from "../../icons";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [showAddUser, setShowAddUser] = useState(false);
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    department: "",
    phone: "",
  });

  const users = [
    {
      id: 1,
      name: "Dr. John Smith",
      email: "john.smith@hospital.com",
      role: "Doctor",
      department: "Cardiology",
      status: "Active",
      lastLogin: "2024-01-20",
    },
    {
      id: 2,
      name: "Jane Doe",
      email: "jane.doe@hospital.com",
      role: "Patient",
      department: "-",
      status: "Active",
      lastLogin: "2024-01-19",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      email: "sarah.j@hospital.com",
      role: "Pharmacist",
      department: "Pharmacy",
      status: "Active",
      lastLogin: "2024-01-20",
    },
    {
      id: 4,
      name: "Mike Wilson",
      email: "mike.w@hospital.com",
      role: "Lab Technician",
      department: "Laboratory",
      status: "Inactive",
      lastLogin: "2024-01-15",
    },
  ];

  const roles = [
    "All",
    "Doctor",
    "Patient",
    "Pharmacist",
    "Lab Technician",
    "Admin",
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding user:", userForm);
    setShowAddUser(false);
    setUserForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      department: "",
      phone: "",
    });
  };

  return (
    <>
      <PageMeta
        title="User Management | Health Care System"
        description="Manage system users and roles"
      />
      <PageBreadcrumb pageTitle="User Management" />

      <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex space-x-4">
          <div className="relative">
            {/* <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /> */}
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <Button
          variant="primary"
          startIcon={<PlusIcon />}
          onClick={() => setShowAddUser(true)}
        >
          Add User
        </Button>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <ComponentCard title="Add New User">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  value={userForm.firstName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, firstName: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  value={userForm.lastName}
                  onChange={(e) =>
                    setUserForm({ ...userForm, lastName: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  value={userForm.phone}
                  onChange={(e) =>
                    setUserForm({ ...userForm, phone: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Role</label>
                <select
                  value={userForm.role}
                  onChange={(e) =>
                    setUserForm({ ...userForm, role: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Patient">Patient</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Department
                </label>
                <input
                  type="text"
                  value={userForm.department}
                  onChange={(e) =>
                    setUserForm({ ...userForm, department: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="e.g., Cardiology, Pharmacy"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowAddUser(false)}>
                Cancel
              </Button>
              <Button variant="primary">Add User</Button>
            </div>
          </form>
        </ComponentCard>
      )}

      {/* Users List */}
      <ComponentCard title="System Users">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Last Login</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2 font-medium">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.department}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.lastLogin}</td>
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
                        Delete
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
