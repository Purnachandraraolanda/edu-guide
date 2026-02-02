import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@/App.css";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import CollegeDetail from "@/components/CollegeDetail";
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
            element={<LandingPage onNavigateToDashboard={() => setCurrentView("dashboard")} />} 
          />
          
          {/* Dashboard */}
          <Route 
            path="/dashboard" 
            element={<Dashboard onNavigateToLanding={() => setCurrentView("landing")} />} 
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
