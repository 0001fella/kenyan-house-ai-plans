
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Wand2, Zap, Brain, Cog } from "lucide-react";

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  progress: number;
}

const GenerateButton = ({ onGenerate, isGenerating, progress }: GenerateButtonProps) => {
  const getProgressMessage = () => {
    if (progress < 20) return "Initializing AI models...";
    if (progress < 40) return "Analyzing parameters...";
    if (progress < 60) return "Generating floor plans...";
    if (progress < 80) return "Optimizing design...";
    if (progress < 95) return "Calculating costs...";
    return "Finalizing design...";
  };

  if (isGenerating) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Wand2 className="h-6 w-6 text-blue-600 animate-spin" />
              <span className="text-lg font-medium">AI Design in Progress</span>
            </div>
            
            <Progress value={progress} className="h-3" />
            
            <p className="text-center text-gray-600">
              {getProgressMessage()}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <Brain className={`h-8 w-8 mx-auto mb-2 ${progress > 20 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className="text-xs text-gray-600">AI Analysis</span>
              </div>
              <div className="text-center">
                <Zap className={`h-8 w-8 mx-auto mb-2 ${progress > 50 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className="text-xs text-gray-600">Design Gen</span>
              </div>
              <div className="text-center">
                <Cog className={`h-8 w-8 mx-auto mb-2 ${progress > 80 ? 'text-green-500' : 'text-gray-300'}`} />
                <span className="text-xs text-gray-600">Optimization</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button onClick={onGenerate} size="lg" className="w-full">
      <Wand2 className="h-5 w-5 mr-2" />
      Generate AI Design
    </Button>
  );
};

export default GenerateButton;
