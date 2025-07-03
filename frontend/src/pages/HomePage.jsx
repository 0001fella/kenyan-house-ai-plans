
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { 
  Building2, 
  Zap, 
  Calculator, 
  Eye,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  Shield
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-600" />,
      title: "AI-Powered Design",
      description: "Generate optimized building designs using advanced AI models trained on Kenyan construction standards."
    },
    {
      icon: <Calculator className="h-8 w-8 text-green-600" />,
      title: "Real-time Quotations",
      description: "Get accurate cost estimates with live market pricing from Kenyan suppliers and contractors."
    },
    {
      icon: <Eye className="h-8 w-8 text-purple-600" />,
      title: "3D Visualization",
      description: "Visualize your projects in stunning 3D with walkthrough capabilities and BIM integration."
    },
    {
      icon: <Building2 className="h-8 w-8 text-orange-600" />,
      title: "BIM Integration",
      description: "Export to IFC format and integrate with professional BIM software like Revit and Tekla."
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "50+", label: "Active Contractors" },
    { number: "15", label: "Counties Served" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JM Structural Solutions</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
            <Link to="/design">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Dream Home with
            <span className="text-blue-600"> AI Precision</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate professional house plans, accurate cost estimates, and detailed Bill of Quantities 
            tailored for the Kenyan construction market - all powered by advanced AI technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/design-input">
              <Button size="lg" className="px-8">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="px-8">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Modern Construction
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to plan, design, and estimate your construction projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              From sketch to quotation in minutes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Requirements</h3>
              <p className="text-gray-600">
                Upload sketches, set budget, location, and specify your needs
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
              <p className="text-gray-600">
                Our AI creates optimized designs and accurate cost estimates
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Review & Export</h3>
              <p className="text-gray-600">
                Review 3D models, modify as needed, and export professional documents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join hundreds of Kenyan builders using AI-powered construction planning
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/design-input">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Start Free Project
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-blue-700 px-8">
                View Examples
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6" />
                <span className="text-lg font-bold">JM Structural Solutions</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered construction planning for Kenya's building industry.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>AI Design Generation</li>
                <li>Cost Estimation</li>
                <li>BIM Integration</li>
                <li>3D Visualization</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
                <li>Support</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>Nairobi, Kenya</p>
                <p>info@jmstructural.co.ke</p>
                <p>+254 700 000 000</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-sm text-gray-400">
            © 2025 JM Structural Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
