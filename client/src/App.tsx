import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";

// Get the base path from Vite's import.meta.env
const base = import.meta.env.BASE_URL;

// Custom hook to handle base path
const useBasename = (base: string) => {
  return () => {
    const currentPath = window.location.pathname;
    const navigate = (to: string) => window.history.pushState(null, "", to);

    if (currentPath.startsWith(base)) {
      const path = currentPath.slice(base.length) || "/";
      return [path, (to: string) => navigate(base + to)] as [string, (to: string) => void];
    }

    return [currentPath, navigate] as [string, (to: string) => void];
  };
};

function Router() {
  return (
    <WouterRouter base={base} hook={useBasename(base)}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
