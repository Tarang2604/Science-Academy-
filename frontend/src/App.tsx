import React, { useState } from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { OuterCanvas } from './components/layout/OuterCanvas';
import { FloatingNavbar } from './components/layout/FloatingNavbar';
import { MobileBottomBar } from './components/layout/MobileBottomBar';
import { Footer } from './components/layout/Footer';
import { AppRoutes } from './routes/AppRoutes';
import { QuickEnquiryModal } from './components/forms/QuickEnquiryModal';

const AppContent: React.FC = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return <AppRoutes onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />;
  }

  return (
    <OuterCanvas>
      <FloatingNavbar onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />
      
      <main className="flex-1 w-full">
        <AppRoutes onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />
      </main>

      <Footer />
      
      <MobileBottomBar onOpenEnquiryModal={() => setEnquiryModalOpen(true)} />
      
      <QuickEnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
      />
    </OuterCanvas>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
