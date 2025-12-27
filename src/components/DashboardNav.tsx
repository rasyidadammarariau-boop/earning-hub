import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Home, History, Wallet, User, LayoutDashboard } from "lucide-react";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/history", label: "Riwayat", icon: History },
  { path: "/withdraw", label: "Penarikan", icon: Wallet },
  { path: "/profile", label: "Profil", icon: User },
];

const DashboardNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-t border-border/50 md:relative md:border-t-0 md:border-r md:h-auto">
      <div className="flex md:flex-col justify-around md:justify-start md:gap-1 p-2 md:p-4">
        <Link
          to="/"
          className="flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs md:text-sm">Home</span>
        </Link>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col md:flex-row items-center gap-1 md:gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/10"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs md:text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default DashboardNav;
