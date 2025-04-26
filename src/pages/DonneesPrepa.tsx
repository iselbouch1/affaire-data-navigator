
import React from 'react';
import DonneesPrepaTable from '@/components/DonneesPrepa/DonneesPrepaTable';

const DonneesPrepa = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-3xl font-bold text-dtr-primary mb-6">Données Préparatoires</h1>
      <DonneesPrepaTable />
    </div>
  );
};

export default DonneesPrepa;
