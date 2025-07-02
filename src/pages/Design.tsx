
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  ArrowLeft,
  Download,
  Eye,
  Calculator,
  RefreshCw,
  Wand2,
  FileText,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";

const Design = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [projectData] = useState(location.state?.projectData || {});
  const [designOptions, setDesignOptions] = useState([]);
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [generationProgress, setGenerationProgress] = useState(0);

  useEffect(() => {
    // Simulate AI design generation
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          // Mock generated designs
          setDesignOptions([
            {
              id: 1,
              name: "Modern Layout",
              description: "Contemporary open-plan design with large windows",
              rooms: ["Living Room", "Kitchen", "3 Bedrooms", "2 Bathrooms", "Dining"],
              area: "120 m²",
              cost: "2,450,000"
            },
            {
              id: 2,
              name: "Traditional Layout",
              description: "Classic Kenyan design with separate living areas",
              rooms: ["Sitting Room", "Kitchen", "3 Bedrooms", "2 Bathrooms", "Store"],
              area: "115 m²",
              cost: "2,280,000"
            },
            {
              id: 3,
              name: "Compact Layout",
              description: "Space-efficient design maximizing functionality",
              rooms: ["Open Living", "Kitchen", "3 Bedrooms", "2 Bathrooms"],
              area: "105 m²",
              cost: "2,150,000"
            }
          ]);
          return 100;
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleViewBudget = () => {
    navigate("/budget", { 
      state: { 
        projectData, 
        selectedDesign: designOptions[selectedDesign] 
      } 
    });
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="h-5 w-5" />
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">JM Structural Solutions</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <Wand2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                AI is Generating Your Designs
              </h1>
              <p className="text-gray-600 text-lg">
                Our advanced AI is creating multiple design options based on your requirements...
              </p>
            </div>
            
            <div className="space-y-4">
              <Progress value={generationProgress} className="h-3" />
              <p className="text-sm text-gray-500">
                {generationProgress < 30 && "Analyzing your requirements..."}
                {generationProgress >= 30 && generationProgress < 60 && "Generating floor plans..."}
                {generationProgress >= 60 && generationProgress < 90 && "Optimizing layouts..."}
                {generationProgress >= 90 && "Finalizing designs..."}
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
              <Card>
                <CardHeader>
                  <Building2 className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle className="text-lg">Smart Layout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Optimizing room placement and flow based on Kenyan living patterns
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <Calculator className="h-8 w-8 text-green-600 mb-2" />
                  <CardTitle className="text-lg">Cost Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Calculating material costs using current Kenyan market rates
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <FileText className="h-8 w-8 text-purple-600 mb-2" />
                  <CardTitle className="text-lg">Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Preparing detailed plans and specifications for construction
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JM Structural Solutions</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {projectData.name || "Untitled Project"}
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Options
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Design Options</h1>
          <p className="text-gray-600">Choose from AI-generated designs tailored to your requirements</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Design Options Sidebar */}
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900">Generated Designs</h2>
            {designOptions.map((design, index) => (
              <Card 
                key={design.id} 
                className={`cursor-pointer transition-all ${
                  selectedDesign === index ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedDesign(index)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{design.name}</CardTitle>
                  <CardDescription className="text-sm">{design.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Area:</span>
                      <span className="font-medium">{design.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Cost:</span>
                      <span className="font-medium text-green-600">KES {design.cost}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Button variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate More
            </Button>
          </div>

          {/* Main Design View */}
          <div className="lg:col-span-3">
            <Card className="h-fit">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {designOptions[selectedDesign]?.name}
                    </CardTitle>
                    <CardDescription>
                      {designOptions[selectedDesign]?.description}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" onClick={handleViewBudget}>
                      <Calculator className="h-4 w-4 mr-2" />
                      View Budget
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="floorplan" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="floorplan">Floor Plan</TabsTrigger>
                    <TabsTrigger value="3d">3D View</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="floorplan" className="mt-6">
                    <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                      <div className="text-center">
                        <Building2 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">2D Floor Plan</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Interactive floor plan will be displayed here
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="3d" className="mt-6">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-96 flex items-center justify-center">
                      <div className="text-center">
                        <Eye className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                        <p className="text-blue-700 font-medium">3D Visualization</p>
                        <p className="text-sm text-blue-600 mt-2 mb-4">
                          Upgrade to Pro to unlock 3D models
                        </p>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Upgrade Now
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-4">Room Layout</h3>
                        <div className="space-y-2">
                          {designOptions[selectedDesign]?.rooms.map((room, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-sm">{room}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-4">Specifications</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Area:</span>
                            <span className="font-medium">{designOptions[selectedDesign]?.area}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Bedrooms:</span>
                            <span className="font-medium">{projectData.bedrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Bathrooms:</span>
                            <span className="font-medium">{projectData.bathrooms}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Floors:</span>
                            <span className="font-medium">{projectData.floors}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Style:</span>
                            <span className="font-medium">{projectData.style}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
