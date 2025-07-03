
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Token ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Authentication
  async login(username, password) {
    const response = await fetch(`${API_BASE_URL}/../api-token-auth/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      this.setToken(data.token);
      return data;
    }
    
    throw new Error(data.detail || 'Login failed');
  }

  // Projects
  async getProjects() {
    return this.request('/projects/');
  }

  async createProject(projectData) {
    return this.request('/projects/', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  }

  async getProject(id) {
    return this.request(`/projects/${id}/`);
  }

  async generateDesign(projectId, designParams) {
    return this.request(`/projects/${projectId}/generate_design/`, {
      method: 'POST',
      body: JSON.stringify(designParams),
    });
  }

  // Designs
  async getDesigns(projectId) {
    return this.request(`/designs/?project=${projectId}`);
  }

  async validateDesign(designId) {
    return this.request(`/designs/${designId}/validate_structure/`, {
      method: 'POST',
    });
  }

  // Materials
  async getMaterials(category = null) {
    const endpoint = category ? `/materials/?category=${category}` : '/materials/';
    return this.request(endpoint);
  }

  async getSuppliers(location = null) {
    const endpoint = location ? `/suppliers/?location=${location}` : '/suppliers/';
    return this.request(endpoint);
  }

  // Quotations
  async generateQuotation(projectId, designId) {
    return this.request('/quotations/generate/', {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId, design_id: designId }),
    });
  }

  async getQuotations(projectId) {
    return this.request(`/quotations/?project=${projectId}`);
  }

  // BIM
  async exportToIFC(designId) {
    return this.request('/bim-models/export_ifc/', {
      method: 'POST',
      body: JSON.stringify({ design_id: designId }),
    });
  }
}

export default new ApiService();
