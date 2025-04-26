
import { RawRow, DonneePrepaRow } from "@/types";

// Helper function to simulate Excel's IFERROR
const iferror = (expression: () => number, defaultValue: number): number => {
  try {
    const result = expression();
    return isNaN(result) || !isFinite(result) ? defaultValue : result;
  } catch (e) {
    return defaultValue;
  }
};

// Helper function to simulate Excel's IF
const ifFormula = (
  condition: boolean,
  trueValue: any,
  falseValue: any
): any => {
  return condition ? trueValue : falseValue;
};

// Helper function to simulate Excel's ROUND
const round = (value: number, decimals: number): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

// Helper function to get a value or return a default if empty
const valRet = (value: any, defaultValue: any): any => {
  return value === undefined || value === null || value === "" ? defaultValue : value;
};

// Transform raw Excel data to DonneePrepaRow format
export const transformRawToDonneePrepa = (
  rawData: RawRow[],
  headerData: any
): DonneePrepaRow[] => {
  return rawData.map((row) => {
    // Basic transformations
    const transformedRow = {
      ...row,
      // Core columns
      index: row.Idx || "",
      typeCmde: row.TypCmd || "",
      statut: row.St1 || "",
      caisse: row.NumCais || "",
      
      // Lot & identification
      designationStatut: row.St2 || "",
      poste: row.Post || "",
      idHum: row.idHUM || "",
      article: row.Art || "",
      designationArticle: row.Maktx || "",
      contenu: row.Contenu || "",
      
      // Quantités
      quantiteCible: Number(row.QtCible) || 0,
      quantiteEmballee: Number(row.QtEmb) || 0,
      
      // DIM. & MAG. group
      longueur: Number(row.Leng) || 0,
      largeur: Number(row.Larg) || 0,
      hauteur: Number(row.Haut) || 0,
      poidsNetCaisse: Number(row.PdsN) || 0,
      poidsBrutCaisse: Number(row.PdsB) || 0,
      volume: Number(row.Vol) || 0,
      magasin: row.Mag || "",
      
      // PRIX. group
      coutUnitPliEuros: Number(row.CUSAP) || 0,
      
      // DATE. group
      dateLancOf: row.dtFin || "",
      dateTransfert: row.dtTrans || "",
      dateEmballage: row.dtEmb || "",
      
      // Article details group
      classeDgx: row.ClasDgx || "",
      
      // Meta
      commentaire: row.Comm || "",
      posteDetail: row.Bay || "",
      unitePoids: row.uPDS || "",
      superviseur: row.Superv || "",
      
      // Initialize editable fields
      oeTransport: "",
      camion: "",
      oeSap: row.OEsap || "",
      numeroLot: "",
      articleClient: "",
      formuleDesi2: "",
      formuleDesi3: "",
      formuleDesi4: "",
      coutUnitManuel: 0,
      coefRetenu: 0,
      hscCaisse: row.HSCaisse || "",
      coCaisse: "",
      codeOrigine: "",
      poidsNetUnitaireForce: 0,
      caisseGerbable: "",
      
      // Fields with default values from other fields
      hsCode: ifFormula(row.Flag_Caisse === "C", ".", ""),
    } as any;

    // Calculate complex derived values
    const flagCaisse = row.Flag_Caisse || "";
    const lang = headerData?.langue || "FR";
    const qtEmb = Number(row.QtEmb) || 0;
    const qtCible = Number(row.QtCible) || 0;
    const cusap = Number(row.CUSAP) || 0;
    const coutUnitManuel = transformedRow.coutUnitManuel || 0;
    const coefRetenu = transformedRow.coefRetenu || 0;
    const montantDelta = Number(row.Delta) || 0;
    const pdsN = Number(row.PdsN) || 0;
    const pdsB = Number(row.PdsB) || 0;
    const pdsUNart = Number(row.PdsUNart) || 0;
    const poidsNetUnitaireForce = transformedRow.poidsNetUnitaireForce || 0;

    // Designations and formulas
    transformedRow.designationCaisse1 = ifFormula(
      flagCaisse === "C",
      ifFormula(lang === "EN", "Crate containing :", "Caisse contenant :"),
      ""
    );
    transformedRow.designationCaisse2 = ifFormula(flagCaisse === "C", "", "");
    transformedRow.designationCaisse3 = ifFormula(flagCaisse === "C", "", "");
    transformedRow.designationCaisse4 = ifFormula(flagCaisse === "C", "", "");
    transformedRow.designationCaisse5 = ifFormula(flagCaisse === "C", "", "");
    
    transformedRow.designationArticle1 = "";
    transformedRow.designationArticle2 = "";
    transformedRow.designationArticle3 = "";
    transformedRow.designationArticle4 = "";
    transformedRow.designationArticle5 = "";

    // Price calculations
    transformedRow.coutPliRetenu = ifFormula(
      coutUnitManuel === 0,
      cusap,
      coutUnitManuel
    ) * ifFormula(qtEmb === 0, qtCible, qtEmb);

    transformedRow.coef = 0; // To be computed based on overall data

    // Simplified for now - actual implementation would need all rows to calculate
    transformedRow.valeurTotaleDevise = ifFormula(
      montantDelta === 0,
      ifFormula(
        coutUnitManuel !== 0,
        coutUnitManuel * coefRetenu,
        round(cusap * coefRetenu, 2)
      ) * ifFormula(qtEmb === 0, qtCible, qtEmb),
      montantDelta
    );

    // Simplified calculation for caisse total value
    transformedRow.valeurTotaleCaisse = ifFormula(
      flagCaisse === "C",
      transformedRow.valeurTotaleDevise,
      0
    );

    // Unit price calculation
    transformedRow.puVenteDeviseContrat = iferror(
      () =>
        round(
          transformedRow.valeurTotaleDevise /
            ifFormula(qtEmb === 0, qtCible, qtEmb),
          2
        ),
      2
    );

    // Flag for calculated prices
    transformedRow.flagPrixCalcule = ifFormula(
      montantDelta !== 0 || coutUnitManuel !== 0 || coefRetenu !== 0,
      1,
      0
    );

    transformedRow.montantDelta = montantDelta;

    // Type and article calculations
    transformedRow.typArticlePoste = `${transformedRow.typeCmde}/${transformedRow.poste}`;
    transformedRow.articlePoste = `${transformedRow.article}/${transformedRow.poste}`;
    
    // Weight calculations
    transformedRow.poidsNetArticle = pdsUNart;
    transformedRow.poidsBrutArticle = pdsUNart * (pdsB / pdsN || 1);
    
    // Control weight - simplified calculation
    transformedRow.controlePoids = round(
      ifFormula(
        flagCaisse === "C" && Number(transformedRow.statut) >= 5,
        ifFormula(
          poidsNetUnitaireForce > 0,
          poidsNetUnitaireForce,
          pdsUNart
        ) * qtEmb - pdsN,
        0
      ),
      0
    );

    return transformedRow as DonneePrepaRow;
  });
};
