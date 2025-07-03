
import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  currentProject: null,
  projects: [],
  isLoading: false,
  error: null,
  selectedDesign: null,
  quotation: null,
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_PROJECT: 'SET_CURRENT_PROJECT',
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  SET_SELECTED_DESIGN: 'SET_SELECTED_DESIGN',
  SET_QUOTATION: 'SET_QUOTATION',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const projectReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    
    case ActionTypes.CLEAR_ERROR:
      return { ...state, error: null };
    
    case ActionTypes.SET_CURRENT_PROJECT:
      return { ...state, currentProject: action.payload };
    
    case ActionTypes.SET_PROJECTS:
      return { ...state, projects: action.payload };
    
    case ActionTypes.ADD_PROJECT:
      return { 
        ...state, 
        projects: [...state.projects, action.payload],
        currentProject: action.payload 
      };
    
    case ActionTypes.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map(p => 
          p.id === action.payload.id ? action.payload : p
        ),
        currentProject: state.currentProject?.id === action.payload.id 
          ? action.payload 
          : state.currentProject
      };
    
    case ActionTypes.SET_SELECTED_DESIGN:
      return { ...state, selectedDesign: action.payload };
    
    case ActionTypes.SET_QUOTATION:
      return { ...state, quotation: action.payload };
    
    default:
      return state;
  }
};

// Context
const ProjectContext = createContext();

// Provider component
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState);

  // Load projects from localStorage on mount
  useEffect(() => {
    try {
      const savedProjects = localStorage.getItem('jmss_projects');
      if (savedProjects) {
        const projects = JSON.parse(savedProjects);
        dispatch({ type: ActionTypes.SET_PROJECTS, payload: projects });
      }
    } catch (error) {
      console.error('Failed to load projects from localStorage:', error);
    }
  }, []);

  // Save projects to localStorage when projects change
  useEffect(() => {
    try {
      localStorage.setItem('jmss_projects', JSON.stringify(state.projects));
    } catch (error) {
      console.error('Failed to save projects to localStorage:', error);
    }
  }, [state.projects]);

  // Actions
  const actions = {
    setLoading: (loading) => {
      dispatch({ type: ActionTypes.SET_LOADING, payload: loading });
    },

    setError: (error) => {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error });
    },

    clearError: () => {
      dispatch({ type: ActionTypes.CLEAR_ERROR });
    },

    setCurrentProject: (project) => {
      dispatch({ type: ActionTypes.SET_CURRENT_PROJECT, payload: project });
    },

    addProject: (project) => {
      const newProject = {
        ...project,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        status: 'planning'
      };
      dispatch({ type: ActionTypes.ADD_PROJECT, payload: newProject });
      return newProject;
    },

    updateProject: (project) => {
      dispatch({ type: ActionTypes.UPDATE_PROJECT, payload: project });
    },

    setSelectedDesign: (design) => {
      dispatch({ type: ActionTypes.SET_SELECTED_DESIGN, payload: design });
    },

    setQuotation: (quotation) => {
      dispatch({ type: ActionTypes.SET_QUOTATION, payload: quotation });
    },

    generateDesign: async (requirements) => {
      actions.setLoading(true);
      actions.clearError();
      
      try {
        // Simulate API call to backend
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Mock generated designs
        const designs = [
          {
            id: `design_${Date.now()}`,
            name: `${requirements.bedrooms}BR ${requirements.style} House`,
            description: `AI-generated ${requirements.bedrooms}-bedroom house design`,
            bedrooms: requirements.bedrooms,
            bathrooms: requirements.bathrooms,
            area: `${120 + requirements.bedrooms * 15} m²`,
            cost: `${2000000 + requirements.bedrooms * 500000}`,
            style: requirements.style,
            floors: requirements.floors || 1,
            validation: {
              is_valid: true,
              compliance_score: 95,
              violations: [],
              warnings: []
            }
          },
          {
            id: `design_${Date.now() + 1}`,
            name: `${requirements.bedrooms}BR ${requirements.style} House - Compact`,
            description: `Compact ${requirements.bedrooms}-bedroom design`,
            bedrooms: requirements.bedrooms,
            bathrooms: requirements.bathrooms,
            area: `${100 + requirements.bedrooms * 12} m²`,
            cost: `${1800000 + requirements.bedrooms * 400000}`,
            style: requirements.style,
            floors: requirements.floors || 1,
            validation: {
              is_valid: true,
              compliance_score: 88,
              violations: [],
              warnings: ['Bedroom 2 slightly below recommended size']
            }
          }
        ];

        return designs;
      } catch (error) {
        actions.setError('Failed to generate designs');
        throw error;
      } finally {
        actions.setLoading(false);
      }
    },

    generateQuotation: async (design) => {
      actions.setLoading(true);
      actions.clearError();
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const quotation = {
          project_id: `PJT-${Date.now()}`,
          design_id: design.id,
          currency: 'KES',
          items: [
            {
              item_code: 'E101',
              description: 'Excavation to formation level',
              unit: 'm3',
              quantity: 150,
              unit_rate: 150.00,
              total: 22500,
              category: 'Earthworks'
            },
            {
              item_code: 'C203',
              description: 'Concrete class 25/20',
              unit: 'm3',
              quantity: 45,
              unit_rate: 8500.00,
              total: 382500,
              category: 'Structural Concrete'
            },
            {
              item_code: 'F506',
              description: 'Formwork to soffits of slabs',
              unit: 'm2',
              quantity: 120,
              unit_rate: 420.00,
              total: 50400,
              category: 'Formwork'
            }
          ],
          totals: {
            subtotal: 455400,
            tax_percent: 16,
            tax_amount: 72864,
            grand_total: 528264
          },
          generated_at: new Date().toISOString()
        };

        actions.setQuotation(quotation);
        return quotation;
      } catch (error) {
        actions.setError('Failed to generate quotation');
        throw error;
      } finally {
        actions.setLoading(false);
      }
    }
  };

  const value = {
    ...state,
    ...actions
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

// Hook to use the context
export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export default ProjectContext;
