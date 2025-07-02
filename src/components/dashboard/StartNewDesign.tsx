
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Calculator, 
  MapPin, 
  Home, 
  Users,
  ArrowRight,
  Sparkles,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StartNewDesign = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState({
    name: "",
    budget: "",
    landSize: "",
    location: "",
    bedrooms: "",
    bathrooms: "",
    floors: "",
    style: "",
    requirements: ""
  });

  const kenyanLocations = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", 
    "Machakos", "Meru", "Nyeri", "Kericho", "Embu", "Migori", "Homa Bay", "Kakamega"
  ];

  const houseStyles = [
    "Modern Contemporary", "Traditional Kenyan", "Bungalow", "Maisonette", 
    "Villa", "Townhouse", "Colonial", "Minimalist"
  ];

  const progress = (currentStep / 3) * 100;

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGenerateDesign = () => {
    // This will navigate to the design screen with the project data
    navigate("/design", { state: { projectData } });
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          <span className="text-sm text-gray-600">Step {currentStep} of 3</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {currentStep === 1 && <><Building2 className="h-5 w-5 text-blue-600" /> <span>Project Details</span></>}
                {currentStep === 2 && <><Home className="h-5 w-5 text-blue-600" /> <span>Design Preferences</span></>}
                {currentStep === 3 && <><Sparkles className="h-5 w-5 text-blue-600" /> <span>Special Requirements</span></>}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Let's start with basic project information"}
                {currentStep === 2 && "Tell us about your ideal home design"}
                {currentStep === 3 && "Any special requirements or preferences?"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 1 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., My Dream Family Home"
                      value={projectData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Construction Budget (KES)</Label>
                      <Input
                        id="budget"
                        placeholder="e.g., 2,500,000"
                        value={projectData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                      />
                      <p className="text-sm text-gray-500">This helps us recommend suitable designs</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="landSize">Land Size (Square Meters)</Label>
                      <Input
                        id="landSize"
                        placeholder="e.g., 1200"
                        value={projectData.landSize}
                        onChange={(e) => handleInputChange("landSize", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select value={projectData.location} onValueChange={(value) => handleInputChange("location", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your location" />
                      </SelectTrigger>
                      <SelectContent>
                        {kenyanLocations.map((location) => (
                          <SelectItem key={location} value={location}>
                            {location}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">Location affects material costs and building regulations</p>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select value={projectData.bedrooms} onValueChange={(value) => handleInputChange("bedrooms", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bedroom</SelectItem>
                          <SelectItem value="2">2 Bedrooms</SelectItem>
                          <SelectItem value="3">3 Bedrooms</SelectItem>
                          <SelectItem value="4">4 Bedrooms</SelectItem>
                          <SelectItem value="5">5+ Bedrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select value={projectData.bathrooms} onValueChange={(value) => handleInputChange("bathrooms", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Bathroom</SelectItem>
                          <SelectItem value="2">2 Bathrooms</SelectItem>
                          <SelectItem value="3">3 Bathrooms</SelectItem>
                          <SelectItem value="4">4+ Bathrooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="floors">Number of Floors</Label>
                      <Select value={projectData.floors} onValueChange={(value) => handleInputChange("floors", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Single Story</SelectItem>
                          <SelectItem value="2">Two Stories</SelectItem>
                          <SelectItem value="3">Three Stories</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="style">Architectural Style</Label>
                    <Select value={projectData.style} onValueChange={(value) => handleInputChange("style", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose your preferred style" />
                      </SelectTrigger>
                      <SelectContent>
                        {houseStyles.map((style) => (
                          <SelectItem key={style} value={style}>
                            {style}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="requirements">Special Requirements</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Tell us about any special requirements like wheelchair accessibility, home office, garage, solar panels, water storage, etc."
                      value={projectData.requirements}
                      onChange={(e) => handleInputChange("requirements", e.target.value)}
                      rows={6}
                    />
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">What happens next?</h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Our AI will generate multiple design options for you</li>
                      <li>• You'll receive detailed cost estimates based on current Kenyan market rates</li>
                      <li>• Download professional 2D plans and Bill of Quantities</li>
                      <li>• View your designs in 3D (Pro tier)</li>
                    </ul>
                  </div>
                </>
              )}

              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentStep === 1}
                >
                  Back
                </Button>
                {currentStep === 3 ? (
                  <Button 
                    onClick={handleGenerateDesign}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Generate Design
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleNext}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectData.name && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-semibold">{projectData.name}</span>
                </div>
              )}
              {projectData.budget && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-semibold">KES {projectData.budget}</span>
                </div>
              )}
              {projectData.landSize && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Land Size:</span>
                  <span className="font-semibold">{projectData.landSize} m²</span>
                </div>
              )}
              {projectData.location && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold">{projectData.location}</span>
                </div>
              )}
              {projectData.bedrooms && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Bedrooms:</span>
                  <span className="font-semibold">{projectData.bedrooms}</span>
                </div>
              )}
              {projectData.style && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-semibold">{projectData.style}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* What You'll Get */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
                What You'll Get
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Multiple 2D design options</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calculator className="h-5 w-5 text-green-600" />
                <span className="text-sm">Accurate cost estimates</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-orange-600" />
                <span className="text-sm">Bill of Quantities</span>
              </div>
              <Separator />
              <div className="text-center">
                <Badge className="bg-yellow-100 text-yellow-800">
                  Upgrade to Pro for 3D models
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Need help?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Our team of Kenyan construction experts is here to help you every step of the way.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartNewDesign;
