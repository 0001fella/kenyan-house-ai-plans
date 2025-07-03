
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { MapPin, Navigation } from 'lucide-react';

const LocationInput = ({ onLocationChange, initialLocation = '' }) => {
  const [location, setLocation] = useState(initialLocation);
  const [selectedCounty, setSelectedCounty] = useState('');

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Nakuru', 'Kisumu', 'Eldoret', 'Thika',
    'Malindi', 'Nyeri', 'Meru', 'Embu', 'Machakos', 'Kitui',
    'Garissa', 'Isiolo', 'Marsabit', 'Mandera', 'Wajir', 'Turkana'
  ];

  const handleLocationChange = (value) => {
    setLocation(value);
    onLocationChange({
      address: value,
      county: selectedCounty,
      coordinates: null // Would be populated by geocoding service
    });
  };

  const handleCountyChange = (county) => {
    setSelectedCounty(county);
    onLocationChange({
      address: location,
      county: county,
      coordinates: null
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Project Location</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">County</label>
          <select 
            value={selectedCounty}
            onChange={(e) => handleCountyChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select County</option>
            {kenyanCounties.map((county) => (
              <option key={county} value={county}>
                {county}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Specific Address/Area
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => handleLocationChange(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter plot location or nearest landmark"
          />
        </div>

        <button className="w-full flex items-center justify-center space-x-2 p-2 border border-blue-500 text-blue-600 rounded-md hover:bg-blue-50">
          <Navigation className="h-4 w-4" />
          <span>Use Current Location</span>
        </button>

        <div className="bg-green-50 p-3 rounded-md">
          <p className="text-sm text-green-800">
            <strong>Location affects:</strong> Material costs, transport fees, 
            labor rates, and local building requirements.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationInput;
