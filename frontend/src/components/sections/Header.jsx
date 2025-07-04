
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="relative border-b border-border bg-card/95 backdrop-blur-xl shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-card rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded transform rotate-12"></div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-ping"></div>
          </div>
          <div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              JM Structural Solutions
            </span>
            <div className="text-xs text-muted-foreground font-medium">Make It Easy - AI Construction</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-muted-foreground hover:text-primary font-medium transition-colors relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a href="#testimonials" className="text-muted-foreground hover:text-primary font-medium transition-colors relative group">
            Reviews
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-muted-foreground hover:text-primary font-medium transition-colors relative group">
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
          </a>
          <Link to="/design">
            <Button className="bg-gradient-to-r from-primary to-accent hover:shadow-lg text-primary-foreground shadow-md hover:shadow-xl transition-all transform hover:scale-105">
              <Sparkles className="h-4 w-4 mr-2" />
              Get Started
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
