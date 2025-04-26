
import React from 'react';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <AppHeader />
      <main className="flex-grow container mx-auto py-6 px-4">
        {children}
      </main>
      <AppFooter />
      <Toaster />
      <Sonner />
    </div>
  );
};

export default MainLayout;
