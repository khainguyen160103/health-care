import { useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import Button from "../../components/ui/button/Button";
import { PlusIcon, DownloadIcon } from "../../icons";

export default function TestReports() {
  const [showAddReport, setShowAddReport] = useState(false);
  const [reportForm, setReportForm] = useState({
    orderNumber: "",
    testType: "",
    results: "",
    interpretation: "",
    technician: "",
    reviewed: false,
  });

  const testResults = [
    {
      id: 1,
      orderNumber: "LAB001",
      patient: "John Doe",
      testType: "Complete Blood Count",
      results: {
        WBC: {
          value: "8.5",
          unit: "×10³/μL",
          range: "4.0-11.0",
          status: "Normal",
        },
        RBC: { value: "4.2", unit: "×10⁶/μL", range: "4.5-5.5", status: "Low" },
        Hemoglobin: {
          value: "12.5",
          unit: "g/dL",
          range: "14.0-18.0",
          status: "Low",
        },
        Hematocrit: { value: "37.2", unit: "%", range: "42-52", status: "Low" },
      },
      interpretation: "Mild anemia suggested. Recommend iron studies.",
      technician: "Lab Tech A",
      completed: "2024-01-20 14:30",
      status: "Final",
      critical: false,
    },
    {
      id: 2,
      orderNumber: "LAB002",
      patient: "Jane Smith",
      testType: "Blood Glucose",
      results: {
        Glucose: {
          value: "350",
          unit: "mg/dL",
          range: "70-100",
          status: "Critical High",
        },
      },
      interpretation:
        "Severely elevated glucose. Immediate physician notification required.",
      technician: "Lab Tech B",
      completed: "2024-01-20 15:15",
      status: "Final",
      critical: true,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding report:", reportForm);
    setShowAddReport(false);
    setReportForm({
      orderNumber: "",
      testType: "",
      results: "",
      interpretation: "",
      technician: "",
      reviewed: false,
    });
  };

  const handleSendReport = (reportId: number) => {
    console.log("Sending report:", reportId);
  };

  return (
    <>
      <PageMeta
        title="Test Reports | Health Care System"
        description="Upload and manage test reports"
      />
      <PageBreadcrumb pageTitle="Test Reports" />

      <div className="mb-6">
        <Button
          variant="primary"
          startIcon={<PlusIcon />}
          onClick={() => setShowAddReport(true)}
        >
          Add Test Report
        </Button>
      </div>

      {/* Add Report Form */}
      {showAddReport && (
        <ComponentCard title="Add Test Report">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Order Number
                </label>
                <select
                  value={reportForm.orderNumber}
                  onChange={(e) =>
                    setReportForm({
                      ...reportForm,
                      orderNumber: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  required
                >
                  <option value="">Select Order</option>
                  <option value="LAB003">LAB003 - Mike Johnson</option>
                  <option value="LAB004">LAB004 - Sarah Wilson</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Test Type
                </label>
                <input
                  type="text"
                  value={reportForm.testType}
                  onChange={(e) =>
                    setReportForm({ ...reportForm, testType: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  placeholder="e.g., Complete Blood Count"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Test Results
              </label>
              <textarea
                value={reportForm.results}
                onChange={(e) =>
                  setReportForm({ ...reportForm, results: e.target.value })
                }
                rows={6}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Enter detailed test results..."
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Clinical Interpretation
              </label>
              <textarea
                value={reportForm.interpretation}
                onChange={(e) =>
                  setReportForm({
                    ...reportForm,
                    interpretation: e.target.value,
                  })
                }
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Clinical interpretation and recommendations..."
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Technician
              </label>
              <input
                type="text"
                value={reportForm.technician}
                onChange={(e) =>
                  setReportForm({ ...reportForm, technician: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                placeholder="Technician name"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reviewed"
                checked={reportForm.reviewed}
                onChange={(e) =>
                  setReportForm({ ...reportForm, reviewed: e.target.checked })
                }
                className="rounded border-gray-300"
              />
              <label htmlFor="reviewed" className="text-sm font-medium">
                Report has been reviewed and approved
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setShowAddReport(false)}>
                Cancel
              </Button>
              <Button variant="primary">Save Report</Button>
            </div>
          </form>
        </ComponentCard>
      )}

      {/* Test Results */}
      <div className="space-y-6">
        {testResults.map((result) => (
          <ComponentCard
            key={result.id}
            title={`${result.testType} - ${result.patient}`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Order: {result.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    Completed: {result.completed}
                  </p>
                  <p className="text-sm text-gray-500">
                    Technician: {result.technician}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {result.critical && (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-800">
                      Critical
                    </span>
                  )}
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                    {result.status}
                  </span>
                </div>
              </div>

              {/* Test Results Table */}
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700">
                      <th className="px-3 py-2 text-left">Test</th>
                      <th className="px-3 py-2 text-left">Result</th>
                      <th className="px-3 py-2 text-left">Unit</th>
                      <th className="px-3 py-2 text-left">Reference Range</th>
                      <th className="px-3 py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(result.results).map(([testName, data]) => (
                      <tr key={testName} className="border-b">
                        <td className="px-3 py-2 font-medium">{testName}</td>
                        <td className="px-3 py-2">{data.value}</td>
                        <td className="px-3 py-2">{data.unit}</td>
                        <td className="px-3 py-2">{data.range}</td>
                        <td className="px-3 py-2">
                          <span
                            className={`rounded-full px-2 py-1 text-xs ${
                              data.status === "Normal"
                                ? "bg-green-100 text-green-800"
                                : data.status.includes("Critical")
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {data.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Interpretation */}
              <div>
                <h4 className="font-medium mb-2">Clinical Interpretation:</h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {result.interpretation}
                </p>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-2">
                <Button size="sm" variant="outline">
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  startIcon={<DownloadIcon />}
                >
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => handleSendReport(result.id)}
                >
                  Send to Doctor
                </Button>
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>
    </>
  );
}
