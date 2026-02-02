import { useState } from "react";
import "@/App.css";
import LandingPage from "@/components/LandingPage";
import Dashboard from "@/components/Dashboard";
import { Toaster } from "@/components/ui/toaster";

function App() {
  const [currentView, setCurrentView] = useState("landing");

  return (
    <div className="App">
      <Toaster />
      {currentView === "landing" ? (
        <LandingPage onNavigateToDashboard={() => setCurrentView("dashboard")} />
      ) : (
        <Dashboard onNavigateToLanding={() => setCurrentView("landing")} />
      )}
    </div>
  );
}

export default App;
