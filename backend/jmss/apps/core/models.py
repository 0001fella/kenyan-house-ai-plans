
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
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='projects')
    project_type = models.CharField(max_length=20, choices=PROJECT_TYPES, default='residential')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='planning')
    
    # Location data
    location = models.CharField(max_length=200)
    county = models.CharField(max_length=50, blank=True)
    coordinates = models.JSONField(null=True, blank=True)  # {lat, lng}
    
    # Budget information
    budget_amount = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    budget_currency = models.CharField(max_length=3, default='KES')
    
    # Project requirements
    requirements = models.JSONField(default=dict)  # Flexible JSON for various requirements
    
    # Metadata
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.owner.username}"

class ProjectFile(TimeStampedModel):
    """Files uploaded for a project (sketches, documents, etc.)"""
    FILE_TYPES = [
        ('sketch', 'Sketch/Drawing'),
        ('document', 'Document'),
        ('image', 'Image'),
        ('cad', 'CAD File'),
        ('bim', 'BIM File'),
    ]
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='files')
    file_type = models.CharField(max_length=20, choices=FILE_TYPES)
    file = models.FileField(upload_to='project_files/%Y/%m/')
    original_filename = models.CharField(max_length=255)
    file_size = models.PositiveIntegerField()  # in bytes
    mime_type = models.CharField(max_length=100)
    
    # File processing status
    is_processed = models.BooleanField(default=False)
    processing_status = models.CharField(max_length=50, default='pending')
    processing_results = models.JSONField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.project.name} - {self.original_filename}"

class UserProfile(TimeStampedModel):
    """Extended user profile for role-based access"""
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
    license_number = models.CharField(max_length=100, blank=True)  # For professionals
    
    # Subscription info
    subscription_tier = models.CharField(max_length=20, default='free')
    subscription_expires = models.DateTimeField(null=True, blank=True)
    
    # Preferences
    preferred_currency = models.CharField(max_length=3, default='KES')
    preferred_units = models.CharField(max_length=10, default='metric')  # metric/imperial
    
    def __str__(self):
        return f"{self.user.username} - {self.role}"
    
    @property
    def is_premium(self):
        """Check if user has active premium subscription"""
        if self.subscription_expires:
            return self.subscription_expires > timezone.now()
        return False

class SystemConfiguration(TimeStampedModel):
    """System-wide configuration settings"""
    key = models.CharField(max_length=100, unique=True)
    value = models.JSONField()
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.key
