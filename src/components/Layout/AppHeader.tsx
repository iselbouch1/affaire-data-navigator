
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useAffaireContext } from '@/contexts/AffaireContext';

const AppHeader = () => {
  const location = useLocation();
  const { affaireCode, setAffaireCode, loadAffaireData } = useAffaireContext();
  const [searchInput, setSearchInput] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setAffaireCode(searchInput);
      loadAffaireData(searchInput);
    }
  };

  return (
    <header className="bg-dtr-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold mr-8">DTr Affaire Navigator</h1>
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`font-medium hover:text-dtr-accent transition-colors ${
                location.pathname === '/' ? 'border-b-2 border-dtr-accent' : ''
              }`}
            >
              Header
            </Link>
            <Link 
              to="/donnees-prepa" 
              className={`font-medium hover:text-dtr-accent transition-colors ${
                location.pathname === '/donnees-prepa' ? 'border-b-2 border-dtr-accent' : ''
              }`}
            >
              Données Prépa
            </Link>
          </nav>
        </div>
        
        <form onSubmit={handleSearch} className="flex items-center">
          <div className="relative">
            <Input
              type="text"
              placeholder="Rechercher affaire..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="py-1 pl-3 pr-10 rounded-l text-black w-48 md:w-64"
            />
            <Button 
              type="submit"
              className="bg-dtr-accent hover:bg-dtr-accent/90 text-white rounded-r absolute right-0 top-0 bottom-0"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
      
      {affaireCode && (
        <div className="container mx-auto mt-2 flex items-center">
          <span className="text-sm bg-dtr-accent/20 rounded px-2 py-1">
            Affaire actuelle: <strong>{affaireCode}</strong>
          </span>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
