
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ImputationSection = () => {
  const { headerData, updateHeaderData } = useAffaireContext();

  if (!headerData) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">Imputation Comptable</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="imputation">Code Comptable</Label>
          <Input
            id="imputation"
            value={headerData.imputationComptable}
            onChange={e => updateHeaderData({ imputationComptable: e.target.value })}
            placeholder="Code d'imputation comptable"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ImputationSection;
