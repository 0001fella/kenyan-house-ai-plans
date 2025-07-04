
import React from 'react';
import Header from '../components/sections/Header';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import FeaturesSection from '../components/sections/FeaturesSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CTASection from '../components/sections/CTASection';
import Footer from '../components/sections/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-accent/10 to-primary/20 overflow-hidden relative">
      {/* Geometric Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary/10 transform rotate-45 rounded-lg"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-accent/10 transform rotate-12 rounded-lg"></div>
        <div className="absolute top-1/2 right-32 w-16 h-16 bg-primary/15 transform -rotate-45 rounded-lg"></div>
      </div>

      <Header />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default HomePage;
