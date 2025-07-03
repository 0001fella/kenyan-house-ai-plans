
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = '__all__'

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = '__all__'

class MaterialItemSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)
    supplier = SupplierSerializer(read_only=True)
    
    class Meta:
        model = MaterialItem
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Project
        fields = '__all__'

class DesignDraftSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    
    class Meta:
        model = DesignDraft
        fields = '__all__'

class ParametricDesignSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    
    class Meta:
        model = ParametricDesign
        fields = '__all__'

class StructuralValidationSerializer(serializers.ModelSerializer):
    design = DesignDraftSerializer(read_only=True)
    
    class Meta:
        model = StructuralValidation
        fields = '__all__'

class BuildingCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BuildingCode
        fields = '__all__'

class BimModelSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    
    class Meta:
        model = BimModel
        fields = '__all__'

class AiModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AiModel
        fields = '__all__'

class QuotationSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    
    class Meta:
        model = Quotation
        fields = '__all__'

class PaymentScheduleSerializer(serializers.ModelSerializer):
    quotation = QuotationSerializer(read_only=True)
    
    class Meta:
        model = PaymentSchedule
        fields = '__all__'
