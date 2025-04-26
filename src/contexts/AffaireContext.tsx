
import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockFetchAffaireRawData } from '@/services/api';
import { HeaderData, RawRow, DonneePrepaRow } from '@/types';
import { transformRawToDonneePrepa } from '@/utils/formulas';
import { toast } from 'sonner';

interface AffaireContextType {
  affaireCode: string;
  setAffaireCode: React.Dispatch<React.SetStateAction<string>>;
  rawData: RawRow[];
  headerData: HeaderData | null;
  donneesPrepa: DonneePrepaRow[];
  loading: boolean;
  error: string | null;
  updateHeaderData: (data: Partial<HeaderData>) => void;
  updateDonneesPrepaRow: (index: number, updates: Partial<DonneePrepaRow>) => void;
  loadAffaireData: (code: string) => Promise<void>;
}

const AffaireContext = createContext<AffaireContextType | undefined>(undefined);

export const AffaireProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [affaireCode, setAffaireCode] = useState<string>('');
  const [rawData, setRawData] = useState<RawRow[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [donneesPrepa, setDonneesPrepa] = useState<DonneePrepaRow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const defaultHeaderData: HeaderData = {
    salesOrder: '',
    affaireName: '',
    demandeur: '',
    langue: 'FR',
    deviseContrat: 'EUR',
    incoterm: 'FCA',
    lieuPrecis: '',
    poClient: '',
    codeClientSap: '',
    adresseAcheteur: {
      pays: 'France',
      codePays: 'FR',
      lignes: ['', '', '', '', '']
    },
    adresseDestinataire: {
      pays: 'France',
      codePays: 'FR',
      lignes: ['', '', '', '', '']
    },
    contact: {
      nomComplet: '',
      tel: '',
      mobile: '',
      email: ''
    },
    imputationComptable: '',
    expeditionDocs: {
      documentsDuoanes: '',
      certificatOrigine: false,
      carnetATAOutillages: false,
      formulaireAccesCentrale: '',
      envoiOriginauxClient: false,
      autresInstructions: ''
    },
    livraisonDetaillee: {
      pays: '',
      codePays: '',
      lignes: ['', '', '', '', '']
    },
    brokerDestination: {
      pays: '',
      codePays: '',
      lignes: ['', '', '', '', '']
    },
    adresseEnvoiOriginaux: {
      pays: '',
      codePays: '',
      lignes: ['', '', '', '', '']
    },
    adresseChargementRetour: {
      pays: '',
      codePays: '',
      lignes: ['', '', '', '', '']
    },
    valorisation: {
      totalContratFacturer: 0,
      montantFige: 0,
      theoriqueRestantCalculer: 0,
      coutRevenirTheoriqueCalculer: 0,
      coutRevenirRestantCalculer: 0,
      coefficientCoutPV: 0,
      montantCalculeControle: 0,
      cumulMontantsTransferesDelta: 0,
      resteFacturerClient: 0
    },
    transportDetails: {
      technicienTransport: '',
      dateMiseDisposition: '',
      dateExpeditionDemandee: '',
      preTransportPar: '',
      moyenTransport: '',
      lieuReception: '',
      lieuChargement: '',
      paysDestination: '',
      lieuDestination: '',
      incotermDelta: ''
    }
  };

  const loadAffaireData = async (code: string) => {
    if (!code) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Use mockFetchAffaireRawData for development
      const data = await mockFetchAffaireRawData(code);
      setRawData(data);
      
      // Extract Sales Order and Affaire name from data
      const salesOrder = data.length > 0 ? data[0].Cmde || code : code;
      const affaireName = `Affaire ${salesOrder}`;
      
      // Initialize header data with extracted values
      const initialHeaderData = {
        ...defaultHeaderData,
        salesOrder,
        affaireName
      };
      
      setHeaderData(initialHeaderData);
      
      // Transform raw data to Donnees Prepa format
      const transformedData = transformRawToDonneePrepa(data, initialHeaderData);
      setDonneesPrepa(transformedData);
      
      toast.success(`Données chargées pour l'affaire ${code}`);
    } catch (err) {
      console.error('Error loading affaire data:', err);
      setError(`Erreur lors du chargement des données pour l'affaire ${code}`);
      toast.error(`Erreur lors du chargement des données pour l'affaire ${code}`);
    } finally {
      setLoading(false);
    }
  };

  const updateHeaderData = (data: Partial<HeaderData>) => {
    setHeaderData(prev => {
      if (!prev) return null;
      return { ...prev, ...data };
    });
  };

  const updateDonneesPrepaRow = (index: number, updates: Partial<DonneePrepaRow>) => {
    setDonneesPrepa(prev => {
      const newData = [...prev];
      if (newData[index]) {
        newData[index] = { ...newData[index], ...updates };
      }
      return newData;
    });
  };

  const value = {
    affaireCode,
    setAffaireCode,
    rawData,
    headerData,
    donneesPrepa,
    loading,
    error,
    updateHeaderData,
    updateDonneesPrepaRow,
    loadAffaireData
  };

  return <AffaireContext.Provider value={value}>{children}</AffaireContext.Provider>;
};

export const useAffaireContext = () => {
  const context = useContext(AffaireContext);
  if (context === undefined) {
    throw new Error('useAffaireContext must be used within an AffaireProvider');
  }
  return context;
};
