import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

// SVG Icons components
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

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