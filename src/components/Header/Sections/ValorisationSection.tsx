
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ValorisationSection = () => {
  const { headerData, updateHeaderData } = useAffaireContext();

  if (!headerData || !headerData.valorisation) return null;

  const { valorisation } = headerData;

  const handleChange = (field: keyof typeof valorisation, value: string) => {
    const numValue = Number(value);
    
    let updates: Partial<typeof valorisation> = {
      [field]: isNaN(numValue) ? 0 : numValue
    };
    
    // Recalculate dependent fields
    if (field === 'totalContratFacturer' || field === 'montantFige' || field === 'coutRevenirRestantCalculer') {
      const totalContrat = field === 'totalContratFacturer' ? numValue : valorisation.totalContratFacturer;
      const montantFige = field === 'montantFige' ? numValue : valorisation.montantFige;
      const coutRevenir = field === 'coutRevenirRestantCalculer' ? numValue : valorisation.coutRevenirRestantCalculer;
      
      // Calculate theoriqueRestantCalculer
      const theoriqueRestant = totalContrat - montantFige;
      
      // Calculate coefficientCoutPV if coutRevenir is not zero
      const coef = coutRevenir !== 0 ? totalContrat / coutRevenir : 0;
      
      // Calculate montantCalculeControle
      const montantCalcule = coutRevenir * coef;
      
      updates = {
        ...updates,
        theoriqueRestantCalculer: theoriqueRestant,
        coefficientCoutPV: coef,
        montantCalculeControle: montantCalcule
      };
    }
    
    updateHeaderData({
      valorisation: {
        ...valorisation,
        ...updates
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">Valorisation</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="total-contrat">Total Contrat à facturer</Label>
          <Input
            id="total-contrat"
            type="number"
            value={valorisation.totalContratFacturer || ''}
            onChange={e => handleChange('totalContratFacturer', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="montant-fige">Montant figé (EUR)</Label>
          <Input
            id="montant-fige"
            type="number"
            value={valorisation.montantFige || ''}
            onChange={e => handleChange('montantFige', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="theorique-restant">Théorique restant à calculer</Label>
          <Input
            id="theorique-restant"
            type="number"
            value={valorisation.theoriqueRestantCalculer || ''}
            readOnly
            className="bg-gray-100"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cout-theorique">Coût revient théorique à calculer</Label>
          <Input
            id="cout-theorique"
            type="number"
            value={valorisation.coutRevenirTheoriqueCalculer || ''}
            readOnly
            className="bg-gray-100"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cout-restant">Coût de revient restant à calculer</Label>
          <Input
            id="cout-restant"
            type="number"
            value={valorisation.coutRevenirRestantCalculer || ''}
            onChange={e => handleChange('coutRevenirRestantCalculer', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="coefficient">Coefficient Coût/PV</Label>
          <Input
            id="coefficient"
            type="number"
            value={valorisation.coefficientCoutPV || ''}
            readOnly
            className="bg-gray-100"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="montant-calcule">Montant calculé pour contrôle (EUR)</Label>
          <Input
            id="montant-calcule"
            type="number"
            value={valorisation.montantCalculeControle || ''}
            readOnly
            className="bg-gray-100"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cumul-transferes">Cumul montants transférés Delta</Label>
          <Input
            id="cumul-transferes"
            type="number"
            value={valorisation.cumulMontantsTransferesDelta || ''}
            readOnly
            className="bg-gray-100"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="reste-facturer">Reste à facturer client</Label>
          <Input
            id="reste-facturer"
            type="number"
            value={valorisation.resteFacturerClient || ''}
            readOnly
            className="bg-gray-100"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ValorisationSection;
