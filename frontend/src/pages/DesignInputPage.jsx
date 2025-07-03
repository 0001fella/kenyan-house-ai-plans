
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import BudgetInput from '../components/inputs/BudgetInput';
import LocationInput from '../components/inputs/LocationInput';
import SketchUpload from '../components/inputs/SketchUpload';
import { Building2, ArrowRight, ArrowLeft } from 'lucide-react';

const DesignInputPage = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    name: '',
    budget: null,
    location: null,
    sketches: [],
    requirements: {
      bedrooms: 3,
      bathrooms: 2,
      floors: 1,
      buildingType: 'bungalow',
      style: 'modern'
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleBudgetChange = (budgetData) => {
    setProjectData(prev => ({
      ...prev,
      budget: budgetData
    }));
  };

  const handleLocationChange = (locationData) => {
    setProjectData(prev => ({
      ...prev,
      location: locationData
    }));
  };

  const handleSketchUpload = (sketches) => {
    setProjectData(prev => ({
      ...prev,
      sketches
    }));
  };

  const handleRequirementsChange = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      requirements: {
        ...prev.requirements,
        [field]: value
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to generator page with project data
      navigate('/generator', { state: { projectData } });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return projectData.name.length > 0;
      case 2:
        return projectData.budget !== null;
      case 3:
        return projectData.location !== null;
      case 4:
        return true; // Requirements are optional
      default:
        return false;
    }
  };

  const buildingTypes = [
    { id: 'bungalow', label: 'Bungalow', description: 'Single-story family home' },
    { id: 'maisonette', label: 'Maisonette', description: 'Two-story family home' },
    { id: 'apartment', label: 'Apartment Block', description: 'Multi-unit residential' },
    { id: 'commercial', label: 'Commercial', description: 'Office or retail space' }
  ];

  const styles = [
    { id: 'modern', label: 'Modern', description: 'Clean lines, minimal design' },
    { id: 'traditional', label: 'Traditional', description: 'Classic Kenyan architecture' },
    { id: 'contemporary', label: 'Contemporary', description: 'Modern with traditional elements' },
    { id: 'minimalist', label: 'Minimalist', description: 'Simple, functional design' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">JM Structural Solutions</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Project Name */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectData.name}
                    onChange={(e) => setProjectData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border rounded-md"
                    placeholder="e.g., My Dream Home, Office Building"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Project Description (Optional)
                  </label>
                  <textarea
                    value={projectData.description || ''}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border rounded-md h-24"
                    placeholder="Brief description of your project requirements..."
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Budget */}
          {currentStep === 2 && (
            <BudgetInput 
              onBudgetChange={handleBudgetChange}
              initialBudget={projectData.budget?.amount || 0}
            />
          )}

          {/* Step 3: Location */}
          {currentStep === 3 && (
            <LocationInput 
              onLocationChange={handleLocationChange}
              initialLocation={projectData.location?.address || ''}
            />
          )}

          {/* Step 4: Requirements & Sketches */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Design Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bedrooms</label>
                      <select
                        value={projectData.requirements.bedrooms}
                        onChange={(e) => handleRequirementsChange('bedrooms', parseInt(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} Bedroom{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Bathrooms</label>
                      <select
                        value={projectData.requirements.bathrooms}
                        onChange={(e) => handleRequirementsChange('bathrooms', parseInt(e.target.value))}
                        className="w-full p-2 border rounded-md"
                      >
                        {[1, 2, 3, 4].map(num => (
                          <option key={num} value={num}>{num} Bathroom{num > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Building Type</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {buildingTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            projectData.requirements.buildingType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleRequirementsChange('buildingType', type.id)}
                        >
                          <div className="font-medium">{type.label}</div>
                          <div className="text-sm text-gray-600">{type.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Architectural Style</label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {styles.map((style) => (
                        <div
                          key={style.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            projectData.requirements.style === style.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleRequirementsChange('style', style.id)}
                        >
                          <div className="font-medium">{style.label}</div>
                          <div className="text-sm text-gray-600">{style.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <SketchUpload 
                onSketchUpload={handleSketchUpload}
                maxFiles={5}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
            >
              {currentStep === totalSteps ? 'Generate Design' : 'Next'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignInputPage;
