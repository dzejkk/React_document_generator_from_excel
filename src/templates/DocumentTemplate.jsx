import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

import logoSoc from "../assets/logo_soc.png";

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

// PDF Styles

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    lineHeight: 1.3,
    fontFamily: "Roboto",
  },

  value: {
    fontWeight: "bold",
    paddingLeft: 4,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 4,
  },

  rowTwo: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 80,
    marginBottom: 6,
  },

  headerTwo: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
  },
  subtitle: {
    textAlign: "center",
    margin: 6,
  },
  crossed: {
    textDecoration: "line-through",
    marginLeft: 4,
  },
  logo: {
    width: 140,
    margin: 6,
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

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {" "}
          <Image src={logoSoc} style={styles.logo} />
        </View>

        {/* Subtitle */}

        <Text style={styles.headerTwo}>Oznámenie poistnej udalosti </Text>

        <Text style={styles.subtitle}>
          k úrazovému poisteniu podľa § 231 ods. 1 písm. h) až j) zákona č.
          461/2003 Z. z. o sociálnom poistení v znení neskorších predpisov
          (ďalej len „zákon“)
        </Text>

        {/* Section Title */}

        <View style={styles.row}>
          <Text style={styles.label}>Poistná udalosť:</Text>

          <Text style={styles.crossed}>pracovný úraz</Text>
          <Text style={styles.value}></Text>
        </View>

        <View style={styles.rowTwo}>
          <Text style={styles.label}>choroba z povolania</Text>
          <Text style={styles.value}>X</Text>
        </View>

        {/* Form Rows */}
        <View style={styles.row}>
          <Text style={styles.label}>
            1. IČO/RČ zodpovedného zamestnávateľa:
          </Text>
          <Text style={styles.value}>
            {" "}
            35876832 ŠKEČ (SK NACE Rev.2;): 29100
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            2. Názov a adresa sídla zodpovedného zamestnávateľa:
          </Text>
          <Text style={styles.value}>
            Kia Slovakia s.r.o., Sv. Jána Nepomuckého 1282/1, Teplička nad Váhom
            013 01
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            3. Evidenciu vedie zodpovedný zamestnávateľ:
          </Text>
          <Text style={styles.value}>ÁNO</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            4.Adresa miesta útvaru zodpovedného zamestnávateľa, ktorý vedie
            evidenciu miezd, ak nie je totožné s adresou jeho sídla:
          </Text>
          <Text style={styles.value}>totožné</Text>
        </View>

        {/*  5 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            5. DÁTUM VZNIKU POISTNEJ UDALOSTI (DÁLEJ LEN „PU“):
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            v dôsledku pracovného úrazu - dátum vzniku pracovného úrazu:
          </Text>
          <Text style={styles.value}>---</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            v dôsledku choroby z povolania - dátum zistenia choroby z povolania:
          </Text>
          <Text style={styles.value}>{data.CHZP_Detection}</Text>
        </View>

        {/* 6 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            6. Miesto vzniku PU (ulica, obec, PSČ, okres, právne označenie
            pracoviska):
          </Text>
          <Text style={styles.value}>
            Kia Slovakia s.r.o., Sv. Jána Nepomuckého 1282/1, Teplička nad Váhom
            013 01, {data.CHZP_Location_shop} {data.CHZP_Location_line}
          </Text>
        </View>

        {/* 7 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            7. Poškodený zamestnanec: meno, priezvisko, titul:
          </Text>
          <Text style={styles.value}> {data.clientName}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>
            adresa bydliska – ulica, obec, PSČ, okres:
          </Text>
          <Text style={styles.value}>{data.clientAddress}</Text>
        </View>

        {/* 8 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            8. Dátum narodenia poškodeného zamestnanca:
          </Text>
          <Text style={styles.value}> {data.clientDateOfBirth}</Text>
        </View>

        {/* 9 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            9. Identifikačné číslo socialného zabezpečenia poškodeného podľa §
            235 zákona:
          </Text>
          <Text style={styles.value}> {data.clientSocNumber}</Text>
        </View>

        {/* 10 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            10. Pracovné zaradenie poškodeného v čase vzniku PU:
          </Text>
          <Text style={styles.value}>
            8211000 Montážny Pracovník ( operátor) v str.vyrobe
          </Text>
        </View>

        {/*  11  */}

        <View style={styles.row}>
          <Text style={styles.label}>
            11. Poškodený zamestnanec má nárok na náhradu prijmu pri dočasnej
            pracovnej neschopnosti zamestnanca podľa zákona č. 462/2003 Z. z. o
            náhrade prijmu pri dočasnej pracovnej neschopnosti zamestnanca a o
            zmene a doplnení niektorých zákonov v znení neskorších predpisov:
          </Text>
          <Text style={styles.value}>ANO</Text>
        </View>

        {/* 12 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            12. PODROBNÝ POPIS VZNIKU POISTNEJ UDALOSTI (u choroby z povolania
            uvedte faktory pracovného prostredia, ktoré mali za následok vznik
            choroby z povolania a predchádzajúce zamestnávateľov, u ktorých
            poškodený pracoval za podmienok, z ktorých vznikla choroba z
            povolania, ktorou bol postihnutý popr. uvedte v prílohe označenia):
          </Text>
        </View>
        <Text style={styles.value}>{data.CHZP_Factor} (detail v prilohe)</Text>

        {/*  13 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            13. Ak bola poistná udalosť spôsobená úmyselne, uveďte kým:
          </Text>
          <Text style={styles.value}>---</Text>
        </View>

        {/* 14 */}

        <View style={styles.row}>
          <Text style={styles.label}>
            14. Ak bola poistná udalosť spôsobená pod vplyvom alkoholu, omamných
            látok alebo psychotropných látok, uveďte kto konal pod ich vplyvom a
            ako bolo preukázané, že táto osoba konala pod vplyvom týchto látok:
          </Text>
          <Text style={styles.value}>---</Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentTemplate;
