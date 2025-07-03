
# JM Structural Solutions - AI-Powered Construction Planning Platform

![JM Structural Solutions](https://img.shields.io/badge/JM%20Structural%20Solutions-AI%20Powered-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## Overview

JM Structural Solutions is a comprehensive AI-powered construction planning platform designed specifically for the Kenyan construction market. The platform integrates advanced AI models with modern web technologies to provide automated design generation, cost estimation, and project management capabilities.

## 🚀 Features

### Core Features
- **AI-Powered Design Generation**: Generate optimized building designs using advanced neural networks
- **Real-time Cost Estimation**: Accurate cost estimates with live Kenyan market pricing
- **3D Visualization**: Interactive 3D models with walkthrough capabilities
- **BIM Integration**: Export to IFC format and integrate with professional BIM software
- **Automated BOQ Generation**: Structured Bill of Quantities with supplier integration
- **Building Code Compliance**: Automated validation against Kenyan building standards

### Advanced Features
- **Multi-Source Integration**: Import from CostX, Revit, Candy, and other industry tools
- **Role-Based Access Control**: Different capabilities for Homeowners, Contractors, Engineers
- **Sketch-to-Design**: AI-powered sketch analysis and conversion
- **Supplier Integration**: Real-time pricing from Kenyan construction suppliers
- **Project Management**: Comprehensive project tracking and collaboration tools
- **Mobile Responsive**: Full functionality across all devices

## 🏗️ Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS + shadcn/ui
- Three.js for 3D visualization
- Tanstack Query for state management

**Backend:**
- Django 4.2 + Django REST Framework
- PostgreSQL database
- Redis for caching and task queues
- Celery for background processing

**AI/ML:**
- PyTorch for deep learning models
- OpenCV for computer vision
- Custom GAN models for design generation
- Building code validation engine

**Infrastructure:**
- Docker containerization
- Nginx reverse proxy
- Kubernetes orchestration
- AWS cloud deployment

## 📁 Project Structure

```
jm-structural-solutions/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Route components
│   │   ├── services/       # API communication
│   │   └── contexts/       # React contexts
│   └── public/             # Static assets
├── backend/                 # Django backend API
│   ├── jmss/               # Main Django project
│   │   ├── apps/           # Django applications
│   │   └── settings/       # Environment configurations
│   └── requirements.txt    # Python dependencies
├── ai_models/              # AI/ML models and training
│   ├── generative_design/ # Design generation models
│   ├── structural_validation/ # Code compliance
│   └── computer_vision/   # Sketch analysis
├── infrastructure/         # DevOps and deployment
│   ├── docker-compose.yml # Local development
│   ├── kubernetes/        # Production deployment
│   └── terraform/         # Infrastructure as code
├── docs/                  # Documentation
└── scripts/              # Automation scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Docker and Docker Compose
- Git

### Local Development Setup

1. **Clone the repository:**
```bash
git clone https://github.com/your-org/jm-structural-solutions.git
cd jm-structural-solutions
```

2. **Start with Docker Compose:**
```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d

# Check service status
docker-compose ps
```

3. **Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Panel: http://localhost:8000/admin
- AI Server: http://localhost:8001

### Manual Setup (Development)

**Frontend Setup:**
```bash
cd frontend
npm install
npm start
```

**Backend Setup:**
```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**AI Models Setup:**
```bash
cd ai_models
pip install -r requirements.txt
python setup_models.py
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DB_NAME=jmss_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Django
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Redis
REDIS_URL=redis://localhost:6379/0

# AI Models
AI_MODEL_PATH=/path/to/models
DEVICE=cpu

# External APIs
SUPPLIER_API_KEY=your-supplier-api-key
MAPS_API_KEY=your-maps-api-key
```

### Django Settings

The project uses environment-specific settings:
- `development.py` - Local development
- `production.py` - Production deployment
- `testing.py` - Test environment

## 📖 API Documentation

### Authentication
The API uses token-based authentication. Include the token in headers:
```
Authorization: Token your-auth-token
```

### Key Endpoints

**Projects:**
- `GET/POST /api/projects/` - List/Create projects
- `GET/PUT/DELETE /api/projects/{id}/` - Project details

**Design Generation:**
- `POST /api/designs/generate/` - Generate AI designs
- `GET /api/designs/{id}/` - Design details
- `POST /api/designs/{id}/export/` - Export to IFC

**Quotations:**
- `POST /api/quotations/generate/` - Generate quotation
- `GET /api/quotations/{id}/` - Quotation details
- `POST /api/quotations/{id}/export/` - Export to PDF

Full API documentation available at: `/api/docs/`

## 🧠 AI Models

### Design Generation Model
- **Architecture**: Generative Adversarial Network (GAN)
- **Training Data**: 15,000+ Kenyan residential designs
- **Input**: Requirements (bedrooms, budget, location, style)
- **Output**: Optimized floor plans and 3D models

### Building Code Validator
- **Standards**: Kenya Building Code 2018
- **Validation**: Room sizes, setbacks, coverage ratios
- **Compliance Scoring**: Automated compliance percentage

### Sketch Parser
- **Technology**: Computer Vision + CNN
- **Input**: Hand-drawn sketches, photos
- **Output**: Structured room layout data

## 🏃‍♂️ Usage Examples

### Generate a Design

```javascript
// Frontend API call
const designRequest = {
  bedrooms: 3,
  bathrooms: 2,
  budget: 2500000,
  location: 'Nairobi',
  style: 'modern',
  plot_size: 50
};

const designs = await fetch('/api/designs/generate/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
  },
  body: JSON.stringify(designRequest)
});
```

### Create Quotation

```python
# Backend service
from jmss.apps.quotation.services import QuotationService

service = QuotationService()
quotation = service.generate_quotation(
    design_id='design_123',
    location='nairobi',
    specifications={
        'finishes': 'standard',
        'fixtures': 'mid-range'
    }
)
```

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm test
npm run test:coverage
```

### Backend Tests
```bash
cd backend
python manage.py test
pytest --cov=jmss
```

### Integration Tests
```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

## 🚀 Deployment

### Production Deployment

1. **Build and deploy with Docker:**
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy to production
docker-compose -f docker-compose.prod.yml up -d
```

2. **Kubernetes deployment:**
```bash
# Apply configurations
kubectl apply -f infrastructure/kubernetes/

# Check deployment status
kubectl get pods -n jmss-production
```

3. **Terraform infrastructure:**
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

### Environment-Specific Configurations

**Development:**
- SQLite database
- Local file storage
- Debug mode enabled
- Hot reloading

**Production:**
- PostgreSQL with replication
- AWS S3 for file storage
- Redis cluster
- SSL termination
- CDN integration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test` and `python manage.py test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Standards

- **Frontend**: ESLint + Prettier configuration
- **Backend**: Black + Flake8 for Python
- **Commits**: Conventional Commits format
- **Documentation**: JSDoc for JavaScript, Sphinx for Python

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Documentation](docs/API_SPEC.yaml)
- [User Guide](docs/USER_GUIDE.md)

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/your-org/jm-structural-solutions/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/jm-structural-solutions/discussions)
- **Email**: support@jmstructural.co.ke

## 🎯 Roadmap

### Version 1.1 (Q2 2025)
- [ ] Mobile applications (iOS/Android)
- [ ] Advanced 3D rendering engine
- [ ] Real-time collaboration features
- [ ] Integration with more BIM software

### Version 1.2 (Q3 2025)
- [ ] VR/AR visualization
- [ ] Blockchain-based project management
- [ ] IoT construction site monitoring
- [ ] Advanced analytics dashboard

### Version 2.0 (Q4 2025)
- [ ] Multi-country support (Uganda, Tanzania)
- [ ] AI-powered project scheduling
- [ ] Automated permit application system
- [ ] Contractor marketplace integration

## 👥 Team

- **Lead Developer**: JM Structural Solutions Team
- **AI/ML Engineer**: [Name]
- **Frontend Developer**: [Name]
- **Backend Developer**: [Name]
- **DevOps Engineer**: [Name]

## 🙏 Acknowledgments

- Kenya Association of Building and Civil Engineering Contractors (KABCEC)
- Institute of Engineers of Kenya (IEK)
- National Construction Authority (NCA)
- Open source community contributors

---

**JM Structural Solutions** - Building the future of construction in Kenya with AI-powered precision.

For more information, visit: [https://jmstructural.co.ke](https://jmstructural.co.ke)
