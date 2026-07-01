import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { ServicesBento } from '@/components/home/ServicesBento';
import { ProcessPreview } from '@/components/home/ProcessPreview';
import { FeaturedWork } from '@/components/home/FeaturedWork';
import { InternshipCTA } from '@/components/home/InternshipCTA';
import { FinalCTA } from '@/components/home/FinalCTA';

const Index = () => {
  useEffect(() => {
    document.title = 'TechVistar — Technology-First Growth Partner';
  }, []);

  return (
    <div className="min-h-screen bg-ink">
      <Navbar />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <ServicesBento />
        <ProcessPreview />
        <FeaturedWork />
        <InternshipCTA />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
