import { useState } from "react";
import ExcelUploader from "./components/ExcelUploader";
import DocumentPreview from "./components/DocumentPreview";

import style from "./App.module.css";

function App() {
  const [documentData, setDocumentDatadocumentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleExcelData = (data) => {
    setDocumentDatadocumentData(data);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.seconadaryContainer}>
        <div className={style.flexRow}>
          {/* Left Column - Excel Upload */}
          <div className={style.leftColumn}>
            <header>
              <h1>Document Generator</h1>
              <p className={style.appParagraph}>
                Upload your Excel file to generate professional documents
              </p>
            </header>
            <h2>Upload Excel File</h2>
            <ExcelUploader
              onDataExtracted={handleExcelData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {/* Show parsed data preview */}
            {documentData && (
              <div>
                <h3>Parsed Data Preview:</h3>
                <div>
                  <p>
                    <span className={style.fontMedium}>Name:</span>{" "}
                    {documentData.clientName || "N/A"}
                  </p>
                  <p>
                    <span className={style.fontMedium}>SOC ID:</span>{" "}
                    {documentData.clientSocNumber || "N/A"}
                  </p>
                  <p>
                    <span className={style.fontMedium}>Birth Date:</span>{" "}
                    {documentData.clientDateOfBirth || "N/A"}
                  </p>
                  <p>
                    <span className={style.fontMedium}>Department:</span>{" "}
                    {documentData.clientAddress || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - PDF Preview/Generation */}
          <div className={style.invoicePreviewContainer}>
            <h2 className={style.invoiceHeader}>Document Preview</h2>
            {documentData ? (
              <DocumentPreview data={documentData} />
            ) : (
              <div className={style.invoicePreviewInstructions}>
                <p className={style.paragraph}>
                  Upload an Excel file to see your document preview
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
