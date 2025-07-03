
"""
AI Model Inference Engine for Design Generation
Integrates with Django backend to generate optimized building designs
"""

import torch
import torch.nn as nn
import json
import numpy as np
from pathlib import Path
from typing import Dict, List, Any, Optional
import logging

logger = logging.getLogger(__name__)

class DesignGeneratorModel(nn.Module):
    """
    Neural network model for generating building designs
    Based on GAN architecture with Kenyan building code constraints
    """
    
    def __init__(self, input_dim=10, hidden_dim=512, output_dim=1024):
        super().__init__()
        
        # Encoder for input parameters
        self.encoder = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.ReLU(),
            nn.BatchNorm1d(hidden_dim),
            nn.Dropout(0.2),
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.ReLU(),
            nn.BatchNorm1d(hidden_dim // 2),
        )
        
        # Decoder for design generation
        self.decoder = nn.Sequential(
            nn.Linear(hidden_dim // 2, hidden_dim),
            nn.ReLU(),
            nn.BatchNorm1d(hidden_dim),
            nn.Linear(hidden_dim, output_dim),
            nn.Tanh()
        )
        
        # Room layout generator
        self.room_generator = nn.Sequential(
            nn.Linear(hidden_dim // 2, 256),
            nn.ReLU(),
            nn.Linear(256, 128),
            nn.ReLU(),
            nn.Linear(128, 64),  # Room coordinates and dimensions
        )
        
    def forward(self, x):
        encoded = self.encoder(x)
        layout = self.decoder(encoded)
        rooms = self.room_generator(encoded)
        return layout, rooms

class KenyanBuildingCodeValidator:
    """
    Validates generated designs against Kenyan building codes
    """
    
    def __init__(self):
        self.min_room_sizes = {
            'bedroom': 9.0,  # m²
            'living_room': 12.0,
            'kitchen': 6.0,
            'bathroom': 3.0,
            'dining': 8.0
        }
        
        self.min_ceiling_height = 2.4  # meters
        self.max_building_coverage = 0.6  # 60% of plot
        self.min_setbacks = {
            'front': 3.0,  # meters
            'rear': 3.0,
            'side': 1.5
        }
    
    def validate_design(self, design: Dict) -> Dict[str, Any]:
        """Validate design against building codes"""
        violations = []
        warnings = []
        
        # Check room sizes
        for room in design.get('rooms', []):
            room_type = room.get('type', '').lower()
            area = room.get('area', 0)
            
            if room_type in self.min_room_sizes:
                min_area = self.min_room_sizes[room_type]
                if area < min_area:
                    violations.append(f"{room_type} area ({area}m²) below minimum ({min_area}m²)")
        
        # Check building coverage
        plot_area = design.get('plot_area', 0)
        building_area = design.get('building_area', 0)
        
        if plot_area > 0:
            coverage = building_area / plot_area
            if coverage > self.max_building_coverage:
                violations.append(f"Building coverage ({coverage:.1%}) exceeds maximum (60%)")
        
        # Check setbacks
        setbacks = design.get('setbacks', {})
        for side, min_setback in self.min_setbacks.items():
            actual_setback = setbacks.get(side, 0)
            if actual_setback < min_setback:
                violations.append(f"{side} setback ({actual_setback}m) below minimum ({min_setback}m)")
        
        return {
            'is_valid': len(violations) == 0,
            'violations': violations,
            'warnings': warnings,
            'compliance_score': max(0, 100 - len(violations) * 10 - len(warnings) * 5)
        }

class DesignInferenceEngine:
    """
    Main inference engine for design generation
    """
    
    def __init__(self, model_path: str, config_path: str, device: str = 'cpu'):
        self.device = torch.device(device)
        self.validator = KenyanBuildingCodeValidator()
        
        # Load configuration
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        
        # Initialize model
        self.model = DesignGeneratorModel(
            input_dim=self.config['input_dim'],
            hidden_dim=self.config['hidden_dim'],
            output_dim=self.config['output_dim']
        )
        
        # Load trained weights
        if Path(model_path).exists():
            checkpoint = torch.load(model_path, map_location=self.device)
            self.model.load_state_dict(checkpoint['model_state_dict'])
            logger.info(f"Loaded model from {model_path}")
        else:
            logger.warning(f"Model file not found: {model_path}. Using random weights.")
        
        self.model.to(self.device)
        self.model.eval()
    
    def preprocess_requirements(self, requirements: Dict) -> torch.Tensor:
        """Convert user requirements to model input tensor"""
        # Extract and normalize input features
        features = [
            requirements.get('bedrooms', 3) / 6.0,  # Normalize to 0-1
            requirements.get('bathrooms', 2) / 4.0,
            requirements.get('floors', 1) / 3.0,
            requirements.get('budget', 2500000) / 10000000.0,  # KES
            requirements.get('plot_size', 50) / 200.0,  # decimals
            float(requirements.get('location_factor', 1.0)),  # Cost factor by location
            float(requirements.get('style_modern', 1) if requirements.get('style') == 'modern' else 0),
            float(requirements.get('style_traditional', 1) if requirements.get('style') == 'traditional' else 0),
            requirements.get('area_preference', 120) / 300.0,  # m²
            float(requirements.get('has_garage', 0))
        ]
        
        return torch.tensor(features, dtype=torch.float32).unsqueeze(0).to(self.device)
    
    def postprocess_output(self, layout_output: torch.Tensor, rooms_output: torch.Tensor, 
                          requirements: Dict) -> Dict:
        """Convert model output to structured design data"""
        layout = layout_output.cpu().detach().numpy().flatten()
        rooms = rooms_output.cpu().detach().numpy().flatten()
        
        # Generate room layout
        num_bedrooms = requirements.get('bedrooms', 3)
        num_bathrooms = requirements.get('bathrooms', 2)
        
        room_list = []
        idx = 0
        
        # Generate bedrooms
        for i in range(num_bedrooms):
            if idx + 4 <= len(rooms):
                room_list.append({
                    'type': f'bedroom_{i+1}' if i > 0 else 'master_bedroom',
                    'x': float(rooms[idx]) * 20 + 5,
                    'y': float(rooms[idx+1]) * 15 + 5,
                    'width': float(rooms[idx+2]) * 8 + 12,
                    'height': float(rooms[idx+3]) * 6 + 10,
                    'area': (float(rooms[idx+2]) * 8 + 12) * (float(rooms[idx+3]) * 6 + 10)
                })
                idx += 4
        
        # Generate common areas
        common_areas = ['living_room', 'kitchen', 'dining']
        for area in common_areas:
            if idx + 4 <= len(rooms):
                room_list.append({
                    'type': area,
                    'x': float(rooms[idx]) * 20 + 5,
                    'y': float(rooms[idx+1]) * 15 + 5,
                    'width': float(rooms[idx+2]) * 10 + 15,
                    'height': float(rooms[idx+3]) * 8 + 12,
                    'area': (float(rooms[idx+2]) * 10 + 15) * (float(rooms[idx+3]) * 8 + 12)
                })
                idx += 4
        
        # Generate bathrooms
        for i in range(num_bathrooms):
            if idx + 4 <= len(rooms):
                room_list.append({
                    'type': f'bathroom_{i+1}' if i > 0 else 'main_bathroom',
                    'x': float(rooms[idx]) * 20 + 5,
                    'y': float(rooms[idx+1]) * 15 + 5,
                    'width': float(rooms[idx+2]) * 4 + 6,
                    'height': float(rooms[idx+3]) * 4 + 8,
                    'area': (float(rooms[idx+2]) * 4 + 6) * (float(rooms[idx+3]) * 4 + 8)
                })
                idx += 4
        
        # Calculate total building area
        total_area = sum(room['area'] for room in room_list)
        
        design = {
            'id': f'design_{hash(str(layout[:10]))}',
            'name': f"{requirements.get('bedrooms', 3)}BR {requirements.get('style', 'Modern').title()} House",
            'description': f"AI-generated {requirements.get('bedrooms', 3)}-bedroom house design",
            'rooms': room_list,
            'building_area': total_area,
            'plot_area': requirements.get('plot_size', 50) * 100,  # Convert decimals to m²
            'floors': requirements.get('floors', 1),
            'style': requirements.get('style', 'modern'),
            'estimated_cost': self._estimate_cost(total_area, requirements),
            'setbacks': {
                'front': 3.0 + abs(layout[0]) * 2,
                'rear': 3.0 + abs(layout[1]) * 2,
                'side': 1.5 + abs(layout[2]) * 1,
            },
            'features': {
                'garage': requirements.get('has_garage', False),
                'balcony': total_area > 150,
                'study_room': num_bedrooms > 3,
                'store_room': True
            }
        }
        
        return design
    
    def _estimate_cost(self, area: float, requirements: Dict) -> Dict:
        """Estimate construction costs based on area and requirements"""
        # Base costs per m² (KES) - varies by location
        base_cost_per_sqm = {
            'nairobi': 45000,
            'mombasa': 42000,
            'nakuru': 38000,
            'kisumu': 35000,
            'default': 40000
        }
        
        location = requirements.get('location', 'default').lower()
        cost_per_sqm = base_cost_per_sqm.get(location, base_cost_per_sqm['default'])
        
        # Style multipliers
        style_multipliers = {
            'modern': 1.2,
            'contemporary': 1.1,
            'traditional': 1.0,
            'minimalist': 0.9
        }
        
        style = requirements.get('style', 'modern')
        multiplier = style_multipliers.get(style, 1.0)
        
        base_cost = area * cost_per_sqm * multiplier
        
        return {
            'structure': base_cost * 0.35,
            'finishes': base_cost * 0.25,
            'electrical': base_cost * 0.10,
            'plumbing': base_cost * 0.08,
            'roofing': base_cost * 0.12,
            'other': base_cost * 0.10,
            'total': base_cost,
            'currency': 'KES',
            'cost_per_sqm': cost_per_sqm * multiplier
        }
    
    def generate_design(self, requirements: Dict) -> List[Dict]:
        """Generate multiple design options based on requirements"""
        designs = []
        
        # Generate 3 design variations
        for i in range(3):
            # Add some randomness for variation
            varied_requirements = requirements.copy()
            varied_requirements['variation_seed'] = i
            
            # Preprocess input
            input_tensor = self.preprocess_requirements(varied_requirements)
            
            # Add noise for variation
            if i > 0:
                noise = torch.randn_like(input_tensor) * 0.1
                input_tensor = input_tensor + noise
            
            # Generate design
            with torch.no_grad():
                layout_output, rooms_output = self.model(input_tensor)
            
            # Postprocess output
            design = self.postprocess_output(layout_output, rooms_output, varied_requirements)
            
            # Validate against building codes
            validation = self.validator.validate_design(design)
            design['validation'] = validation
            
            # Adjust name for variations
            if i > 0:
                design['name'] += f" - Option {i+1}"
                design['id'] += f"_opt{i+1}"
            
            designs.append(design)
        
        # Sort by compliance score
        designs.sort(key=lambda x: x['validation']['compliance_score'], reverse=True)
        
        return designs

def load_inference_engine(model_path: str, config_path: str, device: str = 'cpu') -> DesignInferenceEngine:
    """Factory function to load the inference engine"""
    return DesignInferenceEngine(model_path, config_path, device)
