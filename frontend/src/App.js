import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/App.css";
import Edu9LandingPage from "@/components/Edu9LandingPage";
import Dashboard from "@/components/Dashboard";
import CollegeDetail from "@/components/CollegeDetail";
import PaymentStructure from "@/components/PaymentStructure";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [currentView, setCurrentView] = useState("landing");

  return (
    <BrowserRouter>
      <div className="App">
        <Toaster />
        <Routes>
          {/* Landing Page */}
          <Route 
            path="/" 
            element={<Edu9LandingPage onNavigateToDashboard={() => setCurrentView("dashboard")} />} 
          />
          
          {/* Dashboard */}
          <Route 
            path="/dashboard" 
            element={<Dashboard onNavigateToLanding={() => setCurrentView("landing")} />} 
          />
          
          {/* Payment Structure Page */}
          <Route 
            path="/payment-structure" 
            element={<PaymentStructure />} 
          />
          
          {/* Individual College Pages */}
          <Route 
            path="/college/:slug" 
            element={<CollegeDetail />} 
          />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
