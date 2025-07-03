
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuotationGenerator from '../components/reports/QuotationGenerator';
import { Button } from '../components/ui/Button';
import { useProject } from '../contexts/ProjectContext';
import { Building2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const QuotationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { generateQuotation, quotation, isLoading } = useProject();
  
  const [projectData] = useState(location.state?.projectData || {});
  const [selectedDesign] = useState(location.state?.selectedDesign || null);

  useEffect(() => {
    if (!selectedDesign) {
      navigate('/design-input');
      return;
    }

    // Auto-generate quotation on page load
    handleGenerateQuotation();
  }, [selectedDesign]);

  const handleGenerateQuotation = async () => {
    if (!selectedDesign) return;

    try {
      await generateQuotation(selectedDesign);
      toast.success('Quotation generated successfully!');
    } catch (error) {
      toast.error('Failed to generate quotation');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Generating quotation...</p>
        </div>
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
                <h1 className="text-xl font-bold text-gray-900">Project Quotation</h1>
                <p className="text-sm text-gray-600">{projectData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {quotation ? (
          <QuotationGenerator 
            projectData={projectData}
            userRole="Contractor"
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No quotation data available</p>
            <Button onClick={handleGenerateQuotation}>
              Generate Quotation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationPage;
