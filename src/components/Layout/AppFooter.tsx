
import React from 'react';

const AppFooter = () => {
  return (
    <footer className="bg-dtr-primary text-white py-3 px-6 mt-auto">
      <div className="container mx-auto text-center text-sm">
        <p>© {new Date().getFullYear()} DTr Affaire Navigator - Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default AppFooter;
