
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const INCOTERMS = [
  'FCA', 'DAP', 'FOB', 'CIF', 'EXW', 'CFR',
  'DDP', 'CPT', 'CIP', 'FAS', 'DAT'
];

const ManualFields = () => {
  const { headerData, updateHeaderData } = useAffaireContext();

  if (!headerData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">Informations manuelles</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="demandeur">Demandeur</Label>
          <Input
            id="demandeur"
            value={headerData.demandeur}
            onChange={e => updateHeaderData({ demandeur: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="langue">Langue</Label>
          <Select
            value={headerData.langue}
            onValueChange={value => updateHeaderData({ langue: value as "FR" | "EN" })}
          >
            <SelectTrigger id="langue">
              <SelectValue placeholder="Sélectionner une langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FR">Français</SelectItem>
              <SelectItem value="EN">English</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="deviseContrat">Devise contrat</Label>
          <Input
            id="deviseContrat"
            value={headerData.deviseContrat}
            onChange={e => updateHeaderData({ deviseContrat: e.target.value })}
            maxLength={3}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="incoterm">Incoterm</Label>
          <Select 
            value={headerData.incoterm}
            onValueChange={value => updateHeaderData({ incoterm: value })}
          >
            <SelectTrigger id="incoterm">
              <SelectValue placeholder="Sélectionner un incoterm" />
            </SelectTrigger>
            <SelectContent>
              {INCOTERMS.map(term => (
                <SelectItem key={term} value={term}>{term}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lieuPrecis">Lieu précis</Label>
          <Input
            id="lieuPrecis"
            value={headerData.lieuPrecis}
            onChange={e => updateHeaderData({ lieuPrecis: e.target.value })}
            placeholder="Ville / Port / Aéroport"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="poClient">N° PO Client</Label>
          <Input
            id="poClient"
            value={headerData.poClient}
            onChange={e => updateHeaderData({ poClient: e.target.value })}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="codeClientSap">Code Client SAP</Label>
          <Input
            id="codeClientSap"
            value={headerData.codeClientSap}
            onChange={e => updateHeaderData({ codeClientSap: e.target.value })}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ManualFields;
