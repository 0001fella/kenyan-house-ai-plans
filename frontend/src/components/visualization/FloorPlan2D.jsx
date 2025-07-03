
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { 
  Home, 
  ZoomIn, 
  ZoomOut, 
  Download, 
  Edit,
  Layers,
  Grid3X3,
  Ruler
} from 'lucide-react';

const FloorPlan2D = ({ planData, onEdit, userRole = 'Homeowner' }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [showDimensions, setShowDimensions] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    { id: 1, name: 'Living Room', x: 10, y: 10, width: 120, height: 80, color: 'bg-blue-100' },
    { id: 2, name: 'Kitchen', x: 140, y: 10, width: 80, height: 80, color: 'bg-green-100' },
    { id: 3, name: 'Master Bedroom', x: 230, y: 10, width: 100, height: 80, color: 'bg-purple-100' },
    { id: 4, name: 'Bedroom 2', x: 10, y: 100, width: 80, height: 70, color: 'bg-yellow-100' },
    { id: 5, name: 'Bathroom', x: 100, y: 100, width: 60, height: 70, color: 'bg-red-100' },
    { id: 6, name: 'Bathroom 2', x: 170, y: 100, width: 50, height: 40, color: 'bg-red-100' }
  ];

  const handleZoom = (direction) => {
    if (direction === 'in' && zoomLevel < 200) {
      setZoomLevel(zoomLevel + 25);
    } else if (direction === 'out' && zoomLevel > 50) {
      setZoomLevel(zoomLevel - 25);
    }
  };

  const handleRoomClick = (room) => {
    setSelectedRoom(selectedRoom?.id === room.id ? null : room);
  };

  const canEdit = userRole === 'Engineer' || userRole === 'Contractor';

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Home className="h-5 w-5" />
            <span>Floor Plan - 2D View</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={showGrid ? "default" : "outline"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
            >
              <Grid3X3 className="h-4 w-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={showDimensions ? "default" : "outline"}
              size="sm"
              onClick={() => setShowDimensions(!showDimensions)}
            >
              <Ruler className="h-4 w-4 mr-2" />
              Dimensions
            </Button>
            {canEdit && (
              <Button variant="outline" size="sm" onClick={onEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span>Scale: 1:100</span>
          <span>Total Area: 120 m²</span>
          <span>Zoom: {zoomLevel}%</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Zoom Controls */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleZoom('out')}
                disabled={zoomLevel <= 50}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleZoom('in')}
                disabled={zoomLevel >= 200}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-4 w-4" />
              <span className="text-sm">Layers</span>
            </div>
          </div>

          {/* Floor Plan Canvas */}
          <div className="relative bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
            <div 
              className="relative bg-gray-50"
              style={{ 
                width: '400px', 
                height: '300px',
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: 'top left'
              }}
            >
              {/* Grid Background */}
              {showGrid && (
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }}
                />
              )}

              {/* Outer walls */}
              <div className="absolute inset-0 border-4 border-gray-800"></div>

              {/* Rooms */}
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className={`absolute border-2 border-gray-600 cursor-pointer transition-all ${
                    room.color
                  } ${
                    selectedRoom?.id === room.id 
                      ? 'ring-2 ring-blue-500 ring-opacity-50' 
                      : 'hover:ring-1 hover:ring-gray-400'
                  }`}
                  style={{
                    left: `${room.x}px`,
                    top: `${room.y}px`,
                    width: `${room.width}px`,
                    height: `${room.height}px`
                  }}
                  onClick={() => handleRoomClick(room)}
                >
                  <div className="flex items-center justify-center h-full">
                    <span className="text-xs font-medium text-center px-1">
                      {room.name}
                    </span>
                  </div>
                  
                  {/* Dimensions */}
                  {showDimensions && (
                    <>
                      <div className="absolute -top-5 left-0 text-xs text-gray-600">
                        {(room.width / 10).toFixed(1)}m
                      </div>
                      <div className="absolute top-0 -left-8 text-xs text-gray-600 transform -rotate-90 origin-left">
                        {(room.height / 10).toFixed(1)}m
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Doors (simple lines) */}
              <div className="absolute top-[90px] left-[130px] w-1 h-8 bg-brown-600"></div>
              <div className="absolute top-[90px] left-[220px] w-1 h-8 bg-brown-600"></div>
            </div>
          </div>

          {/* Room Details */}
          {selectedRoom && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900">{selectedRoom.name}</h4>
              <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                <div>
                  <span className="text-blue-700">Dimensions:</span>
                  <span className="ml-1">{(selectedRoom.width / 10).toFixed(1)}m × {(selectedRoom.height / 10).toFixed(1)}m</span>
                </div>
                <div>
                  <span className="text-blue-700">Area:</span>
                  <span className="ml-1">{((selectedRoom.width * selectedRoom.height) / 100).toFixed(1)} m²</span>
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-gray-800"></div>
              <span>Walls</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-brown-600"></div>
              <span>Doors</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-400"></div>
              <span>Windows</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FloorPlan2D;
