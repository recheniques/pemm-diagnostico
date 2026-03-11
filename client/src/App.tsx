import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { LandingScreen } from "./components/LandingScreen";

function App() {
  const [appState, setAppState] = useState<'landing' | 'assessment'>('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedEvaluation, setHasCompletedEvaluation] = useState(false);

  useEffect(() => {
    // Check if URL has reset parameter to force landing screen
    const params = new URLSearchParams(window.location.search);
    const shouldReset = params.get('reset') === 'true';
    
    if (shouldReset) {
      // Clear all localStorage and show landing
      localStorage.removeItem('pemm_app_state');
      localStorage.removeItem('pemm_tier');
      localStorage.removeItem('pemm_responses');
      localStorage.removeItem('pemm_completed_evaluation');
      setAppState('landing');
    } else {
      const savedState = localStorage.getItem('pemm_app_state');
      const completedEval = localStorage.getItem('pemm_completed_evaluation');
      if (completedEval === 'true') {
        setHasCompletedEvaluation(true);
      }
      if (savedState === 'assessment') {
        setAppState('assessment');
      }
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-editorial-sand flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-executive-forest border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-carbon-ink font-semibold">Cargando...</p>
        </div>
      </div>
    );
  }

  if (appState === 'landing') {
    return (
      <LandingScreen
        onFreemium={() => {
          localStorage.setItem('pemm_app_state', 'assessment');
          localStorage.setItem('pemm_tier', 'freemium');
          setAppState('assessment');
        }}
        onPremium={() => {
          localStorage.setItem('pemm_app_state', 'assessment');
          localStorage.setItem('pemm_tier', 'premium');
          setAppState('assessment');
        }}
        onNewEvaluation={() => {
          localStorage.removeItem('pemm_responses');
          localStorage.removeItem('pemm_completed_evaluation');
          localStorage.setItem('pemm_app_state', 'assessment');
          setAppState('assessment');
          setHasCompletedEvaluation(false);
        }}
        hasCompletedEvaluation={hasCompletedEvaluation}
      />
    );
  }

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Home
            onResultsReady={() => {
              localStorage.setItem('pemm_completed_evaluation', 'true');
              setHasCompletedEvaluation(true);
            }}
            onBackToLanding={() => {
              localStorage.setItem('pemm_app_state', 'landing');
              setAppState('landing');
            }}
          />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
