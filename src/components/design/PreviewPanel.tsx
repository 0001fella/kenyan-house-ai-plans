import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  Eye, 
  Download, 
  FileText, 
  Box,
  RotateCcw,
  ZoomIn,
  Settings,
  Play
} from "lucide-react";

interface PreviewPanelProps {
  selectedDesign: any;
  userRole: string;
  onExportIFC?: () => void;
  onViewBudget?: () => void;
}

const PreviewPanel = ({ selectedDesign, userRole, onExportIFC, onViewBudget }: PreviewPanelProps) => {
  const [activeView, setActiveView] = useState("2d");

  if (!selectedDesign) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Building2 className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>Generate a design to see the preview</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5" />
            <span>{selectedDesign.name}</span>
          </CardTitle>
          <div className="flex space-x-2">
            {(userRole === "Engineer" || userRole === "Contractor") && (
              <Button variant="outline" size="sm" onClick={onExportIFC}>
                <Download className="h-4 w-4 mr-2" />
                Export IFC
              </Button>
            )}
            <Button size="sm" onClick={onViewBudget}>
              <FileText className="h-4 w-4 mr-2" />
              View Budget
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="2d">2D Plan</TabsTrigger>
            <TabsTrigger value="3d">3D View</TabsTrigger>
            <TabsTrigger value="bim">BIM Model</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
          </TabsList>
          
          <TabsContent value="2d" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Badge variant="outline">Floor Plan</Badge>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {selectedDesign.area}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative">
                <div className="absolute inset-4 border-2 border-gray-400 rounded">
                  <div className="grid grid-cols-3 h-full">
                    {/* Living Room */}
                    <div className="border-r border-gray-400 p-2 flex items-center justify-center">
                      <span className="text-xs text-gray-600 transform rotate-0">Living Room</span>
                    </div>
                    {/* Kitchen */}
                    <div className="border-r border-gray-400 p-2 flex items-center justify-center">
                      <span className="text-xs text-gray-600">Kitchen</span>
                    </div>
                    {/* Bedroom 1 */}
                    <div className="p-2 flex items-center justify-center">
                      <span className="text-xs text-gray-600">Bedroom 1</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 h-full border-t border-gray-400">
                    {/* Bedroom 2 */}
                    <div className="border-r border-gray-400 p-2 flex items-center justify-center">
                      <span className="text-xs text-gray-600">Bedroom 2</span>
                    </div>
                    {/* Bathroom */}
                    <div className="border-r border-gray-400 p-2 flex items-center justify-center">
                      <span className="text-xs text-gray-600">Bathroom</span>
                    </div>
                    {/* Bedroom 3 */}
                    <div className="p-2 flex items-center justify-center">
                      <span className="text-xs text-gray-600">Bedroom 3</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="3d" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-purple-50 text-purple-700">
                  Interactive 3D Model
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Walkthrough
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <Box className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <p className="text-blue-700 font-medium">3D Visualization</p>
                  <p className="text-sm text-blue-600 mt-2 mb-4">
                    {userRole === "Homeowner" ? "Upgrade to Pro to unlock 3D models" : "3D Model Ready"}
                  </p>
                  {userRole === "Homeowner" && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Upgrade Now
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="bim" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-orange-50 text-orange-700">
                  BIM Model (IFC Format)
                </Badge>
                <div className="flex space-x-2">
                  {(userRole === "Engineer" || userRole === "Contractor") && (
                    <Button variant="outline" size="sm" onClick={onExportIFC}>
                      <Download className="h-4 w-4 mr-2" />
                      Export IFC
                    </Button>
                  )}
                </div>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-lg h-80 flex items-center justify-center">
                <div className="text-center">
                  <Building2 className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <p className="text-orange-700 font-medium">BIM Model Viewer</p>
                  <p className="text-sm text-orange-600 mt-2">
                    {userRole === "Engineer" ? "Full BIM capabilities available" : 
                     userRole === "Contractor" ? "BIM viewing and export available" : 
                     "Engineer access required for BIM features"}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="schedule" className="mt-6">
            <div className="space-y-4">
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Construction Schedule
              </Badge>
              <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-blue-500">
                    <span className="text-sm">Foundation & Excavation</span>
                    <span className="text-xs text-gray-500">Week 1-2</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-yellow-500">
                    <span className="text-sm">Concrete & Steel Work</span>
                    <span className="text-xs text-gray-500">Week 3-5</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-orange-500">
                    <span className="text-sm">Walling & Roofing</span>
                    <span className="text-xs text-gray-500">Week 6-8</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-purple-500">
                    <span className="text-sm">Electrical & Plumbing</span>
                    <span className="text-xs text-gray-500">Week 9-10</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded border-l-4 border-green-500">
                    <span className="text-sm">Finishing & Paint</span>
                    <span className="text-xs text-gray-500">Week 11-12</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;
