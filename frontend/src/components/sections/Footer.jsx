
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <div className="w-6 h-6 bg-card rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-gradient-to-br from-primary to-accent rounded transform rotate-12"></div>
                </div>
              </div>
              <div>
                <div className="text-lg font-bold">JM Structural Solutions</div>
                <div className="text-xs text-primary-foreground/70">Make It Easy - AI Construction</div>
              </div>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              Transforming Kenya's construction industry with AI-powered precision and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg text-primary">Services</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="hover:text-primary transition-colors cursor-pointer">AI Design Generation</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Cost Estimation</li>
              <li className="hover:text-primary transition-colors cursor-pointer">BIM Integration</li>
              <li className="hover:text-primary transition-colors cursor-pointer">3D Visualization</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg text-accent">Company</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="hover:text-accent transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Contact</li>
              <li className="hover:text-accent transition-colors cursor-pointer">Support</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg text-primary">Contact</h4>
            <div className="space-y-3 text-sm text-primary-foreground/70">
              <p>Nairobi, Kenya</p>
              <p className="hover:text-primary transition-colors cursor-pointer">info@jmstructural.co.ke</p>
              <p className="hover:text-primary transition-colors cursor-pointer">+254 700 000 000</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-primary-foreground/70 mb-4 md:mb-0">
            © 2025 JM Structural Solutions. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-primary-foreground/70">
            <span className="hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-primary transition-colors cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
