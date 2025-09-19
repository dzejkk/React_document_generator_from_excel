import { useState, useCallback } from "react";
import * as XLSX from "xlsx";
import style from "./ExcelUploader.module.css";

const ExcelUploader = ({ onDataExtracted, isLoading, setIsLoading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");

  // Parse Excel file and extract data from last row
  const parseExcelFile = useCallback(
    (file) => {
      setIsLoading(true);
      setError("");

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });

          // Get the first worksheet
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];

          // Convert to JSON array
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          if (jsonData.length === 0) {
            throw new Error("Excel file appears to be empty");
          }

          // Get the last row of data
          const lastRow = jsonData[jsonData.length - 1];

          // Map Excel columns to our invoice data structure
          // Mapping your actual column headers to invoice fields
          const invoiceData = {
            // Basic invoice info
            invoiceNumber: lastRow["ID1"] || `INV-${Date.now()}`,
            date: formatDate(
              lastRow["Date of confirmation of disease"] || new Date()
            ),
            dueDate: formatDate(addDays(new Date(), 30)), // 30 days from today

            // Client information (using Full Name as client)
            clientName:
              lastRow["Full Name (of the subject )"] || "Name Missing",
            clientAddress: lastRow["Department"] || "",
            clientEmail: lastRow["Email"] || "",
            clientPhone: "", // Not available in your data

            // Company info (you can hardcode these)
            companyName: "Your Company Name",
            companyAddress: "Your Company Address",
            companyPhone: "Your Phone Number",
            companyEmail: "your@email.com",

            // Invoice items - create from your data
            items: [
              {
                description: `${lastRow["Working Line"] || "Service"} - ${
                  lastRow["Positions"] || "Position"
                }`,
                quantity: 1,
                rate: 1000.0, // You can set default rate or add this to Excel
                amount: 1000.0,
              },
            ],

            // Calculations (you can set defaults or add to Excel)
            subtotal: 1000.0,
            taxRate: 0.1, // 10% default
            notes: `Risk Category: ${lastRow["Risk Category"] || "N/A"}`,
          };

          // Calculate totals
          invoiceData.taxAmount = invoiceData.subtotal * invoiceData.taxRate;
          invoiceData.total = invoiceData.subtotal + invoiceData.taxAmount;
          invoiceData.amount = invoiceData.total; // For preview display

          console.log("Parsed invoice data:", invoiceData);
          onDataExtracted(invoiceData);
        } catch (err) {
          console.error("Error parsing Excel file:", err);
          setError(`Error parsing Excel file: ${err.message}`);
        } finally {
          setIsLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Error reading file");
        setIsLoading(false);
      };

      reader.readAsBinaryString(file);
    },
    [onDataExtracted, setIsLoading]
  );

  // Helper functions
  const formatDate = (dateValue) => {
    if (!dateValue) return new Date().toISOString().split("T")[0];

    const date = new Date(dateValue);
    if (isNaN(date.getTime())) {
      return new Date().toISOString().split("T")[0];
    }

    return date.toISOString().split("T")[0];
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Handle file drop
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        setFileName(file.name);
        parseExcelFile(file);
      }
    },
    [parseExcelFile]
  );

  // Handle file input change
  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setFileName(file.name);
        parseExcelFile(file);
      }
    },
    [parseExcelFile]
  );

  return (
    <div className={style.container}>
      {/* File Upload Area */}
      <div
        className={`${style.dropArea} ${
          isDragOver ? style.dragOver : style.dropArea
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
      >
        {isLoading ? (
          <div className="py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2">Processing Excel file...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className={style.Instruction}>Drop your Excel file here</p>
            <p>or click to browse files</p>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className={style.hidden}
              id="file-upload"
            />
            <label htmlFor="file-upload" className={style.uploadButton}>
              Choose File
            </label>
            {fileName && (
              <p className="text-sm text-gray-600 mt-2">Selected: {fileName}</p>
            )}
          </>
        )}
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
              <div className="mt-2 text-sm text-red-700">{error}</div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className={style.formatRequirements}>
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Excel File Format:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            Column headers should include: Full Name, ID1, Date of confirmation
            of disease, Working Line, Department
          </li>
          <li>
            The last row in your Excel sheet will be used for the document
          </li>
          <li>Supported formats: .xlsx, .xls</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelUploader;
