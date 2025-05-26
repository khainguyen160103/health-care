import React from "react";
import { User } from "../types/index";

export interface NavItem {
  icon: React.ReactNode;
  name: string;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean }[];
  roles: User["user_type"][];
}

// Icon Components với SVG thực tế
const GridIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
  </svg>
);

const CalenderIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const DocumentIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const PillIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L14.618 10h-4.357l-.487.973a1 1 0 11-1.79-.895l.99-1.98a.869.869 0 01.02-.037l2.991-5.982A1 1 0 0112 2z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const UserGroupIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
  </svg>
);

const HeartIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ClipboardIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2v1a2 2 0 002 2h4a2 2 0 002-2V3a2 2 0 012 2v6.5a1.5 1.5 0 01-3 0V7a1 1 0 10-2 0v4.5a1.5 1.5 0 01-3 0V7a1 1 0 10-2 0v4.5a1.5 1.5 0 01-3 0V5z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const CogIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const BoxIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
  </svg>
);

const TruckIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"></path>
    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707L16 7.586A1 1 0 0015.414 7H14z"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const BeakerIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.010-3.231 2.121-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ChatIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-5 h-5"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export const getNavigationByRole = (userType: User["user_type"]) => {
  const allNavItems: NavItem[] = [
    {
      icon: React.createElement(GridIcon),
      name: "Dashboard",
      path: "/",
      roles: [
        "patient",
        "doctor",
        "nurse",
        "administrator",
        "pharmacist",
        "insurance_provider",
        "laboratory_technician",
      ],
    },
    // Patient Routes
    {
      icon: React.createElement(CalenderIcon),
      name: "My Appointments",
      path: "/my-appointments",
      roles: ["patient"],
    },
    {
      icon: React.createElement(DocumentIcon),
      name: "Medical Records",
      path: "/medical-records",
      roles: ["patient"],
    },
    {
      icon: React.createElement(PillIcon),
      name: "My Prescriptions",
      path: "/prescriptions",
      roles: ["patient"],
    },
    // Doctor Routes
    {
      icon: React.createElement(CalenderIcon),
      name: "Appointments",
      path: "/appointments",
      roles: ["doctor"],
    },
    {
      icon: React.createElement(UserGroupIcon),
      name: "Patients",
      path: "/patients",
      roles: ["doctor", "nurse"],
    },
    {
      icon: React.createElement(DocumentIcon),
      name: "Medical Records",
      path: "/patient-records",
      roles: ["doctor", "nurse"],
    },
    {
      icon: React.createElement(PillIcon),
      name: "Prescriptions",
      path: "/manage-prescriptions",
      roles: ["doctor"],
    },
    // Nurse Routes
    {
      icon: React.createElement(HeartIcon),
      name: "Patient Care",
      path: "/patient-care",
      roles: ["nurse"],
    },
    {
      icon: React.createElement(ClipboardIcon),
      name: "Vitals",
      path: "/patient-vitals",
      roles: ["nurse"],
    },
    // Administrator Routes
    {
      icon: React.createElement(UserGroupIcon),
      name: "User Management",
      path: "/users",
      roles: ["administrator"],
    },
    {
      icon: React.createElement(CalenderIcon),
      name: "Schedule Management",
      path: "/schedules",
      roles: ["administrator"],
    },
    {
      icon: React.createElement(CogIcon),
      name: "System Settings",
      path: "/settings",
      roles: ["administrator"],
    },
    // Pharmacist Routes
    {
      icon: React.createElement(PillIcon),
      name: "Prescription Review",
      path: "/prescription-review",
      roles: ["pharmacist"],
    },
    {
      icon: React.createElement(BoxIcon),
      name: "Medicine Inventory",
      path: "/inventory",
      roles: ["pharmacist"],
    },
    {
      icon: React.createElement(TruckIcon),
      name: "Medicine Dispensing",
      path: "/dispensing",
      roles: ["pharmacist"],
    },
    // Insurance Provider Routes
    {
      icon: React.createElement(ShieldIcon),
      name: "Insurance Verification",
      path: "/insurance-verification",
      roles: ["insurance_provider"],
    },
    {
      icon: React.createElement(DocumentIcon),
      name: "Claims Processing",
      path: "/claims",
      roles: ["insurance_provider"],
    },
    // Laboratory Technician Routes
    {
      icon: React.createElement(BeakerIcon),
      name: "Lab Tests",
      path: "/lab-tests",
      roles: ["laboratory_technician"],
    },
    {
      icon: React.createElement(DocumentIcon),
      name: "Test Results",
      path: "/test-results",
      roles: ["laboratory_technician"],
    },
    {
      icon: React.createElement(ChatIcon),
      name: "Doctor Communication",
      path: "/doctor-communication",
      roles: ["laboratory_technician"],
    },
    // Common Routes
    {
      icon: React.createElement(UserIcon),
      name: "Profile",
      path: "/profile",
      roles: [
        "patient",
        "doctor",
        "nurse",
        "administrator",
        "pharmacist",
        "insurance_provider",
        "laboratory_technician",
      ],
    },
  ];

  return allNavItems.filter((item) => item.roles.includes(userType));
};
