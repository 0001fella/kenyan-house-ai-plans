
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from jmss.apps.core.models import *

class Command(BaseCommand):
    help = 'Populate database with sample data'

    def handle(self, *args, **options):
        # Create sample materials
        materials_data = [
            {'material_id': 'C001', 'name': 'Concrete Grade 25', 'category': 'concrete', 'unit_of_measure': 'm3', 'base_price': 8500},
            {'material_id': 'S001', 'name': 'Steel Reinforcement Y12', 'category': 'steel', 'unit_of_measure': 'kg', 'base_price': 85},
            {'material_id': 'B001', 'name': 'Concrete Blocks 6"', 'category': 'blocks', 'unit_of_measure': 'No', 'base_price': 45},
            {'material_id': 'R001', 'name': 'Iron Sheets 28 Gauge', 'category': 'roofing', 'unit_of_measure': 'Sheet', 'base_price': 850},
        ]
        
        for material_data in materials_data:
            Material.objects.get_or_create(
                material_id=material_data['material_id'],
                defaults=material_data
            )
        
        # Create sample suppliers
        suppliers_data = [
            {'supplier_id': 'SUP001', 'name': 'Bamburi Cement', 'contact_email': 'info@bamburi.com', 'phone': '+254700000001', 'location': 'Nairobi', 'county': 'Nairobi'},
            {'supplier_id': 'SUP002', 'name': 'Simba Steel', 'contact_email': 'sales@simba.com', 'phone': '+254700000002', 'location': 'Nakuru', 'county': 'Nakuru'},
            {'supplier_id': 'SUP003', 'name': 'Devki Group', 'contact_email': 'orders@devki.com', 'phone': '+254700000003', 'location': 'Mombasa', 'county': 'Mombasa'},
        ]
        
        for supplier_data in suppliers_data:
            Supplier.objects.get_or_create(
                supplier_id=supplier_data['supplier_id'],
                defaults=supplier_data
            )
        
        # Create building codes
        building_codes = [
            {'code_id': 'KBC2018-S1', 'title': 'Structural Design Standards', 'category': 'structural', 'effective_date': '2018-01-01'},
            {'code_id': 'KBC2018-F1', 'title': 'Foundation Requirements', 'category': 'foundation', 'effective_date': '2018-01-01'},
            {'code_id': 'KBC2018-E1', 'title': 'Electrical Installation Standards', 'category': 'electrical', 'effective_date': '2018-01-01'},
        ]
        
        for code_data in building_codes:
            BuildingCode.objects.get_or_create(
                code_id=code_data['code_id'],
                defaults=code_data
            )
        
        self.stdout.write(self.style.SUCCESS('Successfully populated sample data'))
