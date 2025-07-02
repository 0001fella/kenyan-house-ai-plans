
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building2, 
  ArrowLeft,
  Settings,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUserRole } from "@/hooks/useUserRole";
import ParametricInputs from "@/components/design/ParametricInputs";
import PreviewPanel from "@/components/design/PreviewPanel";
import GenerateButton from "@/components/design/GenerateButton";
import { generateDesign, exportToIFC, type Design, type DesignRequest } from "@/api/mockApis";
import { toast } from "sonner";

const Design = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole, permissions } = useUserRole();
  const [projectData] = useState(location.state?.projectData || {});
  const [designOptions, setDesignOptions] = useState<Design[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<Design | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerate = async (params: DesignRequest) => {
    setIsGenerating(true);
    setGenerationProgress(0);
    toast("Starting AI design generation...");

    // Simulate progress
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 200);

    try {
      const designs = await generateDesign(params);
      setDesignOptions(designs);
      setSelectedDesign(designs[0]);
      setGenerationProgress(100);
      toast.success("AI designs generated successfully!");
    } catch (error) {
      toast.error("Failed to generate designs");
    } finally {
      setIsGenerating(false);
      clearInterval(interval);
    }
  };

  const handleExportIFC = async () => {
    if (!selectedDesign) return;
    
    if (!permissions.includes("export_ifc")) {
      toast.error("IFC export requires Engineer access");
      return;
    }

    toast("Exporting to IFC format...");
    try {
      const ifcUrl = await exportToIFC(selectedDesign);
      toast.success("IFC file exported successfully!");
      // In real app, would trigger download
      console.log("IFC Export URL:", ifcUrl);
    } catch (error) {
      toast.error("Failed to export IFC file");
    }
  };

  const handleViewBudget = () => {
    navigate("/budget", { 
      state: { 
        projectData, 
        selectedDesign 
      } 
    });
  };

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
            
            {/* Role Selector */}
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <Select value={role} onValueChange={(value: any) => setRole(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Homeowner">Homeowner</SelectItem>
                  <SelectItem value="Contractor">Contractor</SelectItem>
                  <SelectItem value="Engineer">Engineer</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Options
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Design Studio</h1>
          <p className="text-gray-600">Generate optimized building designs with Kenyan market intelligence</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Parameters */}
          <div className="space-y-6">
            <ParametricInputs onGenerate={handleGenerate} userRole={role} />
            
            {!isGenerating && designOptions.length === 0 && (
              <GenerateButton 
                onGenerate={() => handleGenerate({
                  bedrooms: 3,
                  bathrooms: 2,
                  plotSize: 50,
                  budget: 2500000,
                  location: "nairobi",
                  buildingType: "bungalow",
                  style: "modern",
                  floors: 1
                })}
                isGenerating={false}
                progress={0}
              />
            )}

            {/* Generated Options */}
            {designOptions.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Generated Designs</h3>
                {designOptions.map((design, index) => (
                  <div 
                    key={design.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedDesign?.id === design.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedDesign(design)}
                  >
                    <h4 className="font-medium">{design.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{design.description}</p>
                    <div className="flex justify-between mt-2 text-xs">
                      <span>{design.area}</span>
                      <span className="text-green-600 font-medium">KES {design.cost}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {isGenerating ? (
              <GenerateButton 
                onGenerate={() => {}}
                isGenerating={true}
                progress={generationProgress}
              />
            ) : (
              <PreviewPanel 
                selectedDesign={selectedDesign} 
                userRole={role}
                onExportIFC={handleExportIFC}
                onViewBudget={handleViewBudget}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Design;
