import { useState } from "react";
import ExcelUploader from "./components/ExcelUploader";
import DocumentPreview from "./components/DocumentPreview";

import style from "./App.module.css";

function App() {
  const [invoiceData, setInvoiceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExcelData = (data) => {
    setInvoiceData(data);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.seconadaryContainer}>
        <div className={style.flexRow}>
          {/* Left Column - Excel Upload */}
          <div className={style.leftColumn}>
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Document Generator
              </h1>
              <p className="text-gray-600">
                Upload your Excel file to generate professional documents
              </p>
            </header>
            <h2 className="text-xl font-semibold mb-4">Upload Excel File</h2>
            <ExcelUploader
              onDataExtracted={handleExcelData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {/* Show parsed data preview */}
            {invoiceData && (
              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">
                  Parsed Data Preview:
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {invoiceData.clientName || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">ID:</span>{" "}
                    {invoiceData.invoiceNumber || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {invoiceData.date || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Department:</span>{" "}
                    {invoiceData.clientAddress || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - PDF Preview/Generation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Invoice Preview</h2>
            {invoiceData ? (
              <DocumentPreview data={invoiceData} />
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>Upload an Excel file to see your invoice preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
