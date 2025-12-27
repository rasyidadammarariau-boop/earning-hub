import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import DashboardHeader from "./DashboardHeader";
import DashboardNav from "./DashboardNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <DashboardHeader />
      <div className="flex">
        <aside className="hidden md:block w-56 min-h-[calc(100vh-64px)] border-r border-border/50">
          <DashboardNav />
        </aside>
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
      </div>
      <div className="md:hidden">
        <DashboardNav />
      </div>
    </div>
  );
};

export default DashboardLayout;
