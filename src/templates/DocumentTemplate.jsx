import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
}); // need for Slovak Language

// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 30,
    fontFamily: "Roboto",
  },

  // Header Section
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
  },

  companyInfo: {
    flex: 1,
  },

  companyName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },

  companyDetails: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 1.4,
  },

  invoiceTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#3B82F6",
    textAlign: "right",
  },

  // Invoice Info Section
  invoiceInfo: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  invoiceDetails: {},

  clientInfo: {},

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
    textTransform: "uppercase",
  },

  detailText: {
    fontSize: 10,
    color: "#4B5563",
    marginBottom: 3,
    lineHeight: 1.3,
  },

  // Items Table
  itemsContainer: {
    marginBottom: 30,
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 8,
    marginBottom: 10,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },

  // Table Columns
  colDescription: {
    flex: 3,
    fontSize: 10,
    color: "#374151",
  },

  colQuantity: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
    textAlign: "center",
  },

  colRate: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
    textAlign: "right",
  },

  colAmount: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
    textAlign: "right",
    fontWeight: "bold",
  },

  // Table Headers
  headerText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1F2937",
    textTransform: "uppercase",
  },

  // Totals Section
  totalsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },

  totalsTable: {
    width: 200,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingHorizontal: 10,
  },

  totalRowFinal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#3B82F6",
    marginTop: 5,
  },

  totalLabel: {
    fontSize: 10,
    color: "#374151",
    fontWeight: "bold",
  },

  totalValue: {
    fontSize: 10,
    color: "#374151",
    fontWeight: "bold",
  },

  totalLabelFinal: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  totalValueFinal: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  // Notes Section
  notesContainer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  notesTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 8,
  },

  notesText: {
    fontSize: 10,
    color: "#6B7280",
    lineHeight: 1.4,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },

  footerText: {
    fontSize: 8,
    color: "#9CA3AF",
  },
});

const DocumentTemplate = ({ data }) => {
  // Ensure data exists
  if (!data) {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <Text>No data provided</Text>
        </Page>
      </Document>
    );
  }

  // Format currency with better error handling
  const formatCurrency = (amount) => {
    const num = parseFloat(amount);
    if (isNaN(num)) return "$0.00";
    return `${num.toFixed(2)}`;
  };

  // Format date with better error handling
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "N/A";
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "N/A";
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              {data.companyName || "Your Company Name"}
            </Text>
            <Text style={styles.companyDetails}>
              {data.companyAddress || "Your Company Address"}
            </Text>
            <Text style={styles.companyDetails}>
              {data.companyPhone || "Your Phone Number"}
            </Text>
            <Text style={styles.companyDetails}>
              {data.companyEmail || "your@email.com"}
            </Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
          </View>
        </View>

        {/* Invoice Info and Client Info */}
        <View style={styles.invoiceInfo}>
          <View style={styles.invoiceDetails}>
            <Text style={styles.sectionTitle}>Invoice Details</Text>
            <Text style={styles.detailText}>
              5. DÁTUM VZNIKU POISTNEJ UDALOSTI (ĎALEJ LEN „PU") v dôsledku
              pracovného úrazu - dátum vzniku pracovného úrazu: - - - v dôsledku
              choroby z povolania - dátum zistenia choroby z povolania dňa:
              {data.CHZP_Detection || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              6. Miesto vzniku PU (ulica, obec, PSČ, okres, prípadne označenie
              pracoviska): Kia Slovakia s.r.o., Sv. Jána Nepomuckého 1282/1,
              Teplička nad Váhom 013 01, {data.CHZP_Location_shop}
              {data.CHZP_Location_line || "N/A"}
            </Text>
            <Text style={styles.detailText}>
              Due Date: {formatDate(data.dueDate)}
            </Text>
          </View>

          <View style={styles.clientInfo}>
            <Text style={styles.sectionTitle}>Bill To</Text>
            <Text style={styles.detailText}>
              {data.clientName || "Client Name"}
            </Text>
            {data.clientAddress && (
              <Text style={styles.detailText}>{data.clientAddress}</Text>
            )}
            {data.clientEmail && (
              <Text style={styles.detailText}>{data.clientEmail}</Text>
            )}
            {data.clientDateOfBirth && (
              <Text style={styles.detailText}>{data.clientDateOfBirth}</Text>
            )}
            <Text>{data.clientSocNumber ?? "missing info"}</Text>
          </View>
        </View>

        {/* Items Table */}
        <View style={styles.itemsContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.colDescription, styles.headerText]}>
              Description
            </Text>
            <Text style={[styles.colQuantity, styles.headerText]}>Qty</Text>
            <Text style={[styles.colRate, styles.headerText]}>Rate</Text>
            <Text style={[styles.colAmount, styles.headerText]}>Amount</Text>
          </View>

          {/* Table Rows */}
          {data.items && Array.isArray(data.items) && data.items.length > 0 ? (
            data.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.colDescription}>
                  {item?.description || "Service Provided"}
                </Text>
                <Text style={styles.colQuantity}>{item?.quantity || 1}</Text>
                <Text style={styles.colRate}>
                  {formatCurrency(item?.rate || 0)}
                </Text>
                <Text style={styles.colAmount}>
                  {formatCurrency(
                    item?.amount || item?.quantity * item?.rate || 0
                  )}
                </Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={styles.colDescription}>
                {data.notes || "Service Provided"}
              </Text>
              <Text style={styles.colQuantity}>1</Text>
              <Text style={styles.colRate}>
                {formatCurrency(data.subtotal || 0)}
              </Text>
              <Text style={styles.colAmount}>
                {formatCurrency(data.subtotal || 0)}
              </Text>
            </View>
          )}
        </View>

        {/* Totals */}
        <View style={styles.totalsContainer}>
          <View style={styles.totalsTable}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>
                {formatCurrency(data.subtotal || 0)}
              </Text>
            </View>

            {(data.taxRate || 0) > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  Tax ({((data.taxRate || 0) * 100).toFixed(0)}%):
                </Text>
                <Text style={styles.totalValue}>
                  {formatCurrency(data.taxAmount || 0)}
                </Text>
              </View>
            )}

            <View style={styles.totalRowFinal}>
              <Text style={styles.totalLabelFinal}>TOTAL:</Text>
              <Text style={styles.totalValueFinal}>
                {formatCurrency(data.total || 0)}
              </Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesTitle}>Notes</Text>
            <Text style={styles.notesText}>{data.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentTemplate;
