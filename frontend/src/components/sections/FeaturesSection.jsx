
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { 
  Building2, 
  Zap, 
  Calculator, 
  Eye,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const FeaturesSection = () => {
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

  return (
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
  );
};

export default FeaturesSection;
