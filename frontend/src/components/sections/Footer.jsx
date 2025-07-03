
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-16 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/lovable-uploads/a9dfcf4f-89c9-4677-9788-599677ec1d02.png" 
                alt="JM Structural Solutions" 
                className="h-10 w-auto"
              />
              <div>
                <div className="text-lg font-bold">JM Structural Solutions</div>
                <div className="text-xs text-gray-400">AI-Powered Construction</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming Kenya's construction industry with AI-powered precision and innovation.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Services</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">AI Design Generation</li>
              <li className="hover:text-white transition-colors cursor-pointer">Cost Estimation</li>
              <li className="hover:text-white transition-colors cursor-pointer">BIM Integration</li>
              <li className="hover:text-white transition-colors cursor-pointer">3D Visualization</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
              <li className="hover:text-white transition-colors cursor-pointer">Support</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-6 text-lg">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <p>Nairobi, Kenya</p>
              <p className="hover:text-white transition-colors cursor-pointer">info@jmstructural.co.ke</p>
              <p className="hover:text-white transition-colors cursor-pointer">+254 700 000 000</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 JM Structural Solutions. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-gray-400">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
