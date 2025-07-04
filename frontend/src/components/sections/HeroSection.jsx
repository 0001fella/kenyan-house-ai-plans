
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { 
  ArrowRight,
  CheckCircle,
  Shield,
  Award,
  TrendingUp,
  Layers,
  MousePointer,
  Sparkles
} from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full border border-primary/20 mb-6">
            <TrendingUp className="h-4 w-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Trusted by 500+ Projects Across Kenya</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Make Construction
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent relative">
            Easy & Precise
            <div className="absolute -top-4 -right-8 text-2xl animate-bounce">🚀</div>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
          Revolutionary AI-powered construction planning software that transforms complex engineering calculations 
          into simple, accurate solutions for Kenya's building industry.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link to="/design-input">
            <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-primary to-accent hover:shadow-lg text-primary-foreground shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 group">
              <MousePointer className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Start Your Project
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="px-12 py-4 text-lg border-2 border-primary hover:border-accent hover:bg-primary/5 transition-all transform hover:scale-105">
              <Layers className="mr-3 h-6 w-6" />
              View Dashboard
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>ISO 9001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Award className="h-4 w-4 text-accent" />
            <span>Kenya Building Code Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="h-4 w-4 text-primary" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
