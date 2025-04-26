
import React, { useState } from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { DonneePrepaRow } from '@/types';
import CoreColumns from './Sections/CoreColumns';
import TransportGroup from './Sections/TransportGroup';
import LotIdentificationGroup from './Sections/LotIdentificationGroup';
import DesiGroup from './Sections/DesiGroup';
import QuantitesGroup from './Sections/QuantitesGroup';
import DimMagGroup from './Sections/DimMagGroup';
import PrixGroup from './Sections/PrixGroup';
import DateGroup from './Sections/DateGroup';
import CaisseGroup from './Sections/CaisseGroup';
import ArticleDetailsGroup from './Sections/ArticleDetailsGroup';
import UnitesPoidsGroup from './Sections/UnitesPoidsGroup';
import AutreGroup from './Sections/AutreGroup';
import MetaColumns from './Sections/MetaColumns';

const DonneesPrepaTable = () => {
  const { affaireCode, donneesPrepa, loading, error } = useAffaireContext();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['core', 'meta']);

  if (!affaireCode) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-semibold mb-4 text-dtr-primary">Données Prépa</h2>
        <p className="text-gray-600 text-center max-w-md">
          Recherchez une affaire en utilisant la barre de recherche en haut pour afficher les données préparatoires.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 flex flex-col items-center py-12">
        <h3 className="text-xl font-medium mb-2">Erreur</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!donneesPrepa || donneesPrepa.length === 0) {
    return (
      <div className="text-gray-600 flex flex-col items-center py-12">
        <h3 className="text-xl font-medium mb-2">Aucune donnée</h3>
        <p>Aucune donnée de préparation n'est disponible pour cette affaire.</p>
      </div>
    );
  }

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      if (prev.includes(groupId)) {
        return prev.filter(id => id !== groupId);
      } else {
        return [...prev, groupId];
      }
    });
  };

  const isGroupExpanded = (groupId: string) => expandedGroups.includes(groupId);

  return (
    <div>
      <h1 className="text-2xl font-bold text-dtr-primary mb-6">
        Données Préparatoires - {affaireCode}
      </h1>

      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                {/* Core columns (always visible) */}
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Index</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Type Cmde</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Statut</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Flag</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Caisse</th>
                
                {/* Conditional columns based on expanded groups */}
                {isGroupExpanded('transp') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">N° OE transport</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">N° Camion</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">N° OE SAP</th>
                  </>
                )}
                
                {isGroupExpanded('lot') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">N° Lot</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Statut</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Poste</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Id HUM</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Article</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation article</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Contenu</th>
                  </>
                )}
                
                {isGroupExpanded('desi') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Article Client</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Pour formule Dési 2</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Pour formule Dési 3</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Pour formule Dési 4</th>
                  </>
                )}
                
                {isGroupExpanded('quantites') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Quantité Cible</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Quantité Emballée</th>
                  </>
                )}
                
                {isGroupExpanded('dim') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Longueur</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Largeur</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Hauteur</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Poids Net Caisse</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Poids Brut Caisse</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Volume</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Magasin</th>
                  </>
                )}
                
                {isGroupExpanded('prix') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Valeur Totale (Devise contrat)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Valeur totale d'une caisse</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Coût Unit. PLI Euros</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Coût unit. Manuel</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Coût PLI retenu</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Coef</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Coef retenu</th>
                  </>
                )}
                
                {isGroupExpanded('date') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Date Lanc OF</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Date Transfert</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Date Emballage</th>
                  </>
                )}
                
                {isGroupExpanded('caisse') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">HSC Caisse</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">CO Caisse</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Caisse 1</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Caisse 2</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Caisse 3</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Caisse 4</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Caisse 5</th>
                  </>
                )}
                
                {isGroupExpanded('article') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Code Origine</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Classe DGX</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">HS Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Article 1</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Article 2</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Article 3</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Article 4</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Désignation Article 5</th>
                  </>
                )}
                
                {isGroupExpanded('unites') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Caisse Gerbable</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Typ Article Poste</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Article Poste</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Poids Net Unitaire forcé</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Poids Net Article (calculé)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Poids Brut Article (calculé)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Contrôle Poids</th>
                  </>
                )}
                
                {isGroupExpanded('autre') && (
                  <>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">PU Vente Devise contrat</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Flag prix calculé</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Montant Delta</th>
                  </>
                )}
                
                {/* Meta columns (always visible) */}
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Commentaire</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Poste détail</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Unité Poids</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-dtr-primary">Superviseur</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {donneesPrepa.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {/* Core columns (always visible) */}
                  <td className="px-4 py-2 text-sm text-gray-800">{row.index}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{row.typeCmde}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{row.statut}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">
                    {row.Flag_Caisse === 'C' && <span className="inline-block w-4 h-4 bg-dtr-accent rounded-full"></span>}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-800">{row.caisse}</td>
                  
                  {/* Conditional columns based on expanded groups */}
                  {isGroupExpanded('transp') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.oeTransport}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.camion}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.oeSap}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('lot') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.numeroLot}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationStatut}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.poste}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.idHum}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.article}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationArticle}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.contenu}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('desi') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.articleClient}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.formuleDesi2}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.formuleDesi3}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.formuleDesi4}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('quantites') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.quantiteCible}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.quantiteEmballee}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('dim') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.longueur}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.largeur}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.hauteur}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.poidsNetCaisse}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.poidsBrutCaisse}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.volume}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.magasin}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('prix') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.valeurTotaleDevise}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.valeurTotaleCaisse}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.coutUnitPliEuros}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.coutUnitManuel}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.coutPliRetenu}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.coef}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.coefRetenu}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('date') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.dateLancOf}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.dateTransfert}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.dateEmballage}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('caisse') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.hscCaisse}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.coCaisse}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationCaisse1}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationCaisse2}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationCaisse3}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationCaisse4}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationCaisse5}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('article') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.codeOrigine}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.classeDgx}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.hsCode}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationArticle1}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationArticle2}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationArticle3}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationArticle4}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.designationArticle5}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('unites') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.caisseGerbable}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.typArticlePoste}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.articlePoste}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.poidsNetUnitaireForce}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.poidsNetArticle}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.poidsBrutArticle}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.controlePoids}</td>
                    </>
                  )}
                  
                  {isGroupExpanded('autre') && (
                    <>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.puVenteDeviseContrat}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.flagPrixCalcule}</td>
                      <td className="px-4 py-2 text-sm text-gray-800">{row.montantDelta}</td>
                    </>
                  )}
                  
                  {/* Meta columns (always visible) */}
                  <td className="px-4 py-2 text-sm text-gray-800">{row.commentaire}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{row.posteDetail}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{row.unitePoids}</td>
                  <td className="px-4 py-2 text-sm text-gray-800">{row.superviseur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Column groups toggle controls */}
      <div className="mt-6 mb-12">
        <h3 className="text-lg font-medium text-dtr-primary mb-3">Groupes de colonnes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('transp')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('transp') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('transp') ? 'Masquer' : 'Afficher'} TRANSP
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('lot')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('lot') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('lot') ? 'Masquer' : 'Afficher'} Lot & identification
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('desi')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('desi') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('desi') ? 'Masquer' : 'Afficher'} DESI.
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('quantites')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('quantites') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('quantites') ? 'Masquer' : 'Afficher'} Quantités
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('dim')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('dim') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('dim') ? 'Masquer' : 'Afficher'} DIM. & MAG.
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('prix')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('prix') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('prix') ? 'Masquer' : 'Afficher'} PRIX.
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('date')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('date') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('date') ? 'Masquer' : 'Afficher'} DATE.
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('caisse')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('caisse') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('caisse') ? 'Masquer' : 'Afficher'} Caisse
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('article')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('article') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('article') ? 'Masquer' : 'Afficher'} Article
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('unites')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('unites') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('unites') ? 'Masquer' : 'Afficher'} Unités & Poids
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('autre')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('autre') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('autre') ? 'Masquer' : 'Afficher'} Autre
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => toggleGroup('meta')} 
              className={`px-3 py-1.5 text-sm font-medium rounded ${
                isGroupExpanded('meta') ? 'bg-dtr-primary text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {isGroupExpanded('meta') ? 'Masquer' : 'Afficher'} Meta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonneesPrepaTable;
