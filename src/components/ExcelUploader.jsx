import { useCallback, useState } from "react";
import * as XLSX from "xlsx";

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
          // You can customize these mappings based on your Excel structure
          const invoiceData = {
            // Basic invoice info
            invoiceNumber:
              lastRow["Invoice Number"] ||
              lastRow["InvoiceNumber"] ||
              lastRow["Invoice_Number"] ||
              `INV-${Date.now()}`,
            date: formatDate(
              lastRow["Date"] || lastRow["Invoice Date"] || new Date()
            ),
            dueDate: formatDate(
              lastRow["Due Date"] ||
                lastRow["DueDate"] ||
                addDays(new Date(), 30)
            ),

            // Client information
            clientName:
              lastRow["Client Name"] ||
              lastRow["ClientName"] ||
              lastRow["Client"] ||
              "Client Name Missing",
            clientAddress:
              lastRow["Client Address"] ||
              lastRow["ClientAddress"] ||
              lastRow["Address"] ||
              "",
            clientEmail:
              lastRow["Client Email"] ||
              lastRow["ClientEmail"] ||
              lastRow["Email"] ||
              "",
            clientPhone:
              lastRow["Client Phone"] ||
              lastRow["ClientPhone"] ||
              lastRow["Phone"] ||
              "",

            // Company info (you can hardcode these or add to Excel)
            companyName: lastRow["Company Name"] || "Your Company Name",
            companyAddress:
              lastRow["Company Address"] || "Your Company Address",
            companyPhone: lastRow["Company Phone"] || "Your Phone Number",
            companyEmail: lastRow["Company Email"] || "your@email.com",

            // Invoice items - support both single item and multiple items
            items: parseInvoiceItems(lastRow),

            // Calculations
            subtotal: parseFloat(lastRow["Subtotal"] || lastRow["Amount"] || 0),
            taxRate: parseFloat(
              lastRow["Tax Rate"] || lastRow["TaxRate"] || 0.1
            ), // 10% default
            notes: lastRow["Notes"] || lastRow["Description"] || "",
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

  // Helper function to parse invoice items
  const parseInvoiceItems = (row) => {
    // Try to find item data in various column formats
    const items = [];

    // Single item format
    const description =
      row["Description"] ||
      row["Item Description"] ||
      row["Service"] ||
      "Service Provided";
    const quantity = parseFloat(row["Quantity"] || row["Qty"] || 1);
    const rate = parseFloat(row["Rate"] || row["Price"] || row["Amount"] || 0);

    items.push({
      description,
      quantity,
      rate,
      amount: quantity * rate,
    });

    // TODO: Add support for multiple items if needed
    // You can extend this to parse multiple item columns like Item1, Item2, etc.

    return items;
  };

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
    <div className="space-y-4">
      {/* File Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
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
            <p className="text-lg font-medium text-gray-900 mb-2">
              Drop your Excel file here
            </p>
            <p className="text-gray-600 mb-4">or click to browse files</p>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 cursor-pointer inline-block transition-colors"
            >
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
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Excel File Format:
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>
            • Column headers should include: Client Name, Invoice Number, Date,
            Amount, Description
          </li>
          <li>
            • The last row in your Excel sheet will be used for the invoice
          </li>
          <li>• Supported formats: .xlsx, .xls</li>
        </ul>
      </div>
    </div>
  );
};

export default ExcelUploader;
