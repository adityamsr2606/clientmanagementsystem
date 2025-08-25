
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DentalProvider } from "./contexts/DentalContext";
import DentalLayout from "./components/dental/DentalLayout";
import HomePage from "./components/dental/HomePage";
import ServicesPage from "./components/dental/ServicesPage";
import TeamPage from "./components/dental/TeamPage";
import ContactPage from "./components/dental/ContactPage";
import BookAppointmentPage from "./components/dental/BookAppointmentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <DentalProvider>
        <BrowserRouter>
          <Routes>
            {/* Dental Website Routes */}
            <Route path="/" element={<DentalLayout />}>
              <Route index element={<HomePage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="book-appointment" element={<BookAppointmentPage />} />
            </Route>
            
            {/* Catch all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </DentalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
