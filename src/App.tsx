import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { WelcomeWizard } from "@/components/WelcomeWizard";
import Dashboard from "./pages/Dashboard";
import Funil from "./pages/Funil";
import Relatorios from "./pages/Relatorios";
import Robo from "./pages/Robo";
import Equipe from "./pages/Equipe";
import Configuracoes from "./pages/Configuracoes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isWizardCompleted, setIsWizardCompleted] = useState(false);

  // Se o wizard não foi completado, mostra apenas o wizard
  if (!isWizardCompleted) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <WelcomeWizard onComplete={() => setIsWizardCompleted(true)} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Depois do wizard, mostra a aplicação completa
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/funil" element={<Funil />} />
              <Route path="/relatorios" element={<Relatorios />} />
              <Route path="/robo" element={<Robo />} />
              <Route path="/equipe" element={<Equipe />} />
              <Route path="/configuracoes" element={<Configuracoes />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
