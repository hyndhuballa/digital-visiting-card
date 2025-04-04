
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/layout/Layout";

// Pages
import AuthPage from "./pages/Auth";
import HomePage from "./pages/Home";
import WalletPage from "./pages/Wallet";
import WalletCardsPage from "./pages/WalletCards";
import CardDetailsPage from "./pages/CardDetailsPage";
import AddCardPage from "./pages/AddCard";
import ContactsPage from "./pages/Contacts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/wallet/cards" element={<WalletCardsPage />} />
              <Route path="/wallet/card/:id" element={<CardDetailsPage />} />
              <Route path="/add-card" element={<AddCardPage />} />
              <Route path="/contacts" element={<ContactsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
