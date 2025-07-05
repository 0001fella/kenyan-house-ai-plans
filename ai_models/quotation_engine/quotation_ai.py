"""
AI-Powered Quotation Engine for Construction Projects
Generates detailed quotations with material sourcing, pricing, and transport optimization
"""

import json
import pandas as pd
import numpy as np
from typing import Dict, List, Any, Optional, Tuple
from pathlib import Path
import logging
from datetime import datetime, timedelta
import math

logger = logging.getLogger(__name__)

class MaterialClassifier:
    """Classifies and quantifies materials based on project specifications"""
    
    def __init__(self):
        self.material_standards = {
            'concrete': {
                'foundation': {'grade': 25, 'unit': 'm3', 'factor': 0.15},  # 15cm thick
                'slab': {'grade': 30, 'unit': 'm3', 'factor': 0.12},
                'columns': {'grade': 35, 'unit': 'm3', 'factor': 0.08},
                'beams': {'grade': 35, 'unit': 'm3', 'factor': 0.06}
            },
            'steel': {
                'reinforcement': {'sizes': ['Y8', 'Y10', 'Y12', 'Y16', 'Y20'], 'unit': 'kg'},
                'structural': {'unit': 'kg', 'factor': 45}  # kg per m3 concrete
            },
            'blocks': {
                'masonry': {'unit': 'pcs', 'size': '6inch', 'factor': 12.5}  # blocks per m2
            },
            'timber': {
                'roofing': {'unit': 'm3', 'factor': 0.05},  # m3 per m2 roof
                'finishing': {'unit': 'm2', 'factor': 1.2}
            },
            'roofing': {
                'iron_sheets': {'unit': 'pcs', 'factor': 0.85},  # sheets per m2
                'tiles': {'unit': 'pcs', 'factor': 12}
            }
        }
    
    def classify_project_materials(self, project_specs: Dict) -> Dict[str, List[Dict]]:
        """Classify and quantify materials needed for project"""
        materials = {}
        
        # Extract project dimensions
        total_area = project_specs.get('building_area', 120)
        floors = project_specs.get('floors', 1)
        bedrooms = project_specs.get('bedrooms', 3)
        bathrooms = project_specs.get('bathrooms', 2)
        
        # Calculate concrete requirements
        concrete_items = []
        
        # Foundation
        foundation_volume = total_area * self.material_standards['concrete']['foundation']['factor']
        concrete_items.append({
            'item_code': 'C001',
            'description': 'Concrete Grade 25 - Foundation',
            'unit': 'm3',
            'quantity': round(foundation_volume, 2),
            'category': 'concrete'
        })
        
        # Floor slab
        slab_volume = total_area * self.material_standards['concrete']['slab']['factor']
        concrete_items.append({
            'item_code': 'C002',
            'description': 'Concrete Grade 30 - Floor Slab',
            'unit': 'm3',
            'quantity': round(slab_volume, 2),
            'category': 'concrete'
        })
        
        materials['concrete'] = concrete_items
        
        # Calculate steel requirements
        steel_items = []
        total_concrete = foundation_volume + slab_volume
        steel_quantity = total_concrete * self.material_standards['steel']['structural']['factor']
        
        steel_items.append({
            'item_code': 'S001',
            'description': 'Steel Reinforcement Mixed Sizes',
            'unit': 'kg',
            'quantity': round(steel_quantity, 0),
            'category': 'steel'
        })
        
        materials['steel'] = steel_items
        
        # Calculate masonry blocks
        wall_area = total_area * 2.5  # Estimate wall area
        block_quantity = wall_area * self.material_standards['blocks']['masonry']['factor']
        
        materials['blocks'] = [{
            'item_code': 'B001',
            'description': '6-inch Concrete Blocks',
            'unit': 'pcs',
            'quantity': round(block_quantity, 0),
            'category': 'blocks'
        }]
        
        # Calculate roofing materials
        roof_area = total_area * 1.3  # Account for pitch and overhang
        iron_sheets = roof_area * self.material_standards['roofing']['iron_sheets']['factor']
        
        materials['roofing'] = [{
            'item_code': 'R001',
            'description': 'Corrugated Iron Sheets - 30 Gauge',
            'unit': 'pcs',
            'quantity': round(iron_sheets, 0),
            'category': 'roofing'
        }]
        
        # Add finishing materials
        materials['finishing'] = [
            {
                'item_code': 'F001',
                'description': 'Interior Paint - Emulsion',
                'unit': 'liters',
                'quantity': round(total_area * 0.3, 1),
                'category': 'finishing'
            },
            {
                'item_code': 'F002',
                'description': 'Ceramic Floor Tiles',
                'unit': 'm2',
                'quantity': round(total_area * 0.8, 1),
                'category': 'finishing'
            }
        ]
        
        # Add electrical and plumbing
        materials['electrical'] = [{
            'item_code': 'E001',
            'description': 'Electrical Installation Package',
            'unit': 'lot',
            'quantity': 1,
            'category': 'electrical'
        }]
        
        materials['plumbing'] = [{
            'item_code': 'P001',
            'description': f'Plumbing Installation - {bathrooms} Bathrooms',
            'unit': 'lot',
            'quantity': bathrooms,
            'category': 'plumbing'
        }]
        
        return materials

class PricePredictor:
    """Predicts material prices based on location, supplier, and market conditions"""
    
    def __init__(self):
        self.base_prices = self._load_base_prices()
        self.location_factors = {
            'nairobi': 1.0,
            'mombasa': 1.05,
            'nakuru': 0.95,
            'kisumu': 0.90,
            'eldoret': 0.88,
            'default': 0.92
        }
        
        self.seasonal_factors = {
            'dry_season': 1.0,
            'rainy_season': 1.15,  # Higher prices during rainy season
            'peak_construction': 1.1  # March-June, Oct-Dec
        }
    
    def _load_base_prices(self) -> Dict:
        """Load base material prices from database/CSV files"""
        return {
            'concrete': {
                'C001': 8500,  # KES per m3
                'C002': 9200,
                'C003': 10000
            },
            'steel': {
                'S001': 83,  # KES per kg
                'S002': 85,
                'S003': 90
            },
            'blocks': {
                'B001': 45  # KES per block
            },
            'roofing': {
                'R001': 850  # KES per sheet
            },
            'finishing': {
                'F001': 450,  # KES per liter
                'F002': 1200  # KES per m2
            },
            'electrical': {
                'E001': 25000  # KES per room
            },
            'plumbing': {
                'P001': 35000  # KES per bathroom
            }
        }
    
    def get_current_season(self) -> str:
        """Determine current season for pricing adjustments"""
        current_month = datetime.now().month
        
        if current_month in [6, 7, 8, 9]:  # Dry season
            return 'dry_season'
        elif current_month in [3, 4, 5, 10, 11, 12]:  # Peak construction
            return 'peak_construction'
        else:  # Rainy season
            return 'rainy_season'
    
    def predict_price(self, item_code: str, category: str, location: str, 
                     supplier_id: str = None) -> Dict[str, float]:
        """Predict price for a specific material item"""
        base_price = self.base_prices.get(category, {}).get(item_code, 0)
        
        if base_price == 0:
            logger.warning(f"No base price found for {item_code}")
            return {'unit_price': 0, 'confidence': 0}
        
        # Apply location factor
        location_factor = self.location_factors.get(location.lower(), 
                                                   self.location_factors['default'])
        
        # Apply seasonal factor
        season = self.get_current_season()
        seasonal_factor = self.seasonal_factors[season]
        
        # Apply supplier margin (if available)
        supplier_factor = 1.0
        if supplier_id:
            supplier_factor = self._get_supplier_factor(supplier_id)
        
        # Calculate final price
        final_price = base_price * location_factor * seasonal_factor * supplier_factor
        
        # Add some randomness for market variation (±5%)
        variation = np.random.uniform(0.95, 1.05)
        final_price *= variation
        
        return {
            'unit_price': round(final_price, 2),
            'base_price': base_price,
            'location_factor': location_factor,
            'seasonal_factor': seasonal_factor,
            'supplier_factor': supplier_factor,
            'confidence': 0.85
        }
    
    def _get_supplier_factor(self, supplier_id: str) -> float:
        """Get supplier-specific pricing factor"""
        supplier_factors = {
            'SUP001': 0.98,  # Bulk supplier - lower prices
            'SUP002': 1.02,  # Premium supplier - higher prices
            'SUP003': 1.05,  # Specialty supplier
            'default': 1.0
        }
        return supplier_factors.get(supplier_id, supplier_factors['default'])

class TransportOptimizer:
    """Optimizes material transport costs and logistics"""
    
    def __init__(self):
        self.fuel_cost_per_liter = 150.0  # KES
        self.fuel_consumption = {  # km per liter
            'small_truck': 8,
            'medium_truck': 6,
            'large_truck': 4
        }
        
        self.vehicle_capacity = {  # kg
            'small_truck': 5000,
            'medium_truck': 10000,
            'large_truck': 20000
        }
        
        # Distance matrix between major cities (km)
        self.distance_matrix = {
            ('nairobi', 'mombasa'): 480,
            ('nairobi', 'nakuru'): 160,
            ('nairobi', 'kisumu'): 350,
            ('nairobi', 'eldoret'): 320,
            ('mombasa', 'nakuru'): 640,
            ('mombasa', 'kisumu'): 830,
            ('nakuru', 'kisumu'): 190,
            ('nakuru', 'eldoret'): 160
        }
    
    def get_distance(self, origin: str, destination: str) -> float:
        """Get distance between two locations"""
        key1 = (origin.lower(), destination.lower())
        key2 = (destination.lower(), origin.lower())
        
        return self.distance_matrix.get(key1, self.distance_matrix.get(key2, 100))
    
    def calculate_transport_cost(self, material_weight: float, origin: str, 
                               destination: str) -> Dict[str, Any]:
        """Calculate optimal transport cost for materials"""
        distance = self.get_distance(origin, destination)
        
        # Determine optimal vehicle type
        vehicle_type = self._select_vehicle(material_weight)
        
        # Calculate fuel cost
        fuel_consumption = self.fuel_consumption[vehicle_type]
        fuel_needed = (distance * 2) / fuel_consumption  # Round trip
        fuel_cost = fuel_needed * self.fuel_cost_per_liter
        
        # Add driver costs and other expenses
        driver_cost = distance * 20  # KES per km
        loading_cost = 2000  # Fixed loading/unloading cost
        
        total_cost = fuel_cost + driver_cost + loading_cost
        
        return {
            'vehicle_type': vehicle_type,
            'distance_km': distance,
            'fuel_cost': round(fuel_cost, 2),
            'driver_cost': round(driver_cost, 2),
            'loading_cost': loading_cost,
            'total_transport_cost': round(total_cost, 2),
            'cost_per_kg': round(total_cost / material_weight, 2) if material_weight > 0 else 0
        }
    
    def _select_vehicle(self, weight: float) -> str:
        """Select optimal vehicle based on material weight"""
        if weight <= self.vehicle_capacity['small_truck']:
            return 'small_truck'
        elif weight <= self.vehicle_capacity['medium_truck']:
            return 'medium_truck'
        else:
            return 'large_truck'
    
    def optimize_multi_supplier_transport(self, suppliers_materials: List[Dict]) -> Dict:
        """Optimize transport when materials come from multiple suppliers"""
        total_cost = 0
        transport_breakdown = []
        
        for supplier_data in suppliers_materials:
            supplier_location = supplier_data['location']
            project_location = supplier_data['project_location']
            total_weight = supplier_data['total_weight']
            
            transport_info = self.calculate_transport_cost(
                total_weight, supplier_location, project_location
            )
            
            transport_info['supplier_id'] = supplier_data['supplier_id']
            transport_info['materials'] = supplier_data['materials']
            transport_breakdown.append(transport_info)
            
            total_cost += transport_info['total_transport_cost']
        
        return {
            'total_transport_cost': round(total_cost, 2),
            'transport_breakdown': transport_breakdown,
            'optimization_savings': 0  # Could implement route optimization here
        }

class QuotationEngine:
    """Main quotation generation engine"""
    
    def __init__(self, config_path: str):
        with open(config_path, 'r') as f:
            self.config = json.load(f)
        
        self.material_classifier = MaterialClassifier()
        self.price_predictor = PricePredictor()
        self.transport_optimizer = TransportOptimizer()
        
        # Load supplier database
        self.suppliers = self._load_suppliers()
    
    def _load_suppliers(self) -> Dict:
        """Load supplier database from CSV files"""
        suppliers = {}
        
        # Mock supplier data - would be loaded from actual database
        suppliers_data = [
            {'id': 'SUP001', 'name': 'Nairobi Building Supplies', 'location': 'nairobi', 'rating': 4.5},
            {'id': 'SUP002', 'name': 'Coast Cement Ltd', 'location': 'mombasa', 'rating': 4.2},
            {'id': 'SUP003', 'name': 'Rift Valley Hardware', 'location': 'nakuru', 'rating': 4.0},
            {'id': 'SUP004', 'name': 'Western Kenya Suppliers', 'location': 'kisumu', 'rating': 3.8}
        ]
        
        for supplier in suppliers_data:
            suppliers[supplier['id']] = supplier
        
        return suppliers
    
    def generate_detailed_quotation(self, project_specs: Dict) -> Dict[str, Any]:
        """Generate comprehensive quotation with material sourcing and transport"""
        
        # Step 1: Classify and quantify materials
        materials_by_category = self.material_classifier.classify_project_materials(project_specs)
        
        # Step 2: Generate quotation items with pricing
        quotation_items = []
        transport_data = []
        total_amount = 0
        
        project_location = project_specs.get('location', 'nairobi').lower()
        
        for category, materials in materials_by_category.items():
            for material in materials:
                # Get best supplier for this material
                best_supplier = self._find_best_supplier(category, project_location)
                
                # Predict price
                price_info = self.price_predictor.predict_price(
                    material['item_code'], 
                    category, 
                    project_location,
                    best_supplier['id']
                )
                
                unit_price = price_info['unit_price']
                quantity = material['quantity']
                total = unit_price * quantity
                
                quotation_item = {
                    'item_code': material['item_code'],
                    'description': material['description'],
                    'unit': material['unit'],
                    'quantity': quantity,
                    'unit_rate': unit_price,
                    'total': round(total, 2),
                    'category': category,
                    'supplier_id': best_supplier['id'],
                    'supplier_name': best_supplier['name'],
                    'supplier_location': best_supplier['location'],
                    'price_confidence': price_info['confidence']
                }
                
                quotation_items.append(quotation_item)
                total_amount += total
                
                # Calculate transport for this material
                material_weight = self._estimate_material_weight(material, quantity)
                transport_info = self.transport_optimizer.calculate_transport_cost(
                    material_weight, 
                    best_supplier['location'], 
                    project_location
                )
                transport_info['item_code'] = material['item_code']
                transport_data.append(transport_info)
        
        # Step 3: Calculate totals and taxes
        subtotal = total_amount
        transport_total = sum(t['total_transport_cost'] for t in transport_data)
        tax_rate = 0.16  # 16% VAT
        tax_amount = (subtotal + transport_total) * tax_rate
        grand_total = subtotal + transport_total + tax_amount
        
        # Step 4: Generate payment schedule
        payment_schedule = self._generate_payment_schedule(grand_total)
        
        # Step 5: Compile final quotation
        quotation = {
            'quotation_id': f"QUO-{datetime.now().strftime('%Y%m%d')}-{hash(str(project_specs)) % 1000:03d}",
            'project_name': project_specs.get('name', 'Construction Project'),
            'project_location': project_location.title(),
            'generated_at': datetime.now().isoformat(),
            'items': quotation_items,
            'transport_breakdown': transport_data,
            'totals': {
                'subtotal': round(subtotal, 2),
                'transport_total': round(transport_total, 2),
                'tax_rate': tax_rate,
                'tax_amount': round(tax_amount, 2),
                'grand_total': round(grand_total, 2),
                'currency': 'KES'
            },
            'payment_schedule': payment_schedule,
            'supplier_summary': self._generate_supplier_summary(quotation_items),
            'validity_days': 30,
            'notes': [
                'All prices are in Kenya Shillings (KES) and include VAT where applicable',
                'Material costs based on current market rates',
                'Transport costs calculated based on optimal logistics',
                'Prices valid for 30 days from quotation date',
                'Payment terms as per agreed schedule'
            ]
        }
        
        return quotation
    
    def _find_best_supplier(self, category: str, location: str) -> Dict:
        """Find best supplier for a material category and location"""
        # Simple logic - would be more sophisticated in real implementation
        location_suppliers = {
            'nairobi': 'SUP001',
            'mombasa': 'SUP002', 
            'nakuru': 'SUP003',
            'kisumu': 'SUP004'
        }
        
        supplier_id = location_suppliers.get(location, 'SUP001')
        return self.suppliers[supplier_id]
    
    def _estimate_material_weight(self, material: Dict, quantity: float) -> float:
        """Estimate weight of materials for transport calculation"""
        weight_factors = {
            'concrete': 2400,  # kg per m3
            'steel': 1,  # already in kg
            'blocks': 15,  # kg per block
            'roofing': 5,  # kg per sheet
            'finishing': 1.5,  # kg per unit
            'electrical': 50,  # kg per lot
            'plumbing': 100  # kg per bathroom
        }
        
        category = material['category']
        factor = weight_factors.get(category, 10)  # default 10kg
        
        return quantity * factor
    
    def _generate_payment_schedule(self, total_amount: float) -> List[Dict]:
        """Generate payment schedule for the project"""
        return [
            {
                'phase': 'Mobilization',
                'percentage': 10,
                'amount': round(total_amount * 0.1, 2),
                'due_date': (datetime.now() + timedelta(days=7)).strftime('%Y-%m-%d'),
                'description': 'Initial mobilization payment'
            },
            {
                'phase': 'Foundation',
                'percentage': 25,
                'amount': round(total_amount * 0.25, 2),
                'due_date': (datetime.now() + timedelta(days=30)).strftime('%Y-%m-%d'),
                'description': 'Foundation completion'
            },
            {
                'phase': 'Structural Work',
                'percentage': 35,
                'amount': round(total_amount * 0.35, 2),
                'due_date': (datetime.now() + timedelta(days=60)).strftime('%Y-%m-%d'),
                'description': 'Structural work completion'
            },
            {
                'phase': 'Finishing',
                'percentage': 25,
                'amount': round(total_amount * 0.25, 2),
                'due_date': (datetime.now() + timedelta(days=90)).strftime('%Y-%m-%d'),
                'description': 'Finishing work completion'
            },
            {
                'phase': 'Final Payment',
                'percentage': 5,
                'amount': round(total_amount * 0.05, 2),
                'due_date': (datetime.now() + timedelta(days=100)).strftime('%Y-%m-%d'),
                'description': 'Final payment upon handover'
            }
        ]
    
    def _generate_supplier_summary(self, items: List[Dict]) -> List[Dict]:
        """Generate summary of suppliers and their contributions"""
        supplier_totals = {}
        
        for item in items:
            supplier_id = item['supplier_id']
            if supplier_id not in supplier_totals:
                supplier_totals[supplier_id] = {
                    'supplier_id': supplier_id,
                    'supplier_name': item['supplier_name'],
                    'location': item['supplier_location'],
                    'total_amount': 0,
                    'item_count': 0
                }
            
            supplier_totals[supplier_id]['total_amount'] += item['total']
            supplier_totals[supplier_id]['item_count'] += 1
        
        return list(supplier_totals.values())

def create_quotation_engine(config_path: str) -> QuotationEngine:
    """Factory function to create quotation engine"""
    return QuotationEngine(config_path)