import { useAuth } from "@/hooks/useAuth";
import { dummyOffers } from "@/data/offers";
import DashboardLayout from "@/components/DashboardLayout";
import OfferCard from "@/components/OfferCard";
import StatsCard from "@/components/StatsCard";
import { Wallet, Target, TrendingUp, Gift } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const completedIds = user.completedOffers.map(o => o.offerId);
  const completedCount = completedIds.length;
  const availableOffers = dummyOffers.filter(o => !completedIds.includes(o.offerid));
  const potentialEarnings = availableOffers.reduce((sum, o) => sum + parseFloat(o.payout), 0);

  return (
    <DashboardLayout>
      <div className="container px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Selamat datang, <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">{user.name}</span>! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Kerjakan tugas dan dapatkan penghasilan
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Saldo"
            value={`$${user.balance.toFixed(2)}`}
            icon={<Wallet className="w-6 h-6 text-primary-foreground" />}
            gradient="bg-gradient-to-br from-primary to-emerald-500"
            trend="+12% dari kemarin"
          />
          <StatsCard
            title="Tugas Selesai"
            value={completedCount.toString()}
            icon={<Target className="w-6 h-6 text-primary-foreground" />}
            gradient="bg-gradient-to-br from-blue-500 to-cyan-400"
          />
          <StatsCard
            title="Potensi Penghasilan"
            value={`$${potentialEarnings.toFixed(2)}`}
            icon={<TrendingUp className="w-6 h-6 text-primary-foreground" />}
            gradient="bg-gradient-to-br from-orange-500 to-amber-400"
          />
          <StatsCard
            title="Tugas Tersedia"
            value={availableOffers.length.toString()}
            icon={<Gift className="w-6 h-6 text-primary-foreground" />}
            gradient="bg-gradient-to-br from-purple-500 to-pink-400"
          />
        </div>

        {/* Offers Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Tugas Tersedia</h2>
              <p className="text-sm text-muted-foreground">Pilih tugas dan mulai menghasilkan</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dummyOffers.map((offer) => (
              <OfferCard key={offer.offerid} offer={offer} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
