import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import logoKia from "../assets/kia_logo.png";
//FONT

Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: "normal",
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: "bold",
    },
  ],
}); // need for Slovak Language

// PDF Styles for Letter Template
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Roboto",
    fontSize: 11,
    lineHeight: 1.4,
  },

  // Header with company info
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 40,
  },

  companyLogo: {
    width: 80,
    // Logo would go here if needed
  },

  companyInfo: {
    fontSize: 9,
    color: "#333333",
    textAlign: "right",
    lineHeight: 1.3,
  },

  // Recipient info (left side)
  recipientSection: {
    marginBottom: 60,
  },

  recipientTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333333",
  },

  recipientText: {
    fontSize: 10,
    color: "#333333",
    marginBottom: 3,
  },

  // Date and location (right side)
  dateLocation: {
    textAlign: "right",
    marginBottom: 40,
    fontSize: 11,
    color: "#333333",
  },

  // Main title
  letterTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#000000",
    textTransform: "uppercase",
    lineHeight: 1.2,
    textDecoration: "underline",
  },

  // Body text
  bodyText: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 20,
    lineHeight: 1.5,
    textAlign: "justify",
  },

  // Employee info section
  employeeInfo: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 20,
    lineHeight: 1.4,
  },

  boldText: {
    fontWeight: "bold",
  },

  // Signature section
  signatureSection: {
    marginTop: 40,
    marginBottom: 20,
  },

  signatureText: {
    fontSize: 11,
    color: "#333333",
    marginBottom: 5,
  },

  // Attachments
  attachmentsList: {
    marginTop: 20,
    paddingLeft: 20,
  },

  attachmentItem: {
    fontSize: 10,
    color: "#333333",
    marginBottom: 3,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999999",
  },
  image: {
    width: 180,
  },
});

const LetterTemplate = ({ data }) => {
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

  // Get current date in Slovak format
  const currentDate = new Date().toLocaleDateString("sk-SK");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.companyLogo}>
            <Image src={logoKia} style={styles.image}></Image>
          </View>
          <View style={styles.companyInfo}>
            <Text>Kia Slovakia s.r.o.</Text>
            <Text>
              Sv. Jána Nepomuckého 1282/1, 013 01 Teplička nad Váhom / Slovensko
            </Text>
            <Text>T: +421 41 518 0111 E: media@kia.sk</Text>
          </View>
        </View>

        {/* Recipient Section */}
        <View style={styles.recipientSection}>
          <Text style={styles.recipientTitle}>SOCIÁLNA POISŤOVŇA</Text>
          <Text style={styles.recipientText}>Odbor úrazového poistenia</Text>
          <Text style={styles.recipientText}>A. Bernoláka 53</Text>
          <Text style={styles.recipientText}>010 01 ŽILINA</Text>
        </View>

        {/* Date and Location */}
        <View style={styles.dateLocation}>
          <Text>{`Teplička nad Váhom ${currentDate}`}</Text>
        </View>

        {/* Letter Title */}
        <Text style={styles.letterTitle}>
          {
            "VEC: HLÁSENIE CHOROBY Z POVOLANIA A ZASLANIE DOKUMENTÁCIE PRE VYKONANIE ODŠKODNENIA POISTNEJ UDALOSTI ZAMESTNANCA FIRMY"
          }
        </Text>

        {/* Body Text */}
        <Text style={styles.bodyText}>
          {
            "Kia Slovakia s.r.o. nahlasuje chorobu z povolania v prevádzkovách podmienkach firmy a zároveň zasiela predpísanú a požadovanú dokumentáciu pre vykonanie odškodnenia poistnej udalosti zamestnanca:"
          }
        </Text>

        {/* Employee Information */}
        <View style={styles.employeeInfo}>
          <Text>
            <Text style={styles.boldText}>{data.clientName || "N/A"}</Text>
            {`, dátum narodenia `}
            <Text style={styles.boldText}>07. 04. 1988</Text>
            {`, trvale bydlisko: `}
            <Text style={styles.boldText}>{data.clientAddress}</Text>
          </Text>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <Text style={styles.signatureText}>{data.responsibilityName}</Text>
          <Text style={styles.signatureText}>
            {"Oddelenie BOZP a životného prostredia"}
          </Text>
          <Text style={styles.signatureText}>{"Prílohy:"}</Text>
        </View>

        {/* Attachments List */}
        <View style={styles.attachmentsList}>
          <Text style={styles.attachmentItem}>
            {"1. Oznámenie poistnej udalosti - originál"}
          </Text>
          <Text style={styles.attachmentItem}>
            {"2. Hlásenie choroby z povolania - kópia"}
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Movement that inspires</Text>
      </Page>
    </Document>
  );
};

export default LetterTemplate;
