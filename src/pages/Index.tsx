import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { HeroSection } from '@/components/HeroSection';
import { LanguageSelector } from '@/components/LanguageSelector';
import { BackgroundController } from '@/components/backgrounds';
import WeatherWidget from '@/components/WeatherWidget';
import CostCalculator from '@/components/CostCalculator';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen relative isolate">
      <BackgroundController type="living-fields" />
      <LanguageSelector />
      <Navbar />
      <main>
        <HeroSection />

        {/* Interactive Widgets Section */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <WeatherWidget />
              </div>
              <div className="lg:col-span-1">
                <CostCalculator />
              </div>
              <div className="lg:col-span-1 flex flex-col justify-center gap-6 glass-card p-8 rounded-3xl border-primary/20">
                <h2 className="text-3xl font-black leading-tight">Smart Farming <br /><span className="text-primary">Tools</span></h2>
                <p className="text-muted-foreground">Utilize our modern toolset to plan your season, calculate input costs, and monitor regional conditions in real-time.</p>
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold w-fit hover:translate-x-1 transition-transform">Explore All Tools →</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
