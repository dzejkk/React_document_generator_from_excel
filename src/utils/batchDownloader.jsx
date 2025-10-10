import { pdf } from "@react-pdf/renderer";
import DocumentTemplate from "../templates/DocumentTemplate";
import LetterTemplate from "../templates/LetterTemplate";

export async function BatchDownloader(data) {
  try {
    const reportBlob = await pdf(<DocumentTemplate data={data} />).toBlob();
    const letterBlob = await pdf(<LetterTemplate data={data} />).toBlob();

    const reportUrl = URL.createObjectURL(reportBlob);
    const letterUrl = URL.createObjectURL(letterBlob);

    const reportLink = document.createElement("a");
    reportLink.href = reportUrl;
    reportLink.download = `health-report-${data.invoiceNumber || "draft"}.pdf`;
    reportLink.click();

    setTimeout(() => {
      // Download letter
      const letterLink = document.createElement("a");
      letterLink.href = letterUrl;
      letterLink.download = `letter-${data.invoiceNumber || "draft"}.pdf`;
      letterLink.click();

      // Cleanup
      URL.revokeObjectURL(reportUrl);
      URL.revokeObjectURL(letterUrl);
    }, 100);
  } catch (error) {
    console.error("Error to generate pdfs", error);
  }
}
