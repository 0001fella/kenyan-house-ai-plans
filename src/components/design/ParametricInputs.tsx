
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, Calculator, Users } from "lucide-react";

interface ParametricInputsProps {
  onGenerate: (params: any) => void;
  userRole: string;
}

const ParametricInputs = ({ onGenerate, userRole }: ParametricInputsProps) => {
  const [params, setParams] = useState({
    bedrooms: 3,
    bathrooms: 2,
    plotSize: [50],
    budget: [2500000],
    location: "",
    buildingType: "",
    style: "",
    floors: 1,
    specialRequirements: ""
  });

  const handleGenerate = () => {
    onGenerate({
      ...params,
      plotSize: params.plotSize[0],
      budget: params.budget[0]
    });
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Design Parameters</span>
          </CardTitle>
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {userRole}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Basic Requirements */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Bedrooms</Label>
            <Select value={params.bedrooms.toString()} onValueChange={(value) => setParams({...params, bedrooms: parseInt(value)})}>
              <SelectTrigger>
                <SelectValue />
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
            <Label>Bathrooms</Label>
            <Select value={params.bathrooms.toString()} onValueChange={(value) => setParams({...params, bathrooms: parseInt(value)})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Bathroom</SelectItem>
                <SelectItem value="2">2 Bathrooms</SelectItem>
                <SelectItem value="3">3 Bathrooms</SelectItem>
                <SelectItem value="4">4+ Bathrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Plot Size Slider */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Plot Size: {params.plotSize[0]} m²</span>
          </Label>
          <Slider
            value={params.plotSize}
            onValueChange={(value) => setParams({...params, plotSize: value})}
            max={200}
            min={20}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>20 m²</span>
            <span>200 m²</span>
          </div>
        </div>

        {/* Budget Slider */}
        <div className="space-y-3">
          <Label className="flex items-center space-x-2">
            <Calculator className="h-4 w-4" />
            <span>Budget: KES {params.budget[0].toLocaleString()}</span>
          </Label>
          <Slider
            value={params.budget}
            onValueChange={(value) => setParams({...params, budget: value})}
            max={10000000}
            min={500000}
            step={50000}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>KES 500K</span>
            <span>KES 10M</span>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label>Location</Label>
          <Select value={params.location} onValueChange={(value) => setParams({...params, location: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nairobi">Nairobi</SelectItem>
              <SelectItem value="mombasa">Mombasa</SelectItem>
              <SelectItem value="nakuru">Nakuru</SelectItem>
              <SelectItem value="eldoret">Eldoret</SelectItem>
              <SelectItem value="kisumu">Kisumu</SelectItem>
              <SelectItem value="thika">Thika</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Building Type */}
        <div className="space-y-2">
          <Label>Building Type</Label>
          <Select value={params.buildingType} onValueChange={(value) => setParams({...params, buildingType: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bungalow">Bungalow</SelectItem>
              <SelectItem value="maisonette">Maisonette</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Style */}
        <div className="space-y-2">
          <Label>Architectural Style</Label>
          <Select value={params.style} onValueChange={(value) => setParams({...params, style: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="modern">Modern</SelectItem>
              <SelectItem value="traditional">Traditional Kenyan</SelectItem>
              <SelectItem value="contemporary">Contemporary</SelectItem>
              <SelectItem value="minimalist">Minimalist</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Floors - Only for contractors and engineers */}
        {(userRole === "Contractor" || userRole === "Engineer") && (
          <div className="space-y-2">
            <Label>Number of Floors</Label>
            <Select value={params.floors.toString()} onValueChange={(value) => setParams({...params, floors: parseInt(value)})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Single Story</SelectItem>
                <SelectItem value="2">Two Story</SelectItem>
                <SelectItem value="3">Three Story</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Special Requirements - Only for engineers */}
        {userRole === "Engineer" && (
          <div className="space-y-2">
            <Label>Special Requirements</Label>
            <Input
              placeholder="e.g., Seismic considerations, special foundations..."
              value={params.specialRequirements}
              onChange={(e) => setParams({...params, specialRequirements: e.target.value})}
            />
          </div>
        )}

        <Button onClick={handleGenerate} className="w-full" size="lg">
          <Users className="h-4 w-4 mr-2" />
          Generate AI Design
        </Button>
      </CardContent>
    </Card>
  );
};

export default ParametricInputs;
