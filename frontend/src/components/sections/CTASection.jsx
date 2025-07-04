
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Sparkles, Eye } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-foreground via-primary to-accent text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20"></div>
      <div className="container mx-auto px-4 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Make It Easy?
          </h2>
          <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
            Join hundreds of Kenyan builders using AI-powered construction planning to create extraordinary projects
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/design-input">
              <Button size="lg" className="px-12 py-4 text-lg bg-card text-primary hover:bg-secondary transition-all transform hover:scale-105 shadow-2xl">
                <Sparkles className="mr-3 h-6 w-6" />
                Start Free Project
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="px-12 py-4 text-lg border-2 border-card text-card hover:bg-card hover:text-primary transition-all transform hover:scale-105">
                <Eye className="mr-3 h-6 w-6" />
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
