
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample incoterm codes - in a real app, use a complete list
const INCOTERM_CODES = [
  'EXW', 'FCA', 'FAS', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 
  'DAP', 'DPU', 'DDP', 'DAT'
];

const TransportDetailsSection = () => {
  const { headerData, updateHeaderData } = useAffaireContext();

  if (!headerData || !headerData.transportDetails) return null;

  const { transportDetails } = headerData;

  const handleChange = (field: keyof typeof transportDetails, value: string) => {
    updateHeaderData({
      transportDetails: {
        ...transportDetails,
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">Transport</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="technicien">Technicien Transport</Label>
          <Input
            id="technicien"
            value={transportDetails.technicienTransport}
            onChange={e => handleChange('technicienTransport', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date-mise-dispo">Date de Mise à Disposition</Label>
          <Input
            id="date-mise-dispo"
            type="date"
            value={transportDetails.dateMiseDisposition}
            onChange={e => handleChange('dateMiseDisposition', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="date-expedition">Date Expédition Demandée</Label>
          <Input
            id="date-expedition"
            type="date"
            value={transportDetails.dateExpeditionDemandee}
            onChange={e => handleChange('dateExpeditionDemandee', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pre-transport">Pré‐Transport par</Label>
          <Input
            id="pre-transport"
            value={transportDetails.preTransportPar}
            onChange={e => handleChange('preTransportPar', e.target.value)}
            maxLength={17}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="moyen-transport">Moyen de Transport</Label>
          <Input
            id="moyen-transport"
            value={transportDetails.moyenTransport}
            onChange={e => handleChange('moyenTransport', e.target.value)}
            maxLength={17}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lieu-reception">Lieu de Réception</Label>
          <Input
            id="lieu-reception"
            value={transportDetails.lieuReception}
            onChange={e => handleChange('lieuReception', e.target.value)}
            maxLength={17}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lieu-chargement">Lieu de Chargement</Label>
          <Input
            id="lieu-chargement"
            value={transportDetails.lieuChargement}
            onChange={e => handleChange('lieuChargement', e.target.value)}
            maxLength={17}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="pays-destination">Pays Destination</Label>
          <Input
            id="pays-destination"
            value={transportDetails.paysDestination}
            onChange={e => handleChange('paysDestination', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lieu-destination">Lieu de Destination</Label>
          <Input
            id="lieu-destination"
            value={transportDetails.lieuDestination}
            onChange={e => handleChange('lieuDestination', e.target.value)}
            maxLength={17}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="incoterm-delta">Incoterm Delta</Label>
          <Select
            value={transportDetails.incotermDelta}
            onValueChange={value => handleChange('incotermDelta', value)}
          >
            <SelectTrigger id="incoterm-delta">
              <SelectValue placeholder="Sélectionner un incoterm" />
            </SelectTrigger>
            <SelectContent>
              {INCOTERM_CODES.map(code => (
                <SelectItem key={code} value={code}>{code}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TransportDetailsSection;
