
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const AutomaticFields = () => {
  const { headerData } = useAffaireContext();

  if (!headerData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">Informations automatiques</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="salesOrder">Sales Order (Doc. vente)</Label>
          <Input
            id="salesOrder"
            value={headerData.salesOrder}
            readOnly
            className="bg-gray-100"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="affaireName">Nom de l'affaire</Label>
          <Input
            id="affaireName"
            value={headerData.affaireName}
            readOnly
            className="bg-gray-100"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AutomaticFields;
