import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const History = () => {
  const { user } = useAuth();

  const sortedHistory = [...(user?.completedOffers || [])].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  const totalEarned = sortedHistory.reduce((sum, offer) => sum + offer.payout, 0);

  return (
    <DashboardLayout>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Riwayat Tugas</h1>
          <p className="text-muted-foreground mt-1">
            Lihat semua tugas yang telah Anda selesaikan
          </p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8 bg-gradient-to-br from-primary/10 to-emerald-500/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Penghasilan</p>
                <p className="text-3xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                  ${totalEarned.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Tugas Selesai</p>
                <p className="text-3xl font-bold text-foreground">{sortedHistory.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        {sortedHistory.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Belum Ada Riwayat</h3>
              <p className="text-muted-foreground">
                Mulai kerjakan tugas untuk melihat riwayat di sini
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((offer, index) => (
              <Card key={`${offer.offerId}-${index}`} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{offer.offerName}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(offer.completedAt), "dd MMM yyyy, HH:mm", { locale: id })}
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-0">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      +{offer.payout.toFixed(2)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default History;
