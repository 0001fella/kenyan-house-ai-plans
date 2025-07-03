
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
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-200/50 mb-6">
            <TrendingUp className="h-4 w-4 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-700">Trusted by 500+ Projects Across Kenya</span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Build Your Dream Home with
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent relative">
            AI Precision
            <div className="absolute -top-4 -right-8 text-2xl animate-bounce">✨</div>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
          Generate professional house plans, accurate cost estimates, and detailed Bill of Quantities 
          tailored for the Kenyan construction market - all powered by advanced AI technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <Link to="/design-input">
            <Button size="lg" className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 group">
              <MousePointer className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Start Your Project
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="px-12 py-4 text-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-all transform hover:scale-105">
              <Layers className="mr-3 h-6 w-6" />
              View Dashboard
            </Button>
          </Link>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="h-4 w-4" />
            <span>ISO 9001 Certified</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Award className="h-4 w-4" />
            <span>Kenya Building Code Compliant</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CheckCircle className="h-4 w-4" />
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
