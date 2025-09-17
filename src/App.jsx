import { useState } from "react";
import ExcelUploader from "./components/ExcelUploader";
import DocumentPreview from "./components/DocumentPreview";

import style from "./App.module.css";

export default function App() {
  const [documentData, setDocumentData] = useState("null");
  const [isLoading, setIsLoading] = useState(false);

  const handleExcelData = (data) => {
    setDocumentData(data);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <header className={style.header}>
          <h1 className={style.headerHeading}>Document generator</h1>
          <p>Upload your excel file to generate Profesional Document</p>
        </header>

        <div className={style.gridContainer}>
          {/*left column - excle upload*/}
          <div>
            <h2>Upload Excel File</h2>
            <ExcelUploader
              onDataExtracted={handleExcelData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {/*Show parsed data preview*/}
            {documentData && (
              <div>
                <h3>Parsed data Preview:</h3>
                <div>
                  <p>
                    <span>Client:</span> {documentData.clientName || "N/A"}
                  </p>
                  <p>
                    <span>Invoice #:</span>{" "}
                    {documentData.invoiceNumber || "N/A"}
                  </p>
                  <p>
                    <span>Amount:</span> ${documentData.amount || "0.00"}
                  </p>
                  <p>
                    <span>Date:</span> {documentData.date || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/*right column - PDF preview */}

          <div>
            <h2>Invoice Preview</h2>
            {documentData ? (
              <DocumentPreview data={documentData} />
            ) : (
              <div>
                <p>Upload your excel file to see your pdf document</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
