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
    padding: 38,
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

  rowThree: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 40,
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
    margin: 5,
  },
  mainContainer: {
    border: "1px solid black",
    padding: 8,
    margin: 8,
  },
  signature: {
    textAlign: "center",
    maxWidth: 280,
    marginLeft: 250,
  },
  signatureHeading: {
    fontWeight: "bold",
  },
  underTextSignature: {
    width: "250",
    textAlign: "center",
  },
});

const Spacer = ({ height = 10 }) => <View style={{ height }} />; // must be outside of the component wtf ?!!!!!!!!!!!!!

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
          <Image src={logoSoc} style={styles.logo} />
        </View>
        {/* Subtitle */}
        <Text style={styles.headerTwo}>Oznámenie poistnej udalosti</Text>
        <Text style={styles.subtitle}>
          k úrazovému poisteniu podľa § 231 ods. 1 písm. h) až j) zákona č.
          461/2003 Z. z. o sociálnom poistení v znení neskorších predpisov
          (ďalej len „zákon“)
        </Text>
        {/* Section Title */}
        <View style={styles.row}>
          <Text style={styles.label}>Poistná udalosť:</Text>
          <Text style={styles.crossed}>pracovný úraz</Text>
        </View>
        <View style={styles.rowTwo}>
          <Text style={styles.label}>choroba z povolania</Text>
          <Text style={styles.value}>X</Text>
        </View>
        <View style={styles.mainContainer}>
          {/* Form Rows */}
          <View style={styles.row}>
            <Text style={styles.label}>
              1. IČO/RČ zodpovedného zamestnávateľa:
            </Text>
            <Text style={styles.value}>
              35876832 ŠKEČ (SK NACE Rev.2;): 29100
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              2. Názov a adresa sídla zodpovedného zamestnávateľa:
            </Text>
            <Text style={styles.value}>
              Kia Slovakia s.r.o., Sv. Jána Nepomuckého 1282/1, Teplička nad
              Váhom 013 01
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
              4. Adresa miesta útvaru zodpovedného zamestnávateľa, ktorý vedie
              evidenciu miezd, ak nie je totožné s adresou jeho sídla:
            </Text>
            <Text style={styles.value}>totožné</Text>
          </View>
          {/* 5 */}
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
              v dôsledku choroby z povolania - dátum zistenia choroby z
              povolania:
            </Text>
            <Text style={styles.value}>
              {data.CHZP_Detection ?? "missing data"}
            </Text>
          </View>
          {/* 6 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              6. Miesto vzniku PU (ulica, obec, PSČ, okres, právne označenie
              pracoviska):
            </Text>
            <Text style={styles.value}>
              Kia Slovakia s.r.o., Sv. Jána Nepomuckého 1282/1, Teplička nad
              Váhom 013 01, HALA: {data.CHZP_Location_shop ?? "missing data"},
              LINKA: {data.CHZP_Location_line ?? "missing data"}
            </Text>
          </View>
          {/* 7 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              7. Poškodený zamestnanec: meno, priezvisko, titul:
            </Text>
            <Text style={styles.value}>
              {data.clientName ?? "missing data"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              adresa bydliska – ulica, obec, PSČ, okres:
            </Text>
            <Text style={styles.value}>
              {data.clientAddress ?? "missing data"}
            </Text>
          </View>
          {/* 8 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              8. Dátum narodenia poškodeného zamestnanca:
            </Text>
            <Text style={styles.value}>
              {data.clientDateOfBirth ?? "missing data"}
            </Text>
          </View>
          {/* 9 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              9. Identifikačné číslo socialného zabezpečenia poškodeného podľa §
              235 zákona:
            </Text>
            <Text style={styles.value}>
              {data.clientSocNumber ?? "missing data"}
            </Text>
          </View>
          {/* 10 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              10. Pracovné zaradenie poškodeného v čase vzniku PU:
            </Text>
            <Text style={styles.value}>
              8211000 Montážny Pracovník (operátor) v str.vyrobe
            </Text>
          </View>
          {/* 11 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              11. Poškodený zamestnanec má nárok na náhradu prijmu pri dočasnej
              pracovnej neschopnosti zamestnanca podľa zákona č. 462/2003 Z. z.
              o náhrade prijmu pri dočasnej pracovnej neschopnosti zamestnanca a
              o zmene a doplnení niektorých zákonov v znení neskorších
              predpisov:
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
              povolania, ktorou bol postihnutý popr. uvedte v prílohe
              označenia):
            </Text>
          </View>
          <Text style={styles.value}>
            {data.CHZP_Factor ?? "missing data"} (detail v prílohe)
          </Text>
          {/* 13 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              13. Ak bola poistná udalosť spôsobená úmyselne, uveďte kým:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          {/* 14 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              14. Ak bola poistná udalosť spôsobená pod vplyvom alkoholu,
              omamných látok alebo psychotropných látok, uveďte kto konal pod
              ich vplyvom a ako bolo preukázané, že táto osoba konala pod
              vplyvom týchto látok:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>*Hodiace sa označte „x“</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>**Nehodiace sa prečiarknute</Text>
        </View>
        {/* Second Page */}
        <View style={styles.mainContainer}>
          {/* 15 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              15. Ak boli v príčinnej súvislosti so vznikom poistnej udalosti
              porušené právne predpisy alebo ostatné predpisy, či pokyny na
              zaistenie bezpečnosti a ochrany zdravia pri práci, uveďte kým a
              bližšie špecifikujte porušený predpis:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          {/* 16 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              16. Ak bola poistná udalosť spôsobená zavineným porušením
              pracovných povinností v pracovno-právnych vzťahoch, uveďte kým,
              bližšie špecifikujte porušenie a pripojte k oznámeniu zápisnicu
              škodovej komisie:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          {/* 17 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              17. Uveďte, ktorý orgán pracovný úraz vyšetroval (príslušný
              inšpektorát práce, polícia, atď.):
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          {/* 18 */}
          <View style={styles.row}>
            <Text style={styles.label}>18. POŠKODENIE ZDRAVIA</Text>
          </View>
          <View style={styles.rowThree}>
            <Text style={styles.label}>
              - bolo spôsobené úrazom uznaným ako pracovný úraz podľa zákona:
            </Text>
            <Text style={styles.value}>NIE</Text>
          </View>
          <View style={styles.rowThree}>
            <Text style={styles.label}>
              - druh poranenia (spôsobeného úrazom):
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          <View style={styles.rowThree}>
            <Text style={styles.label}>
              - ak poškodený zomrel na následky úrazu, uveďte dátum úmrtia:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          <View style={styles.rowThree}>
            <Text style={styles.label}>
              - bolo spôsobené chorobou z povolania, uveďte akou:
            </Text>
            <Text style={styles.value}>
              {data.CHZP_Description ?? "missing data"}
            </Text>
          </View>
          {/* 19 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              19. SPOLUZODPOVEDNOSŤ POŠKODENÉHO NA VZNIKU ŠKODY
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              Miera zavinenia poškodeného vyjadrená v %:
            </Text>
            <Text style={styles.value}>0%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>
              Dôvod zbavenia sa zodpovednosti podľa zákona č. 311/2001 Z. z.
              Zákonník práce:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          {/* 20 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              20. Porušený právny predpis, predpis alebo pokyn na zaistenie
              BOZP:
            </Text>
            <Text style={styles.value}>---</Text>
            <Text>
              Pripojte zápis škodovej komisie alebo zápis z prejednania rozsahu
              zodpovednosti zamestnávateľa za škodu a doklady preukazujúce
              oboznámenie poškodeného s príslušnými bezpečnostnými predpismi a
              pokynmi na zaistenie BOZP.
            </Text>
          </View>
          {/* 21 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              21. Ak bol podaný návrh na prejednanie sporov o nárokoch pred
              súdom, uveďte príslušný súd a priložte návrh a stručnú informáciu
              o stave konania:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
          {/* 22 */}
          <View style={styles.row}>
            <Text style={styles.label}>
              22. Ak sa súdne konanie skončilo, pripojte rozhodnutie a uveďte,
              či ste poškodenému podľa tohto rozhodnutia náhradu vyplatili, v
              akej sume a kedy:
            </Text>
            <Text style={styles.value}>---</Text>
          </View>
        </View>
        {/* Footer */}
        <View>
          <Text>Vybavuje: Mgr.{data.responsibilityName ?? "missing data"}</Text>
          <Text>
            Telefón a e-mail zodpovedného zamestnávateľa: +421 41 515 2258,{" "}
            {data.responsibilityEmail}
          </Text>
          <Spacer />
          <Text>
            Podpísaný poistený (zodpovedný zamestnávateľ) vyhlasuje, že všetky
            uvedené skutočnosti sú pravdivé, nič nezamlčal a je si vedomý
            právnych následkov v prípade nesprávne uvedených údajov (§ 237 ods.
            1 zákona).
          </Text>
          <Spacer />
          <Text>
            V Tepličke nad Váhom dňa {new Date().toLocaleDateString("sk-SK")}
          </Text>
        </View>
        <Spacer />
        <Spacer />
        <Spacer />
        <Spacer />
        <View style={styles.signature}>
          <Text style={styles.signatureHeading}>Ing. Andrea Hánová</Text>
          <Spacer />
          <Text>
            ....................................................................
          </Text>
          <Text style={styles.underTextSignature}>
            meno a podpis štatutárneho zástupcu zodpovedného zamestnávateľa a
            odtlačok pečiatky (poistený)
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default DocumentTemplate;
