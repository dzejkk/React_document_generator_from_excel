// Slovak character cleaning utility
export const cleanSlovakText = (text) => {
  if (!text || typeof text !== "string") return text;

  return text
    .replace(/Ď/g, "Ď")
    .replace(/ď/g, "ď")
    .replace(/Ľ/g, "Ľ")
    .replace(/ľ/g, "ľ")
    .replace(/Š/g, "Š")
    .replace(/š/g, "š")
    .replace(/Č/g, "Č")
    .replace(/č/g, "č")
    .replace(/Ť/g, "Ť")
    .replace(/ť/g, "ť")
    .replace(/Ž/g, "Ž")
    .replace(/ž/g, "ž")
    .replace(/Ý/g, "Ý")
    .replace(/ý/g, "ý")
    .replace(/Á/g, "Á")
    .replace(/á/g, "á")
    .replace(/É/g, "É")
    .replace(/é/g, "é")
    .replace(/Í/g, "Í")
    .replace(/í/g, "í")
    .replace(/Ó/g, "Ó")
    .replace(/ó/g, "ó")
    .replace(/Ú/g, "Ú")
    .replace(/ú/g, "ú")
    .replace(/Ň/g, "Ň")
    .replace(/ň/g, "ň");
};
