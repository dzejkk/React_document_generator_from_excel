import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DocumentTemplate from "../templates/DocumentTemplate";
import LetterTemplate from "../templates/LetterTemplate";
import style from "./DocumentPreview.module.css";
import { BatchDownloader } from "../utils/batchDownloader";

const DocumentPreview = ({ data }) => {
  const [showPreview, setShowPreview] = useState(true);
  const [activeTemplate, setActiveTemplate] = useState("health");

  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data available for preview</p>
      </div>
    );
  }

  return (
    <div className={style.documentPreview}>
      <div className={style.buttonContainer}>
        <button
          className={style.buttonTwo}
          onClick={() => BatchDownloader(data)}
        >
          Download both files
        </button>
        {/* Preview Toggle */}
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={style.button}
        >
          {showPreview ? "Hide Preview" : "Show PDF Preview"}
        </button>

        {/* Download Buttons */}
        <PDFDownloadLink
          document={<DocumentTemplate data={data} />}
          fileName={`health-report-${data.invoiceNumber || "draft"}.pdf`}
          className={`${style.link} bg-blue-600`}
        >
          {({ loading }) =>
            loading ? "Generating Health Report..." : "📋 Download  Report"
          }
        </PDFDownloadLink>

        <PDFDownloadLink
          document={<LetterTemplate data={data} />}
          fileName={`letter-${data.invoiceNumber || "draft"}.pdf`}
          className={`${style.link} bg-green-600`}
        >
          {({ loading }) =>
            loading ? "Generating Letter..." : "📄 Download Letter"
          }
        </PDFDownloadLink>
      </div>

      {/* PDF Preview */}
      {showPreview && (
        <div className={style.pdfDocumentModal}>
          {/* Template Toggle Buttons */}
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <button
              onClick={() => setActiveTemplate("health")}
              className={`px-4 py-2 mr-2 rounded ${
                activeTemplate === "health"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              📋 Health Report Preview
            </button>
            <button
              onClick={() => setActiveTemplate("letter")}
              className={`px-4 py-2 rounded ${
                activeTemplate === "letter"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              📄 Letter Preview
            </button>
          </div>

          {/* PDF Viewer */}
          <div className={style.pdfContent} style={{ height: "1024px" }}>
            {/* To force a re-render, add a key prop to the PDFViewer that changes when activeTemplate changes.*/}
            <PDFViewer key={activeTemplate} width="100%" height="100%">
              {" "}
              {activeTemplate === "health" ? (
                <DocumentTemplate data={data} />
              ) : (
                <LetterTemplate data={data} />
              )}
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
