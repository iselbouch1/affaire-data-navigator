
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const ContactSection = () => {
  const { headerData, updateHeaderData } = useAffaireContext();

  if (!headerData || !headerData.contact) return null;

  const { contact } = headerData;

  const handleChange = (field: keyof typeof contact, value: string) => {
    updateHeaderData({
      contact: {
        ...contact,
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg text-dtr-primary">Contact / Notify</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Nom complet</Label>
          <Input
            id="contact-name"
            value={contact.nomComplet}
            onChange={e => handleChange('nomComplet', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact-tel">Téléphone</Label>
          <Input
            id="contact-tel"
            value={contact.tel}
            onChange={e => handleChange('tel', e.target.value)}
            maxLength={35}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact-mobile">Mobile</Label>
          <Input
            id="contact-mobile"
            value={contact.mobile}
            onChange={e => handleChange('mobile', e.target.value)}
            maxLength={35}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input
            id="contact-email"
            type="email"
            value={contact.email}
            onChange={e => handleChange('email', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
