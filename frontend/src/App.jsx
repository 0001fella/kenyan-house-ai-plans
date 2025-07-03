
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Import pages
import HomePage from './pages/HomePage';
import DesignInputPage from './pages/DesignInputPage';
import GeneratorPage from './pages/GeneratorPage';
import QuotationPage from './pages/QuotationPage';
import NotFound from './pages/NotFound';

// Context providers
import { ProjectProvider } from './contexts/ProjectContext';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log("JM Structural Solutions App starting...");
  
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectProvider>
        <BrowserRouter>
          <div className="App">
            <Toaster 
              position="top-right" 
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
            
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/design-input" element={<DesignInputPage />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/quotation" element={<QuotationPage />} />
              
              {/* Legacy routes for backward compatibility */}
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/design" element={<DesignInputPage />} />
              <Route path="/budget" element={<QuotationPage />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </ProjectProvider>
    </QueryClientProvider>
  );
};

export default App;
