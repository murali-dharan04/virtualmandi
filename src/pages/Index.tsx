import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { LanguageSelector } from '@/components/LanguageSelector';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <LanguageSelector />
      <Navbar />
      <main>
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
