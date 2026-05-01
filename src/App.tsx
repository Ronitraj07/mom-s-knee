import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< vercel/install-and-configure-vercel-w-11qbp8
import { Analytics } from "@vercel/analytics/react";
=======
import { AuthProvider } from "@/hooks/useAuth";
import RequireAdmin from "@/components/admin/RequireAdmin";
import AdminLayout from "@/components/admin/AdminLayout";
>>>>>>> main
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Overview from "./pages/admin/Overview";
import SiteContent from "./pages/admin/SiteContent";
import ContactSubmissions from "./pages/admin/ContactSubmissions";
import Waitlist from "./pages/admin/Waitlist";
import Media from "./pages/admin/Media";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<Overview />} />
              <Route path="content" element={<SiteContent />} />
              <Route path="contact" element={<ContactSubmissions />} />
              <Route path="waitlist" element={<Waitlist />} />
              <Route path="media" element={<Media />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
