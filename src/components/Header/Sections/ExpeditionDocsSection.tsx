
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

const ExpeditionDocsSection = () => {
  const { headerData, updateHeaderData } = useAffaireContext();

  if (!headerData || !headerData.expeditionDocs) return null;

  const { expeditionDocs } = headerData;

  const handleTextChange = (field: keyof typeof expeditionDocs, value: string) => {
    updateHeaderData({
      expeditionDocs: {
        ...expeditionDocs,
        [field]: value
      }
    });
  };

  const handleCheckboxChange = (field: keyof typeof expeditionDocs, checked: boolean) => {
    updateHeaderData({
      expeditionDocs: {
        ...expeditionDocs,
        [field]: checked
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">Expédition Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="documents-douane">Documents Douane</Label>
          <Input
            id="documents-douane"
            value={expeditionDocs.documentsDuoanes}
            onChange={e => handleTextChange('documentsDuoanes', e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="certificat-origine"
            checked={expeditionDocs.certificatOrigine}
            onCheckedChange={checked => 
              handleCheckboxChange('certificatOrigine', checked as boolean)
            }
          />
          <Label htmlFor="certificat-origine">Certificat Origine</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="carnet-ata"
            checked={expeditionDocs.carnetATAOutillages}
            onCheckedChange={checked => 
              handleCheckboxChange('carnetATAOutillages', checked as boolean)
            }
          />
          <Label htmlFor="carnet-ata">Carnet ATA Outillages</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="formulaire-acces">Formulaire Accès Centrale</Label>
          <Input
            id="formulaire-acces"
            value={expeditionDocs.formulaireAccesCentrale}
            onChange={e => handleTextChange('formulaireAccesCentrale', e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="envoi-originaux"
            checked={expeditionDocs.envoiOriginauxClient}
            onCheckedChange={checked => 
              handleCheckboxChange('envoiOriginauxClient', checked as boolean)
            }
          />
          <Label htmlFor="envoi-originaux">Envoi Originaux au Client</Label>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="autres-instructions">Autres Instructions</Label>
          <Textarea
            id="autres-instructions"
            value={expeditionDocs.autresInstructions}
            onChange={e => handleTextChange('autresInstructions', e.target.value)}
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpeditionDocsSection;
