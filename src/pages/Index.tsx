
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import HeaderForm from '@/components/Header/HeaderForm';

const Index = () => {
  const { affaireCode } = useAffaireContext();

  return (
    <div>
      {!affaireCode ? (
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-3xl font-bold text-dtr-primary mb-6">DTr Affaire Navigator</h1>
          <p className="text-xl text-gray-600 mb-8 text-center max-w-2xl">
            Bienvenue dans l'application de gestion des affaires pour le transport.
            <br />Recherchez une affaire pour commencer.
          </p>
          <div className="flex items-center justify-center space-x-8 mt-4">
            <div className="text-center">
              <div className="bg-dtr-primary/10 p-8 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-dtr-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Onglet Header</h3>
              <p className="text-gray-600 mt-1">
                Gérez les informations d'en-tête, adresses et contacts
              </p>
            </div>
            <div className="text-center">
              <div className="bg-dtr-accent/10 p-8 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-dtr-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Onglet Données Prépa</h3>
              <p className="text-gray-600 mt-1">
                Consultez les données d'affaires en format tabulaire
              </p>
            </div>
          </div>
        </div>
      ) : (
        <HeaderForm />
      )}
    </div>
  );
};

export default Index;
