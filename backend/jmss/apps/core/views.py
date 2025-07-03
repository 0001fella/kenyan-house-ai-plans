
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import *
from .serializers import *

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
    def generate_design(self, request, pk=None):
        project = self.get_object()
        # Integration with AI design generation
        design_params = request.data
        
        # Create design draft
        design = DesignDraft.objects.create(
            design_id=f"DSN-{project.project_id}-{DesignDraft.objects.filter(project=project).count() + 1}",
            project=project,
            bedrooms=design_params.get('bedrooms', 3),
            bathrooms=design_params.get('bathrooms', 2),
            floors=design_params.get('floors', 1),
            area=design_params.get('area', 120),
            design_data=design_params
        )
        
        serializer = DesignDraftSerializer(design)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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
        project_id = request.data.get('project_id')
        design_id = request.data.get('design_id')
        
        try:
            project = Project.objects.get(project_id=project_id, user=request.user)
            design = DesignDraft.objects.get(design_id=design_id, project=project)
            
            # Generate quotation
            quotation = Quotation.objects.create(
                quotation_id=f"QUO-{project.project_id}-{timezone.now().strftime('%Y%m%d')}",
                project=project,
                total_amount=2500000,  # Sample calculation
                currency='KES'
            )
            
            # Create payment schedule
            PaymentSchedule.objects.create(
                schedule_id=f"PAY-{quotation.quotation_id}-1",
                quotation=quotation,
                phase="Foundation",
                due_date=timezone.now().date(),
                amount=quotation.total_amount * 0.3
            )
            
            serializer = QuotationSerializer(quotation)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except (Project.DoesNotExist, DesignDraft.DoesNotExist):
            return Response({'error': 'Project or Design not found'}, status=404)

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
