
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
import uuid

class TimeStampedModel(models.Model):
    """Abstract base class with created_at and updated_at fields"""
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        abstract = True

class UserProfile(TimeStampedModel):
    """Extended user profile"""
    USER_ROLES = [
        ('homeowner', 'Homeowner'),
        ('contractor', 'Contractor'),
        ('engineer', 'Engineer'),
        ('developer', 'Developer'),
        ('admin', 'Admin'),
    ]
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    role = models.CharField(max_length=20, choices=USER_ROLES, default='homeowner')
    phone_number = models.CharField(max_length=15, blank=True)
    company_name = models.CharField(max_length=200, blank=True)
    license_number = models.CharField(max_length=100, blank=True)
    subscription_tier = models.CharField(max_length=20, default='free')
    subscription_expires = models.DateTimeField(null=True, blank=True)
    preferred_currency = models.CharField(max_length=3, default='KES')
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"

class Material(TimeStampedModel):
    """Material catalog"""
    MATERIAL_CATEGORIES = [
        ('concrete', 'Concrete'),
        ('steel', 'Steel'),
        ('timber', 'Timber'),
        ('blocks', 'Blocks'),
        ('roofing', 'Roofing'),
        ('finishing', 'Finishing'),
    ]
    
    material_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=50, choices=MATERIAL_CATEGORIES)
    description = models.TextField(blank=True)
    unit_of_measure = models.CharField(max_length=20)
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='KES')
    
    def __str__(self):
        return f"{self.material_id} - {self.name}"

class Supplier(TimeStampedModel):
    """Suppliers information"""
    supplier_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    contact_email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=100)
    county = models.CharField(max_length=50)
    country = models.CharField(max_length=50, default='Kenya')
    
    def __str__(self):
        return self.name

class MaterialItem(TimeStampedModel):
    """Material items with supplier pricing"""
    item_id = models.CharField(max_length=50, unique=True)
    material = models.ForeignKey(Material, on_delete=models.CASCADE, related_name='items')
    supplier = models.ForeignKey(Supplier, on_delete=models.CASCADE, related_name='materials')
    category = models.CharField(max_length=50)
    estimate_id = models.CharField(max_length=50)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_cost = models.DecimalField(max_digits=12, decimal_places=2)
    
    def __str__(self):
        return f"{self.item_id} - {self.material.name}"

class Project(TimeStampedModel):
    """Main project model"""
    PROJECT_TYPES = [
        ('residential', 'Residential'),
        ('commercial', 'Commercial'),
        ('industrial', 'Industrial'),
        ('infrastructure', 'Infrastructure'),
    ]
    
    STATUS_CHOICES = [
        ('planning', 'Planning'),
        ('design', 'Design Phase'),
        ('quotation', 'Quotation'),
        ('approved', 'Approved'),
        ('construction', 'Under Construction'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    project_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES, default='residential')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    location = models.CharField(max_length=200)
    coordinates = models.JSONField(null=True, blank=True)
    budget_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        return f"{self.project_id} - {self.name}"

class DesignDraft(TimeStampedModel):
    """Design drafts for projects"""
    design_id = models.CharField(max_length=50, unique=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='designs')
    version = models.IntegerField(default=1)
    bedrooms = models.IntegerField()
    bathrooms = models.IntegerField()
    floors = models.IntegerField(default=1)
    area = models.DecimalField(max_digits=10, decimal_places=2)
    design_data = models.JSONField()
    is_approved = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.design_id} - {self.project.name}"

class ParametricDesign(TimeStampedModel):
    """Parametric design configurations"""
    design_id = models.CharField(max_length=50, unique=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='parametric_designs')
    room_config = models.JSONField()
    style = models.CharField(max_length=50)
    parameters = models.JSONField()
    generated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.design_id} - Parametric"

class StructuralValidation(TimeStampedModel):
    """Structural validation results"""
    validation_id = models.CharField(max_length=50, unique=True)
    design = models.ForeignKey(DesignDraft, on_delete=models.CASCADE, related_name='validations')
    code_ref = models.CharField(max_length=100)
    validation_result = models.JSONField()
    is_compliant = models.BooleanField()
    
    def __str__(self):
        return f"{self.validation_id} - {self.design.design_id}"

class BuildingCode(TimeStampedModel):
    """Building codes and regulations"""
    code_id = models.CharField(max_length=50, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=50)
    effective_date = models.DateField()
    
    def __str__(self):
        return f"{self.code_id} - {self.title}"

class BimModel(TimeStampedModel):
    """BIM model data"""
    model_id = models.CharField(max_length=50, unique=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='bim_models')
    file_path = models.CharField(max_length=500)
    model_type = models.CharField(max_length=50)
    components = models.JSONField()
    generated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.model_id} - {self.project.name}"

class AiModel(TimeStampedModel):
    """AI model configurations"""
    model_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    version = models.CharField(max_length=20)
    training_dataset = models.CharField(max_length=200)
    validation_at = models.DateTimeField()
    
    def __str__(self):
        return f"{self.model_id} - {self.name}"

class Quotation(TimeStampedModel):
    """Project quotations"""
    quotation_id = models.CharField(max_length=50, unique=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='quotations')
    total_amount = models.DecimalField(max_digits=15, decimal_places=2)
    currency = models.CharField(max_length=3, default='KES')
    generated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.quotation_id} - {self.project.name}"

class PaymentSchedule(TimeStampedModel):
    """Payment schedules for projects"""
    schedule_id = models.CharField(max_length=50, unique=True)
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, related_name='schedules')
    phase = models.CharField(max_length=100)
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    
    def __str__(self):
        return f"{self.schedule_id} - {self.phase}"
