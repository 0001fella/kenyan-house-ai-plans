
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import DesignViewer3D from '../components/visualization/DesignViewer3D';
import FloorPlan2D from '../components/visualization/FloorPlan2D';
import { useProject } from '../contexts/ProjectContext';
import { 
  Building2, 
  ArrowLeft, 
  Wand2, 
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Settings,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

const GeneratorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { generateDesign, setSelectedDesign, isLoading } = useProject();
  
  const [projectData] = useState(location.state?.projectData || {});
  const [designs, setDesigns] = useState([]);
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  useEffect(() => {
    if (!projectData.name) {
      navigate('/design-input');
      return;
    }
    
    // Auto-generate designs on page load
    handleGenerate();
  }, [projectData]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

    try {
      const generatedDesigns = await generateDesign(projectData.requirements);
      setDesigns(generatedDesigns);
      setSelectedDesign(generatedDesigns[0]);
      setGenerationProgress(100);
      toast.success('Designs generated successfully!');
    } catch (error) {
      toast.error('Failed to generate designs');
    } finally {
      setIsGenerating(false);
      clearInterval(progressInterval);
    }
  };

  const handleDesignSelect = (index) => {
    setSelectedDesignIndex(index);
    setSelectedDesign(designs[index]);
  };

  const handleProceedToQuotation = () => {
    if (designs[selectedDesignIndex]) {
      navigate('/quotation', {
        state: {
          projectData,
          selectedDesign: designs[selectedDesignIndex]
        }
      });
    }
  };

  const getProgressMessage = () => {
    if (generationProgress < 20) return "Initializing AI models...";
    if (generationProgress < 40) return "Analyzing parameters...";
    if (generationProgress < 60) return "Generating floor plans...";
    if (generationProgress < 80) return "Optimizing design...";
    if (generationProgress < 95) return "Validating building codes...";
    return "Finalizing designs...";
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="space-y-4 text-center">
              <div className="flex items-center justify-center">
                <Wand2 className="h-12 w-12 text-blue-600 animate-spin" />
              </div>
              
              <h2 className="text-xl font-semibold">AI Design Generation</h2>
              
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                ></div>
              </div>
              
              <p className="text-gray-600">{getProgressMessage()}</p>
              <p className="text-sm text-gray-500">{Math.round(generationProgress)}% complete</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Design Generator</h1>
                <p className="text-sm text-gray-600">{projectData.name}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleGenerate}>
              <Wand2 className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Design Options Sidebar */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Generated Designs</h2>
            
            {designs.map((design, index) => (
              <Card 
                key={design.id}
                className={`cursor-pointer transition-all ${
                  selectedDesignIndex === index 
                    ? 'ring-2 ring-blue-500 bg-blue-50' 
                    : 'hover:shadow-lg'
                }`}
                onClick={() => handleDesignSelect(index)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{design.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Area:</span>
                      <span className="font-medium">{design.area}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Cost:</span>
                      <span className="font-medium text-green-600">KES {design.cost}</span>
                    </div>
                    
                    {/* Validation Status */}
                    <div className="flex items-center space-x-2 mt-3">
                      {design.validation.is_valid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      )}
                      <span className="text-xs">
                        {design.validation.compliance_score}% compliant
                      </span>
                    </div>
                    
                    {design.validation.warnings.length > 0 && (
                      <div className="bg-yellow-50 p-2 rounded text-xs">
                        <p className="text-yellow-800">
                          {design.validation.warnings[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {designs.length > 0 && (
              <Button 
                className="w-full" 
                onClick={handleProceedToQuotation}
              >
                Proceed to Quotation
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>

          {/* Main Visualization Area */}
          <div className="lg:col-span-3 space-y-6">
            {designs.length > 0 ? (
              <>
                {/* Design Details */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{designs[selectedDesignIndex].name}</CardTitle>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Bedrooms:</span>
                        <p className="font-medium">{designs[selectedDesignIndex].bedrooms}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Bathrooms:</span>
                        <p className="font-medium">{designs[selectedDesignIndex].bathrooms}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Total Area:</span>
                        <p className="font-medium">{designs[selectedDesignIndex].area}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Estimated Cost:</span>
                        <p className="font-medium text-green-600">KES {designs[selectedDesignIndex].cost}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 2D Floor Plan */}
                <FloorPlan2D 
                  planData={designs[selectedDesignIndex]}
                  userRole="Contractor"
                />

                {/* 3D Visualization */}
                <DesignViewer3D 
                  designData={designs[selectedDesignIndex]}
                  userRole="Contractor"
                />
              </>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Building2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                  <p>No designs generated yet</p>
                  <Button className="mt-4" onClick={handleGenerate}>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Designs
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;
