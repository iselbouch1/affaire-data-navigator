
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddressData } from '@/types';

// This is a simplified list of countries - in a real app, use a complete list
const COUNTRIES = [
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'Spain', code: 'ES' },
  { name: 'Italy', code: 'IT' },
  { name: 'China', code: 'CN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Canada', code: 'CA' },
  { name: 'Brazil', code: 'BR' },
  { name: 'Australia', code: 'AU' }
];

interface AddressSectionProps {
  title: string;
  addressType: keyof Pick<
    typeof useAffaireContext extends () => infer R ? R : never, 
    'headerData'
  >['headerData'] & string;
  maxLength?: number; // Maximum character length for address lines
}

const AddressSection: React.FC<AddressSectionProps> = ({ 
  title, 
  addressType,
  maxLength = 35 // Default to 35 chars as per spec
}) => {
  const { headerData, updateHeaderData } = useAffaireContext();

  if (!headerData) return null;

  // Type assertion to access nested address object
  const addressData = headerData[addressType as keyof typeof headerData] as AddressData;
  
  if (!addressData) return null;

  const updateAddress = (updates: Partial<AddressData>) => {
    const updatedAddressData = { ...addressData, ...updates };
    
    // Update the specific address in the headerData
    updateHeaderData({ 
      [addressType]: updatedAddressData
    } as any);
  };

  const handleCountryChange = (country: string) => {
    const selectedCountry = COUNTRIES.find(c => c.name === country);
    updateAddress({ 
      pays: country,
      codePays: selectedCountry?.code || ''
    });
  };

  const handleLineChange = (index: number, value: string) => {
    const newLines = [...addressData.lignes];
    newLines[index] = value;
    updateAddress({ lignes: newLines });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${addressType}-country`}>Pays</Label>
            <Select 
              value={addressData.pays} 
              onValueChange={handleCountryChange}
            >
              <SelectTrigger id={`${addressType}-country`}>
                <SelectValue placeholder="Sélectionner un pays" />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map(country => (
                  <SelectItem key={country.code} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${addressType}-code`}>Code pays</Label>
            <Input
              id={`${addressType}-code`}
              value={addressData.codePays}
              onChange={e => updateAddress({ codePays: e.target.value })}
              maxLength={2}
              className="uppercase"
            />
          </div>
        </div>
        
        {addressData.lignes.map((line, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`${addressType}-line-${index}`}>
              Ligne {index + 1}
            </Label>
            <Input
              id={`${addressType}-line-${index}`}
              value={line}
              onChange={e => handleLineChange(index, e.target.value)}
              maxLength={maxLength || undefined}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AddressSection;
