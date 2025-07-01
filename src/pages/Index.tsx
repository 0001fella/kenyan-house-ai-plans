
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Calculator, FileText, Box, Download, Users, CheckCircle, ArrowRight, Menu, X, Star, Award, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const features = [
    {
      icon: Building2,
      title: "AI-Powered Design",
      description: "Generate multiple 2D house plan options automatically using advanced AI algorithms",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Calculator,
      title: "Smart Cost Estimation", 
      description: "Predict accurate construction costs based on your design and Kenyan market rates",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: FileText,
      title: "Bill of Quantities",
      description: "Generate detailed material schedules and cost breakdowns in downloadable formats",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Box,
      title: "3D Visualization",
      description: "View your designs in stunning 3D models with our web-based viewer",
      color: "from-orange-500 to-red-500"
    }
  ];

  const pricingTiers = [
    {
      name: "Starter",
      price: "KES 0",
      period: "forever",
      description: "Perfect for exploring and basic planning",
      features: [
        "Up to 3 design iterations",
        "Basic 2D floor plans",
        "Preliminary cost estimates",
        "PDF plan downloads",
        "Email support"
      ],
      buttonText: "Start Free",
      popular: false,
      highlight: false
    },
    {
      name: "Professional",
      price: "KES 2,500",
      period: "per project",
      description: "Ideal for serious home builders",
      features: [
        "Unlimited design iterations",
        "Detailed BoQ generation",
        "Advanced cost breakdown",
        "3D visualization",
        "Material specifications",
        "Priority support",
        "Revision tracking"
      ],
      buttonText: "Go Professional",
      popular: true,
      highlight: true
    },
    {
      name: "Enterprise",
      price: "KES 25,000",
      period: "per project",
      description: "For large-scale developments",
      features: [
        "Everything in Professional",
        "Custom BIM integration",
        "Engineering consultation",
        "Multi-unit developments",
        "Dedicated project manager",
        "On-site support",
        "Custom reporting"
      ],
      buttonText: "Contact Sales",
      popular: false,
      highlight: false
    }
  ];

  const testimonials = [
    {
      name: "David Kiprotich",
      role: "Property Developer",
      location: "Nairobi",
      content: "JM Structural Solutions saved me weeks of planning time and helped me stay within budget. The AI-generated designs were spot-on!",
      rating: 5
    },
    {
      name: "Grace Wanjiku",
      role: "Homeowner",
      location: "Nakuru",
      content: "Finally, a tool that understands Kenyan construction costs. The BoQ was incredibly detailed and accurate.",
      rating: 5
    },
    {
      name: "Samuel Ochieng",
      role: "Architect",
      location: "Mombasa",
      content: "The 3D visualization feature helped my clients understand their project better. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">JM Structural</span>
                <div className="text-xs text-blue-600 font-medium">Solutions</div>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</a>
              <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Reviews</a>
              <Button variant="ghost" className="text-gray-700">Sign In</Button>
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Features</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Pricing</a>
                <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Reviews</a>
                <Button variant="ghost" className="text-gray-700 justify-start">Sign In</Button>
                <Link to="/dashboard">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="container mx-auto text-center relative">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Award className="h-4 w-4" />
            <span>Trusted by 2,500+ Kenyan Builders</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Build Your Dream Home with
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              AI-Powered Precision
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
            From budget planning to detailed construction drawings, we help Kenyan homeowners and builders 
            create professional house plans with accurate cost estimates in <strong>minutes, not weeks</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/dashboard">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                Start Building Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 hover:bg-gray-50 transition-all duration-300">
              <Download className="mr-2 h-5 w-5" />
              View Sample Plans
            </Button>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2,500+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">97%</div>
              <div className="text-gray-600">Cost Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">24hrs</div>
              <div className="text-gray-600">Average Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
              <Zap className="h-4 w-4 mr-2" />
              Cutting-Edge Technology
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need to Build Smart
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform combines cutting-edge technology with local Kenyan construction expertise
              to deliver unmatched accuracy and efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-gray-50/50 hover:scale-105 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardHeader className="text-center relative">
                  <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-500`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have transformed their building dreams into reality
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <CardDescription className="text-gray-700 text-base leading-relaxed">
                    "{testimonial.content}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role} • {testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Choose Your Building Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transparent pricing designed for every stage of your construction project. No hidden fees, ever.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={index} className={`relative transition-all duration-300 hover:scale-105 ${
                tier.highlight 
                  ? 'border-2 border-blue-500 shadow-2xl bg-gradient-to-br from-blue-50 to-white' 
                  : 'border border-gray-200 shadow-lg hover:shadow-xl bg-white'
              }`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 shadow-lg">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold">{tier.name}</CardTitle>
                  <CardDescription className="text-gray-600 mt-2">{tier.description}</CardDescription>
                  <div className="mt-6">
                    <span className="text-4xl font-bold text-blue-600">{tier.price}</span>
                    <span className="text-gray-500 ml-2">{tier.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full py-3 ${
                      tier.highlight 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg' 
                        : 'bg-gray-900 hover:bg-gray-800'
                    } transition-all duration-300`}
                  >
                    {tier.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Build Your Future?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
            Join thousands of Kenyan builders who trust JM Structural Solutions for their construction projects. 
            Start your journey to your dream home today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="text-lg px-10 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-xl">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-10 py-6 border-2 border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">JM Structural Solutions</span>
                  <div className="text-sm text-gray-400">Building Tomorrow, Today</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Empowering Kenyan builders with AI-powered construction solutions. 
                From concept to completion, we're your trusted partner in building excellence.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">T</span>
                </div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Products</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">AI Design Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cost Estimation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">3D Visualization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">BoQ Generation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Support</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-6 text-lg">Company</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2024 JM Structural Solutions. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
