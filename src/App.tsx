import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "@/components/AppLayout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "@/pages/LoginPage";
import DashboardPage from "@/pages/DashboardPage";
import RequestsPage from "@/pages/RequestsPage";
import ProjectsPage from "@/pages/ProjectsPage";
import MPProfilePage from "@/pages/MPProfilePage";
import MPProfilesPage from "@/pages/MPProfilesPage";
import BeneficiariesPage from "@/pages/BeneficiariesPage";
import CommunicationPage from "@/pages/CommunicationPage";
import ReportsPage from "@/pages/ReportsPage";
import ConstituenciesPage from "@/pages/ConstituenciesPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/mp-profile" element={<MPProfilePage />} />
              <Route path="/mp-profiles" element={<MPProfilesPage />} />
              <Route path="/beneficiaries" element={<BeneficiariesPage />} />
              <Route path="/communication" element={<CommunicationPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/constituencies" element={<ConstituenciesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/users" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
