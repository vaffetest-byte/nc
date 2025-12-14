import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const WhatWeFund = lazy(() => import("./pages/WhatWeFund"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const ForAttorneys = lazy(() => import("./pages/ForAttorneys"));
const ForBrokers = lazy(() => import("./pages/ForBrokers"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading spinner component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      <span className="text-muted-foreground text-sm">Loading...</span>
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <PageTransition>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/what-we-fund" element={<WhatWeFund />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/for-attorneys" element={<ForAttorneys />} />
                <Route path="/for-brokers" element={<ForBrokers />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
