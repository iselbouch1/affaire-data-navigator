
import { RawRow, ApiError } from "@/types";

const API_URL = "http://localhost:3000/api"; // Replace with your actual API URL in production

export const fetchAffaireRawData = async (code: string): Promise<RawRow[]> => {
  try {
    const response = await fetch(`${API_URL}/affaire/${code}/raw`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error fetching affaire data:", error);
    throw {
      message: `Failed to fetch data for affaire ${code}`,
      status: 500
    } as ApiError;
  }
};

// Mock function for development without a backend
export const mockFetchAffaireRawData = async (code: string): Promise<RawRow[]> => {
  console.log(`Mocking API call for affaire: ${code}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Generate some mock data
  const mockData: RawRow[] = Array(10).fill(null).map((_, index) => ({
    Idx: `${index + 1}`,
    NumCais: `C${index + 1}`,
    St0: "1",
    St1: String(Math.floor(Math.random() * 5) + 1),
    St2: "OK",
    idHUM: `HUM${index + 100}`,
    TypCmd: ["A", "B", "C"][Math.floor(Math.random() * 3)],
    Cmde: code,
    Post: `P${index + 1}`,
    Art: `ART${index * 100}`,
    Maktx: `Description for item ${index + 1}`,
    Contenu: `Content of case ${index + 1}`,
    QtCible: Math.floor(Math.random() * 100) + 1,
    QtEmb: Math.floor(Math.random() * 80) + 1,
    PdsN: Math.floor(Math.random() * 500) + 100,
    PdsB: Math.floor(Math.random() * 800) + 500,
    Leng: Math.floor(Math.random() * 200) + 50,
    Larg: Math.floor(Math.random() * 150) + 50,
    Haut: Math.floor(Math.random() * 100) + 30,
    Vol: Math.random() * 10,
    CUSAP: Math.floor(Math.random() * 1000) + 100,
    Mag: ["A1", "B2", "C3"][Math.floor(Math.random() * 3)],
    dtFin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dtTrans: new Date(Date.now() - Math.random() * 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    dtEmb: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    HSCaisse: `HS${Math.floor(Math.random() * 1000) + 1000}`,
    ClasDgx: ["A", "B", "C", "D"][Math.floor(Math.random() * 4)],
    PdsUNart: Math.floor(Math.random() * 50) + 10,
    Bay: `Bay${index + 1}`,
    uPDS: "KG",
    Superv: ["John", "Sarah", "Robert"][Math.floor(Math.random() * 3)],
    Comm: `Comment for item ${index + 1}`,
    Delta: Math.random() > 0.7 ? Math.floor(Math.random() * 1000) : 0,
    Flag_Caisse: Math.random() > 0.3 ? "C" : "",
  }));
  
  return mockData;
};
