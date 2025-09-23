import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DocumentTemplate from "../templates/DocumentTemplate";
import style from "./DocumentPreview.module.css";
import { ErrorBoundary } from "react";

const DocumentPreview = ({ data }) => {
  const [showPreview, setShowPreview] = useState(true);

  if (!data) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No data available for preview</p>
      </div>
    );
  }

  return (
    <div>
      {/* Action Buttons */}
      <div className={style.buttonContainer}>
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={style.button}
        >
          {showPreview ? "Hide Preview" : "Show PDF Preview"}
        </button>

        <PDFDownloadLink
          document={<DocumentTemplate data={data} />}
          fileName={"insurance-draft.pdf"}
          className={style.link}
        >
          {({ loading }) =>
            loading ? "Generating PDF..." : "Download Invoice PDF"
          }
        </PDFDownloadLink>
      </div>

      {/* PDF Preview */}
      {showPreview && (
        <div className={style.pdfDocumentModal}>
          <div className={style.pdfContent} style={{ height: "100%" }}>
            <PDFViewer width="100%" height="100%">
              <DocumentTemplate data={data} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentPreview;
