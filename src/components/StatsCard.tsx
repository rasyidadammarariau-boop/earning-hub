import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  gradient: string;
}

const StatsCard = ({ title, value, icon, trend, gradient }: StatsCardProps) => {
  return (
    <Card className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className="text-xs text-primary font-medium">{trend}</p>
            )}
          </div>
          <div className={`p-3 rounded-xl ${gradient}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
