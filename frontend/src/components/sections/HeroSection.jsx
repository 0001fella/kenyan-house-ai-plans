
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
  Sparkles,
  Building2
} from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-secondary to-background py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Content */}
          <div className="lg:w-1/2 lg:pr-12">
            <div className="inline-flex items-center px-3 py-1 bg-primary/10 rounded-full mb-6">
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                🔥 CONSTRUCTION MANAGEMENT SOFTWARE
              </span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Together, we can build it all
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Manage your construction projects from preconstruction to closeout with the insights you need to maximize safety, efficiency, and return.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium">
                See pricing
              </Button>
              <Button variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-3 text-lg font-medium">
                See it in action →
              </Button>
            </div>
          </div>

          {/* Hero Image/Video Area */}
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative bg-gradient-to-br from-muted to-secondary rounded-2xl p-8 shadow-2xl">
              <div className="aspect-video bg-foreground/5 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">Construction Management Dashboard</p>
                  <p className="text-sm text-muted-foreground mt-2">AI-Powered Project Insights</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
