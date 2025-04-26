
// Raw data from Excel/API
export interface RawRow {
  Idx?: string;
  NumCais?: string;
  St0?: string;
  St1?: string;
  St2?: string;
  Mag?: string;
  HSCode?: string;
  DgxSAP?: string;
  ClasDgx?: string;
  Matnr?: string;
  Maktx?: string;
  Bay?: string;
  Post?: string;
  Art?: string;
  TypCais?: string;
  DesiCais?: string;
  Contenu?: string;
  QtCible?: number;
  QtProd?: number;
  QtTrans?: number;
  QtEmb?: number;
  PdsN?: number;
  PdsB?: number;
  uPDS?: string;
  Leng?: number;
  Larg?: number;
  Haut?: number;
  uDIM?: string;
  Vol?: number;
  uVOL?: string;
  CUSAP?: number;
  PxUM?: number;
  dtPlan?: string;
  dtLanc?: string;
  dtFin?: string;
  dtTrans?: string;
  dtEmb?: string;
  dtAut?: string;
  dtSortie?: string;
  dtInco?: string;
  Comm?: string;
  ACSProj?: string;
  ACSPo?: string;
  ACSPoste?: string;
  TypCmd?: string;
  Cmde?: string;
  OF?: string;
  Superv?: string;
  idHUM?: string;
  Gerb?: string;
  LengTheo?: number;
  LargTheo?: number;
  HautTheo?: number;
  VolTheo?: number;
  PdsUNart?: number;
  OEsap?: string;
  HSCaisse?: string;
  // Additional fields that might be part of the raw data but not explicitly mentioned
  Delta?: number;
  Flag_Caisse?: string;
  QtyEmb?: number;
}

// Header form data
export interface HeaderData {
  // Automatic fields
  salesOrder: string;
  affaireName: string;

  // Manual fields
  demandeur: string;
  langue: "FR" | "EN";
  deviseContrat: string;
  incoterm: string;
  lieuPrecis: string;
  poClient: string;
  codeClientSap: string;

  // Addresses
  adresseAcheteur: AddressData;
  adresseDestinataire: AddressData;

  // Contact / Notify
  contact: ContactData;

  // Imputation Comptable
  imputationComptable: string;

  // Expédition docs
  expeditionDocs: ExpeditionDocsData;

  // Livraison détaillée & Broker
  livraisonDetaillee: AddressData;
  brokerDestination: AddressData;
  adresseEnvoiOriginaux: AddressData;
  adresseChargementRetour: AddressData;

  // Valorisation
  valorisation: ValorisationData;

  // Transport details
  transportDetails: TransportDetailsData;
}

export interface AddressData {
  pays: string;
  codePays: string;
  lignes: string[];
}

export interface ContactData {
  nomComplet: string;
  tel: string;
  mobile: string;
  email: string;
}

export interface ExpeditionDocsData {
  documentsDuoanes: string;
  certificatOrigine: boolean;
  carnetATAOutillages: boolean;
  formulaireAccesCentrale: string;
  envoiOriginauxClient: boolean;
  autresInstructions: string;
}

export interface ValorisationData {
  totalContratFacturer: number;
  montantFige: number;
  theoriqueRestantCalculer: number;
  coutRevenirTheoriqueCalculer: number;
  coutRevenirRestantCalculer: number;
  coefficientCoutPV: number;
  montantCalculeControle: number;
  cumulMontantsTransferesDelta: number;
  resteFacturerClient: number;
}

export interface TransportDetailsData {
  technicienTransport: string;
  dateMiseDisposition: string;
  dateExpeditionDemandee: string;
  preTransportPar: string;
  moyenTransport: string;
  lieuReception: string;
  lieuChargement: string;
  paysDestination: string;
  lieuDestination: string;
  incotermDelta: string;
}

// Données Prépa data with groups
export interface DonneePrepaRow extends RawRow {
  // Core columns
  index: string;
  typeCmde: string;
  statut: string;
  caisse: string;
  
  // TRANSP group
  oeTransport: string;
  camion: string;
  oeSap: string;
  
  // Lot & identification
  numeroLot: string;
  designationStatut: string;
  poste: string;
  idHum: string;
  article: string;
  designationArticle: string;
  contenu: string;
  
  // DESI. group
  articleClient: string;
  formuleDesi2: string;
  formuleDesi3: string;
  formuleDesi4: string;
  
  // Quantités
  quantiteCible: number;
  quantiteEmballee: number;
  
  // DIM. & MAG. group
  longueur: number;
  largeur: number;
  hauteur: number;
  poidsNetCaisse: number;
  poidsBrutCaisse: number;
  volume: number;
  magasin: string;
  
  // PRIX. group
  valeurTotaleDevise: number;
  valeurTotaleCaisse: number;
  coutUnitPliEuros: number;
  coutUnitManuel: number;
  coutPliRetenu: number;
  coef: number;
  coefRetenu: number;
  
  // DATE. group
  dateLancOf: string;
  dateTransfert: string;
  dateEmballage: string;
  
  // Caisse group
  hscCaisse: string;
  coCaisse: string;
  designationCaisse1: string;
  designationCaisse2: string;
  designationCaisse3: string;
  designationCaisse4: string;
  designationCaisse5: string;
  
  // Article details group
  codeOrigine: string;
  classeDgx: string;
  hsCode: string;
  designationArticle1: string;
  designationArticle2: string;
  designationArticle3: string;
  designationArticle4: string;
  designationArticle5: string;
  
  // Unités & Poids group
  caisseGerbable: string;
  typArticlePoste: string;
  articlePoste: string;
  poidsNetUnitaireForce: number;
  poidsNetArticle: number;
  poidsBrutArticle: number;
  controlePoids: number;
  
  // Autre group
  puVenteDeviseContrat: number;
  flagPrixCalcule: number;
  montantDelta: number;
  
  // Meta (always visible, read-only)
  commentaire: string;
  posteDetail: string;
  unitePoids: string;
  superviseur: string;
}

export interface ApiError {
  message: string;
  status?: number;
}
