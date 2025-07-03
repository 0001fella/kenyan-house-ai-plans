
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.UserProfileViewSet)
router.register(r'materials', views.MaterialViewSet)
router.register(r'suppliers', views.SupplierViewSet)
router.register(r'material-items', views.MaterialItemViewSet)
router.register(r'projects', views.ProjectViewSet)
router.register(r'designs', views.DesignDraftViewSet)
router.register(r'quotations', views.QuotationViewSet)
router.register(r'bim-models', views.BimModelViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
