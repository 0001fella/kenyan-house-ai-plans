
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Building2, 
  ArrowLeft,
  Download,
  Calculator,
  PieChart,
  FileText,
  Edit,
  Save,
  AlertCircle
} from "lucide-react";

const Budget = () => {
  const location = useLocation();
  const [projectData] = useState(location.state?.projectData || {});
  const [selectedDesign] = useState(location.state?.selectedDesign || {});
  const [editMode, setEditMode] = useState(false);
  const [materialCosts, setMaterialCosts] = useState({
    concrete: 45000,
    steel: 85000,
    blocks: 35000,
    roofing: 120000,
    doors_windows: 95000,
    flooring: 75000,
    plumbing: 65000,
    electrical: 55000,
    painting: 45000,
    labor: 180000
  });

  const totalCost = Object.values(materialCosts).reduce((sum, cost) => sum + cost, 0);

  const handleCostChange = (category: string, value: string) => {
    setMaterialCosts(prev => ({
      ...prev,
      [category]: parseFloat(value) || 0
    }));
  };

  const bomItems = [
    { category: "Concrete & Foundation", items: [
      { name: "Portland Cement (50kg bags)", quantity: 45, unit: "bags", rate: 800, total: 36000 },
      { name: "Hardcore/Ballast (Tonnes)", quantity: 12, unit: "tonnes", rate: 2500, total: 30000 },
      { name: "Sand (Tonnes)", quantity: 8, unit: "tonnes", rate: 1800, total: 14400 }
    ]},
    { category: "Masonry", items: [
      { name: "Concrete Blocks (9\")", quantity: 280, unit: "pieces", rate: 85, total: 23800 },
      { name: "Mortar Sand", quantity: 4, unit: "tonnes", rate: 1800, total: 7200 },
      { name: "Cement for Mortar", quantity: 15, unit: "bags", rate: 800, total: 12000 }
    ]},
    { category: "Roofing", items: [
      { name: "Iron Sheets (Gauge 28)", quantity: 35, unit: "pieces", rate: 1200, total: 42000 },
      { name: "Timber (4x2)", quantity: 25, unit: "pieces", rate: 450, total: 11250 },
      { name: "Nails & Fasteners", quantity: 1, unit: "lot", rate: 5500, total: 5500 }
    ]}
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/design" className="flex items-center space-x-2">
            <ArrowLeft className="h-5 w-5" />
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JM Structural Solutions</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {selectedDesign.name || "Design Budget"}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setEditMode(!editMode)}>
              {editMode ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {editMode ? "Save Changes" : "Edit Costs"}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cost Estimation & Budget</h1>
          <p className="text-gray-600">Detailed breakdown based on current Kenyan market rates</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cost Summary */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Cost Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Total Estimated Cost</p>
                    <p className="text-3xl font-bold text-blue-600">
                      KES {totalCost.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {Object.entries(materialCosts).map(([category, cost]) => (
                      <div key={category} className="flex justify-between text-sm">
                        <span className="capitalize">{category.replace('_', ' & ')}</span>
                        <span className="font-medium">KES {cost.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Budget vs Target</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Target Budget:</span>
                    <span className="font-medium">KES {parseInt(projectData.budget || '0').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Estimated Cost:</span>
                    <span className="font-medium">KES {totalCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Difference:</span>
                    <span className={totalCost > parseInt(projectData.budget || '0') ? 'text-red-600' : 'text-green-600'}>
                      {totalCost > parseInt(projectData.budget || '0') ? '+' : ''}
                      KES {Math.abs(totalCost - parseInt(projectData.budget || '0')).toLocaleString()}
                    </span>
                  </div>
                  
                  {totalCost > parseInt(projectData.budget || '0') && (
                    <div className="bg-yellow-50 p-3 rounded-lg flex items-start space-x-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="text-xs">
                        <p className="font-medium text-yellow-800">Over Budget</p>
                        <p className="text-yellow-700">Consider optimizing materials or design</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col space-y-2">
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Download PDF Quote
              </Button>
              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate BoQ
              </Button>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="categories" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="categories">Cost Categories</TabsTrigger>
                <TabsTrigger value="materials">Bill of Materials</TabsTrigger>
                <TabsTrigger value="schedule">Payment Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="categories" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown by Category</CardTitle>
                    <CardDescription>
                      Adjust individual category costs based on your specific requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {Object.entries(materialCosts).map(([category, cost]) => (
                        <div key={category} className="space-y-2">
                          <Label className="capitalize">
                            {category.replace('_', ' & ')} (KES)
                          </Label>
                          {editMode ? (
                            <Input
                              type="number"
                              value={cost}
                              onChange={(e) => handleCostChange(category, e.target.value)}
                              className="w-full"
                            />
                          ) : (
                            <div className="p-2 bg-gray-50 rounded border">
                              {cost.toLocaleString()}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="materials" className="mt-6">
                <div className="space-y-6">
                  {bomItems.map((section, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{section.category}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left p-2">Description</th>
                                <th className="text-right p-2">Qty</th>
                                <th className="text-left p-2">Unit</th>
                                <th className="text-right p-2">Rate (KES)</th>
                                <th className="text-right p-2">Total (KES)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.items.map((item, itemIndex) => (
                                <tr key={itemIndex} className="border-b last:border-b-0">
                                  <td className="p-2">{item.name}</td>
                                  <td className="p-2 text-right">{item.quantity}</td>
                                  <td className="p-2">{item.unit}</td>
                                  <td className="p-2 text-right">{item.rate.toLocaleString()}</td>
                                  <td className="p-2 text-right font-medium">{item.total.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="schedule" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Suggested Payment Schedule</CardTitle>
                    <CardDescription>
                      Milestone-based payment plan for construction phases
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { phase: "Foundation & Site Preparation", percentage: 25, amount: totalCost * 0.25 },
                        { phase: "Walling & Roofing", percentage: 35, amount: totalCost * 0.35 },
                        { phase: "Finishes & Services", percentage: 30, amount: totalCost * 0.30 },
                        { phase: "Final Completion", percentage: 10, amount: totalCost * 0.10 }
                      ].map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{milestone.phase}</p>
                            <p className="text-sm text-gray-600">{milestone.percentage}% of total cost</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">KES {milestone.amount.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
