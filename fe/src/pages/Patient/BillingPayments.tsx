import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";

// SVG Download Icon component
const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

export default function BillingPayments() {
  const bills = [
    {
      id: 1,
      date: "2024-01-15",
      description: "Consultation - Dr. John Smith",
      amount: 150,
      status: "Paid",
      paymentDate: "2024-01-16",
    },
    {
      id: 2,
      date: "2024-01-20",
      description: "Lab Tests - Blood Work",
      amount: 75,
      status: "Pending",
      paymentDate: null,
    },
    {
      id: 3,
      date: "2024-01-22",
      description: "Prescription - Medications",
      amount: 25,
      status: "Overdue",
      paymentDate: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const totalOutstanding = bills
    .filter((bill) => bill.status !== "Paid")
    .reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <>
      <PageMeta
        title="Billing & Payments | Health Care System"
        description="Manage your medical bills and payments"
      />
      <PageBreadcrumb pageTitle="Billing & Payments" />

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <ComponentCard title="Total Outstanding">
          <p className="text-2xl font-bold text-red-600">${totalOutstanding}</p>
        </ComponentCard>
        <ComponentCard title="This Month">
          <p className="text-2xl font-bold text-blue-600">$250</p>
        </ComponentCard>
        <ComponentCard title="Last Payment">
          <p className="text-2xl font-bold text-green-600">$150</p>
          <p className="text-sm text-gray-500">Jan 16, 2024</p>
        </ComponentCard>
      </div>

      <ComponentCard title="Medical Bills">
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Payment Date</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill.id} className="border-b">
                  <td className="px-4 py-2">{bill.date}</td>
                  <td className="px-4 py-2">{bill.description}</td>
                  <td className="px-4 py-2 font-medium">${bill.amount}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${getStatusColor(
                        bill.status
                      )}`}
                    >
                      {bill.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{bill.paymentDate || "-"}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-2">
                      {bill.status !== "Paid" && (
                        <Button
                          size="sm"
                          variant="primary"
                          // Replace the icon below with a valid one or remove if not needed
                          // startIcon={<CreditCardIcon />}
                        >
                          Pay Now
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        startIcon={<DownloadIcon />}
                      >
                        Download
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
