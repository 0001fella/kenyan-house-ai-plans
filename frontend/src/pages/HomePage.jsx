
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
  Shield,
  Star,
  Award,
  TrendingUp,
  Layers,
  MousePointer,
  Sparkles
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "AI-Powered Design",
      description: "Generate optimized building designs using advanced AI models trained on Kenyan construction standards.",
      gradient: "from-yellow-500/10 to-orange-500/10"
    },
    {
      icon: <Calculator className="h-8 w-8 text-green-500" />,
      title: "Real-time Quotations",
      description: "Get accurate cost estimates with live market pricing from Kenyan suppliers and contractors.",
      gradient: "from-green-500/10 to-emerald-500/10"
    },
    {
      icon: <Eye className="h-8 w-8 text-purple-500" />,
      title: "3D Visualization",
      description: "Visualize your projects in stunning 3D with walkthrough capabilities and BIM integration.",
      gradient: "from-purple-500/10 to-pink-500/10"
    },
    {
      icon: <Building2 className="h-8 w-8 text-blue-500" />,
      title: "BIM Integration",
      description: "Export to IFC format and integrate with professional BIM software like Revit and Tekla.",
      gradient: "from-blue-500/10 to-cyan-500/10"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: <Award className="h-6 w-6" /> },
    { number: "50+", label: "Active Contractors", icon: <Users className="h-6 w-6" /> },
    { number: "15", label: "Counties Served", icon: <Globe className="h-6 w-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Star className="h-6 w-6" /> }
  ];

  const testimonials = [
    {
      name: "David Kiprotich",
      role: "Construction Manager",
      company: "Nairobi Builders Ltd",
      quote: "JM Structural Solutions transformed our project delivery time by 60%. The AI-powered designs are incredibly accurate.",
      rating: 5
    },
    {
      name: "Sarah Wanjiku",
      role: "Architect",
      company: "Modern Designs Kenya",
      quote: "The 3D visualization and BIM integration saved us countless hours. Best investment we've made for our firm.",
      rating: 5
    },
    {
      name: "John Mwangi",
      role: "Homeowner",
      company: "Private Client",
      quote: "Built my dream home with accurate cost predictions. No surprises, just quality results.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-400/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-green-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative border-b bg-white/90 backdrop-blur-xl shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/lovable-uploads/a9dfcf4f-89c9-4677-9788-599677ec1d02.png" 
                alt="JM Structural Solutions" 
                className="h-12 w-auto transition-transform hover:scale-105"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                JM Structural Solutions
              </span>
              <div className="text-xs text-gray-500 font-medium">AI-Powered Construction</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Reviews
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contact" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </a>
            <Link to="/design">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                <Sparkles className="h-4 w-4 mr-2" />
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-white via-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-gray-100">
                  <div className="flex justify-center mb-4 text-blue-600 group-hover:text-purple-600 transition-colors">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-200/50 mb-6">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-700">Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 to-blue-800 bg-clip-text text-transparent">
                Modern Construction
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to plan, design, and estimate your construction projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className={`group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 shadow-lg bg-gradient-to-br ${feature.gradient} backdrop-blur-sm`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-6 relative">
                    <div className="p-4 rounded-2xl bg-white shadow-lg group-hover:shadow-xl transition-all">
                      {feature.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl opacity-90">
              Trusted by construction professionals across Kenya
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-lg">{testimonial.name}</div>
                  <div className="text-sm opacity-80">{testimonial.role}</div>
                  <div className="text-sm opacity-60">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Build the Future?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 leading-relaxed">
              Join hundreds of Kenyan builders using AI-powered construction planning to create extraordinary projects
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/design-input">
                <Button size="lg" className="px-12 py-4 text-lg bg-white text-blue-600 hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Start Free Project
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button size="lg" variant="outline" className="px-12 py-4 text-lg border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105">
                  <Eye className="mr-3 h-6 w-6" />
                  View Examples
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
};

export default HomePage;
