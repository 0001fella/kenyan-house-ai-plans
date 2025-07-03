
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Box, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Play, 
  Pause,
  Settings,
  Download,
  Maximize
} from 'lucide-react';

const DesignViewer3D = ({ designData, userRole = 'Homeowner' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('perspective');
  const [showGrid, setShowGrid] = useState(true);
  const viewerRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const viewModes = [
    { id: 'perspective', label: 'Perspective' },
    { id: 'top', label: 'Top View' },
    { id: 'front', label: 'Front View' },
    { id: 'side', label: 'Side View' }
  ];

  const isPremiumUser = userRole !== 'Homeowner';

  return (
    <Card className="w-full h-96">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Box className="h-5 w-5" />
            <span>3D Design Viewer</span>
          </CardTitle>
          <div className="flex space-x-2">
            {isPremiumUser && (
              <>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Maximize className="h-4 w-4" />
                </Button>
              </>
            )}
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {!isPremiumUser ? (
          <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Box className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                3D Visualization
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Upgrade to access interactive 3D models
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Upgrade to Pro
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 3D Viewer Area */}
            <div 
              ref={viewerRef}
              className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden"
            >
              {/* Simulated 3D Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform perspective-1000 rotate-y-12 rotate-x-6">
                  <div className="w-32 h-20 bg-blue-200 border border-blue-400 relative">
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-300 border border-red-400"></div>
                    <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-200 border border-gray-400 grid grid-cols-3 gap-1 p-1">
                      <div className="bg-white border"></div>
                      <div className="bg-white border"></div>
                      <div className="bg-white border"></div>
                      <div className="bg-white border"></div>
                      <div className="bg-white border"></div>
                      <div className="bg-white border"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {isPlaying && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs">
                  RECORDING
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 mr-2" />
                  ) : (
                    <Play className="h-4 w-4 mr-2" />
                  )}
                  {isPlaying ? 'Pause' : 'Walkthrough'}
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset View
                </Button>
              </div>

              <div className="flex space-x-1">
                <Button variant="outline" size="sm">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* View Mode Selector */}
            <div className="flex space-x-1">
              {viewModes.map((mode) => (
                <Button
                  key={mode.id}
                  variant={viewMode === mode.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewModeChange(mode.id)}
                  className="text-xs"
                >
                  {mode.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DesignViewer3D;
