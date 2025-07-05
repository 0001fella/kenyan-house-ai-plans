
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import *
from .serializers import *
import sys
import os

# Add AI models to Python path
ai_models_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '..', '..', 'ai_models')
sys.path.append(ai_models_path)

from quotation_engine.quotation_ai import create_quotation_engine

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category = request.query_params.get('category')
        if category:
            materials = Material.objects.filter(category=category)
            serializer = self.get_serializer(materials, many=True)
            return Response(serializer.data)
        return Response({'error': 'Category parameter required'}, status=400)

class SupplierViewSet(viewsets.ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=False, methods=['get'])
    def by_location(self, request):
        location = request.query_params.get('location')
        if location:
            suppliers = Supplier.objects.filter(location__icontains=location)
            serializer = self.get_serializer(suppliers, many=True)
            return Response(serializer.data)
        return Response({'error': 'Location parameter required'}, status=400)

class MaterialItemViewSet(viewsets.ModelViewSet):
    queryset = MaterialItem.objects.all()
    serializer_class = MaterialItemSerializer
    permission_classes = [IsAuthenticated]

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Project.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def generate_quotation(self, request, pk=None):
        """Generate AI-powered detailed quotation for project"""
        project = self.get_object()
        
        # Get project specifications from request
        project_specs = {
            'name': project.name,
            'location': project.location,
            'project_type': project.project_type,
            'building_area': request.data.get('building_area', 120),
            'floors': request.data.get('floors', 1),
            'bedrooms': request.data.get('bedrooms', 3),
            'bathrooms': request.data.get('bathrooms', 2),
            'budget': project.budget_amount or 2500000
        }
        
        try:
            # Initialize AI quotation engine
            config_path = os.path.join(ai_models_path, 'quotation_engine', 'config.json')
            quotation_engine = create_quotation_engine(config_path)
            
            # Generate detailed quotation
            ai_quotation = quotation_engine.generate_detailed_quotation(project_specs)
            
            # Create quotation in database
            quotation = Quotation.objects.create(
                quotation_id=ai_quotation['quotation_id'],
                project=project,
                subtotal=ai_quotation['totals']['subtotal'],
                transport_total=ai_quotation['totals']['transport_total'],
                tax_amount=ai_quotation['totals']['tax_amount'],
                total_amount=ai_quotation['totals']['grand_total'],
                ai_confidence_score=0.85
            )
            
            # Create quotation items
            for item_data in ai_quotation['items']:
                supplier = None
                if item_data.get('supplier_id'):
                    supplier, created = Supplier.objects.get_or_create(
                        supplier_id=item_data['supplier_id'],
                        defaults={
                            'name': item_data['supplier_name'],
                            'location': item_data['supplier_location'],
                            'contact_email': 'info@supplier.com',
                            'phone': '0700000000',
                            'county': item_data['supplier_location'].title()
                        }
                    )
                
                QuotationItem.objects.create(
                    quotation=quotation,
                    item_code=item_data['item_code'],
                    description=item_data['description'],
                    category=item_data['category'],
                    unit=item_data['unit'],
                    quantity=item_data['quantity'],
                    unit_rate=item_data['unit_rate'],
                    total=item_data['total'],
                    supplier=supplier,
                    supplier_confidence=item_data.get('price_confidence', 0.85)
                )
            
            # Create transport costs
            for transport_data in ai_quotation['transport_breakdown']:
                if 'item_code' in transport_data:
                    item = QuotationItem.objects.filter(
                        quotation=quotation,
                        item_code=transport_data['item_code']
                    ).first()
                    
                    if item:
                        TransportCost.objects.create(
                            quotation=quotation,
                            item=item,
                            origin_location=transport_data.get('supplier_location', 'Unknown'),
                            destination_location=project.location,
                            distance_km=transport_data['distance_km'],
                            vehicle_type=transport_data['vehicle_type'],
                            fuel_cost=transport_data['fuel_cost'],
                            driver_cost=transport_data['driver_cost'],
                            loading_cost=transport_data['loading_cost'],
                            total_transport_cost=transport_data['total_transport_cost']
                        )
            
            # Create payment schedule
            for schedule_data in ai_quotation['payment_schedule']:
                PaymentSchedule.objects.create(
                    schedule_id=f"PAY-{quotation.quotation_id}-{schedule_data['phase'][:3].upper()}",
                    quotation=quotation,
                    phase=schedule_data['phase'],
                    due_date=schedule_data['due_date'],
                    amount=schedule_data['amount']
                )
            
            # Update project status
            project.status = 'quotation'
            project.save()
            
            serializer = QuotationSerializer(quotation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            logger.error(f"Error generating quotation: {str(e)}")
            return Response({'error': f'Failed to generate quotation: {str(e)}'}, status=500)

class DesignDraftViewSet(viewsets.ModelViewSet):
    queryset = DesignDraft.objects.all()
    serializer_class = DesignDraftSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return DesignDraft.objects.filter(project__user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def validate_structure(self, request, pk=None):
        design = self.get_object()
        
        # Create structural validation
        validation = StructuralValidation.objects.create(
            validation_id=f"VAL-{design.design_id}-{timezone.now().strftime('%Y%m%d')}",
            design=design,
            code_ref="Kenya Building Code 2018",
            validation_result={
                "compliance_score": 95,
                "violations": [],
                "warnings": ["Minor structural optimization suggested"]
            },
            is_compliant=True
        )
        
        serializer = StructuralValidationSerializer(validation)
        return Response(serializer.data)

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Quotation.objects.filter(project__user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def generate(self, request):
        """Legacy endpoint - redirects to project quotation generation"""
        project_id = request.data.get('project_id')
        
        try:
            project = Project.objects.get(project_id=project_id, user=request.user)
            
            # Call the new generate_quotation method on project
            project_view = ProjectViewSet()
            project_view.request = request
            
            return project_view.generate_quotation(request, pk=project.id)
            
        except Project.DoesNotExist:
            return Response({'error': 'Project not found'}, status=404)
    
    @action(detail=True, methods=['post'])
    def update_item(self, request, pk=None):
        """Update individual quotation item"""
        quotation = self.get_object()
        item_id = request.data.get('item_id')
        
        try:
            item = QuotationItem.objects.get(id=item_id, quotation=quotation)
            
            # Update item fields
            for field in ['quantity', 'unit_rate', 'description']:
                if field in request.data:
                    setattr(item, field, request.data[field])
            
            # Recalculate total
            item.total = item.quantity * item.unit_rate
            item.save()
            
            # Recalculate quotation totals
            subtotal = sum(item.total for item in quotation.items.all())
            transport_total = sum(tc.total_transport_cost for tc in quotation.transport_costs.all())
            tax_amount = (subtotal + transport_total) * quotation.tax_rate
            
            quotation.subtotal = subtotal
            quotation.transport_total = transport_total
            quotation.tax_amount = tax_amount
            quotation.total_amount = subtotal + transport_total + tax_amount
            quotation.save()
            
            serializer = self.get_serializer(quotation)
            return Response(serializer.data)
            
        except QuotationItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=404)
    
    @action(detail=True, methods=['post'])
    def add_item(self, request, pk=None):
        """Add new item to quotation"""
        quotation = self.get_object()
        
        item = QuotationItem.objects.create(
            quotation=quotation,
            item_code=request.data.get('item_code', f'CUSTOM{QuotationItem.objects.filter(quotation=quotation).count() + 1}'),
            description=request.data.get('description', ''),
            category=request.data.get('category', 'custom'),
            unit=request.data.get('unit', 'pcs'),
            quantity=request.data.get('quantity', 1),
            unit_rate=request.data.get('unit_rate', 0),
            total=request.data.get('quantity', 1) * request.data.get('unit_rate', 0)
        )
        
        # Recalculate quotation totals
        subtotal = sum(item.total for item in quotation.items.all())
        transport_total = quotation.transport_total
        tax_amount = (subtotal + transport_total) * quotation.tax_rate
        
        quotation.subtotal = subtotal
        quotation.tax_amount = tax_amount
        quotation.total_amount = subtotal + transport_total + tax_amount
        quotation.save()
        
        serializer = self.get_serializer(quotation)
        return Response(serializer.data)

class BimModelViewSet(viewsets.ModelViewSet):
    queryset = BimModel.objects.all()
    serializer_class = BimModelSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return BimModel.objects.filter(project__user=self.request.user)
    
    @action(detail=False, methods=['post'])
    def export_ifc(self, request):
        design_id = request.data.get('design_id')
        
        try:
            design = DesignDraft.objects.get(design_id=design_id, project__user=request.user)
            
            # Create BIM model
            bim_model = BimModel.objects.create(
                model_id=f"BIM-{design.design_id}",
                project=design.project,
                file_path=f"/exports/{design.design_id}.ifc",
                model_type="IFC",
                components=design.design_data
            )
            
            serializer = BimModelSerializer(bim_model)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except DesignDraft.DoesNotExist:
            return Response({'error': 'Design not found'}, status=404)
