
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { LoginDialog } from '../../components/auth/LoginDialog';
import { User, LogOut } from 'lucide-react';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.location.reload();
  };

  return (
    <header className="bg-background border-b border-border shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-6 h-6 bg-primary-foreground rounded transform rotate-12"></div>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">
                JM SOLUTIONS
              </span>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">
                CONSTRUCTION MANAGEMENT SOFTWARE
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#solutions" className="text-foreground hover:text-primary font-medium transition-colors">
              Solutions
            </a>
            <a href="#who-we-serve" className="text-foreground hover:text-primary font-medium transition-colors">
              Who We Serve
            </a>
            <a href="#why-procore" className="text-foreground hover:text-primary font-medium transition-colors">
              Why JM Solutions
            </a>
            <a href="#resources" className="text-foreground hover:text-primary font-medium transition-colors">
              Resources
            </a>
            <a href="#support" className="text-foreground hover:text-primary font-medium transition-colors">
              Support
            </a>
            <a href="#pricing" className="text-foreground hover:text-primary font-medium transition-colors">
              Pricing
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden lg:block">
              📞 (254) 477-6267
            </span>
            
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground transition-colors p-2"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <LoginDialog>
                  <button className="text-foreground hover:text-primary font-medium transition-colors">
                    Log In
                  </button>
                </LoginDialog>
                <LoginDialog>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md font-medium">
                    Request a Demo
                  </Button>
                </LoginDialog>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
