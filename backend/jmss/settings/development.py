
from .base import *

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']

# Development database - SQLite for easier setup
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Development CORS settings
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Email backend for development
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# Disable HTTPS redirects in development
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = False
CSRF_COOKIE_SECURE = False

# Static files served by Django in development
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# AI Models - Use CPU versions in development
AI_MODELS.update({
    'DESIGN_GENERATION': {
        'MODEL_PATH': BASE_DIR / 'ai_models' / 'generative_design' / 'models' / 'residential_kenya_cpu.pt',
        'DEVICE': 'cpu',
        'CONFIG_PATH': BASE_DIR / 'ai_models' / 'generative_design' / 'config_dev.json',
    }
})

# Development logging
LOGGING['handlers']['console']['level'] = 'DEBUG'
LOGGING['loggers']['jmss']['level'] = 'DEBUG'

# Cache (Redis not required in development)
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
    }
}
