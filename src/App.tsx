import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import PageTransition from "@/components/PageTransition";
import { usePageTracking } from "@/hooks/usePageTracking";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const WhatWeFund = lazy(() => import("./pages/WhatWeFund"));
const HowItWorksPage = lazy(() => import("./pages/HowItWorksPage"));
const ForAttorneys = lazy(() => import("./pages/ForAttorneys"));
const ForBrokers = lazy(() => import("./pages/ForBrokers"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminSubmissions = lazy(() => import("./pages/admin/Submissions"));
const AdminTrash = lazy(() => import("./pages/admin/Trash"));
const AdminContent = lazy(() => import("./pages/admin/Content"));
const AdminAnalytics = lazy(() => import("./pages/admin/Analytics"));
const AdminBlogManager = lazy(() => import("./pages/admin/BlogManager"));
const AdminAccountSettings = lazy(() => import("./pages/admin/AccountSettings"));

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

// Wrapper component to use hooks that need Router context
const AppRoutes = () => {
  usePageTracking();
  
  return (
    <Suspense fallback={<PageLoader />}>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/what-we-fund" element={<WhatWeFund />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/for-attorneys" element={<ForAttorneys />} />
          <Route path="/for-brokers" element={<ForBrokers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="submissions" element={<AdminSubmissions />} />
            <Route path="trash" element={<AdminTrash />} />
            <Route path="content" element={<AdminContent />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="blog" element={<AdminBlogManager />} />
            <Route path="account" element={<AdminAccountSettings />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </Suspense>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
