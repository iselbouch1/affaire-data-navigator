
import React from 'react';
import { useAffaireContext } from '@/contexts/AffaireContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AutomaticFields from './Sections/AutomaticFields';
import ManualFields from './Sections/ManualFields';
import AddressSection from './Sections/AddressSection';
import ContactSection from './Sections/ContactSection';
import ImputationSection from './Sections/ImputationSection';
import ExpeditionDocsSection from './Sections/ExpeditionDocsSection';
import ValorisationSection from './Sections/ValorisationSection';
import TransportDetailsSection from './Sections/TransportDetailsSection';

const HeaderForm = () => {
  const { affaireCode, headerData, loading, error } = useAffaireContext();

  if (!affaireCode) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-2xl font-semibold mb-4 text-dtr-primary">Bienvenue sur DTr Affaire Navigator</h2>
        <p className="text-gray-600 text-center max-w-md">
          Recherchez une affaire en utilisant la barre de recherche en haut pour commencer.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 flex flex-col items-center py-12">
        <h3 className="text-xl font-medium mb-2">Erreur</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!headerData) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-dtr-primary">
        Affaire: {headerData.salesOrder} - {headerData.affaireName}
      </h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-4">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="addresses">Adresses</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="expedition">Expédition</TabsTrigger>
          <TabsTrigger value="valorisation">Valorisation</TabsTrigger>
          <TabsTrigger value="transport">Transport</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <AutomaticFields />
          <ManualFields />
          <ImputationSection />
        </TabsContent>

        <TabsContent value="addresses" className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AddressSection 
            title="Adresse Acheteur / Shipping Invoice" 
            addressType="adresseAcheteur" 
          />
          <AddressSection 
            title="Adresse Destinataire / Packing List" 
            addressType="adresseDestinataire" 
          />
          <AddressSection 
            title="Livraison détaillée" 
            addressType="livraisonDetaillee" 
            maxLength={0}
          />
          <AddressSection 
            title="Broker à destination" 
            addressType="brokerDestination" 
          />
          <AddressSection 
            title="Adresse Envoi des Originaux" 
            addressType="adresseEnvoiOriginaux" 
          />
          <AddressSection 
            title="Adresse Chargement/Retour" 
            addressType="adresseChargementRetour"
          />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4">
          <ContactSection />
        </TabsContent>

        <TabsContent value="expedition" className="space-y-4">
          <ExpeditionDocsSection />
        </TabsContent>

        <TabsContent value="valorisation" className="space-y-4">
          <ValorisationSection />
        </TabsContent>

        <TabsContent value="transport" className="space-y-4">
          <TransportDetailsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HeaderForm;
