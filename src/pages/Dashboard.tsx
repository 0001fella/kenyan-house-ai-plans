
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, 
  Plus,
  FileText, 
  Calculator, 
  Eye,
  Download,
  Clock,
  Users,
  Settings
} from "lucide-react";
import { Link } from "react-router-dom";
import ProjectOverview from "@/components/dashboard/ProjectOverview";
import StartNewDesign from "@/components/dashboard/StartNewDesign";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [projects] = useState([
    {
      id: 1,
      name: "Modern 3BR Bungalow",
      status: "In Progress",
      progress: 75,
      budget: "2,500,000",
      location: "Nairobi",
      created: "2024-06-15"
    },
    {
      id: 2,
      name: "Family Maisonette",
      status: "Planning",
      progress: 25,
      budget: "4,200,000", 
      location: "Nakuru",
      created: "2024-06-20"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JM Structural Solutions</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Free Tier
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Account
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "overview" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Project Overview
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "new" 
                ? "bg-white text-blue-600 shadow-sm" 
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            New Project
          </button>
        </div>

        {/* Content */}
        {activeTab === "overview" && <ProjectOverview projects={projects} />}
        {activeTab === "new" && <StartNewDesign />}
      </div>
    </div>
  );
};

export default Dashboard;
