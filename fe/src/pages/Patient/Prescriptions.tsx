import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { DownloadIcon, EyeIcon } from "../../icons";

export default function Prescriptions() {
  const prescriptions = [
    {
      id: 1,
      date: "2024-01-15",
      doctor: "Dr. John Smith",
      medications: [
        { name: "Aspirin", dosage: "100mg", frequency: "Once daily", duration: "30 days" },
        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days" }
      ],
      status: "Active"
    },
    {
      id: 2,
      date: "2024-01-10",
      doctor: "Dr. Sarah Johnson",
      medications: [
        { name: "Amoxicillin", dosage: "250mg", frequency: "Three times daily", duration: "7 days" }
      ],
      status: "Completed"
    }
  ];

  return (
    <>
      <PageMeta
        title="Prescriptions | Health Care System"
        description="View your prescriptions and medications"
      />
      <PageBreadcrumb pageTitle="My Prescriptions" />
      
      <div className="space-y-6">
        {prescriptions.map((prescription) => (
          <ComponentCard key={prescription.id} title={`Prescription from ${prescription.doctor}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Date: {prescription.date}</p>
                  <span className={`inline-block rounded-full px-2 py-1 text-xs ${
                    prescription.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {prescription.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" startIcon={<EyeIcon />}>
                    View Details
                  </Button>
                  <Button size="sm" variant="outline" startIcon={<DownloadIcon />}>
                    Download
                  </Button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="px-4 py-2 text-left">Medication</th>
                      <th className="px-4 py-2 text-left">Dosage</th>
                      <th className="px-4 py-2 text-left">Frequency</th>
                      <th className="px-4 py-2 text-left">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prescription.medications.map((med, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2 font-medium">{med.name}</td>
                        <td className="px-4 py-2">{med.dosage}</td>
                        <td className="px-4 py-2">{med.frequency}</td>
                        <td className="px-4 py-2">{med.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>
    </>
  );
}