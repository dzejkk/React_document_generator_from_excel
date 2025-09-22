import { useState } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import DocumentTemplate from "../templates/DocumentTemplate";
import style from "./DocumentPreview.module.css";

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
    <div className={style.documentPreview}>
      {/* Data Summary */}
      {/* <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Invoice Summary</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Invoice #:</span>
            <span className="ml-2 font-medium">{data.invoiceNumber}</span>
          </div>
          <div>
            <span className="text-gray-600">Date:</span>
            <span className="ml-2 font-medium">{data.date}</span>
          </div>
          <div>
            <span className="text-gray-600">Client:</span>
            <span className="ml-2 font-medium">{data.clientName}</span>
          </div>
          <div>
            <span className="text-gray-600">Total:</span>
            <span className="ml-2 font-medium text-green-600">
              ${data.total?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>
      </div> */}

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
          fileName={`invoice-${data.invoiceNumber || "draft"}.pdf`}
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
