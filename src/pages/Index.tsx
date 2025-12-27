import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowRight, CheckCircle, Zap, Shield, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Cepat & Mudah",
      description: "Kerjakan tugas sederhana dan dapatkan pembayaran instan"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Aman & Terpercaya",
      description: "Platform terverifikasi dengan pembayaran terjamin"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Komunitas Global",
      description: "Bergabung dengan jutaan pengguna dari seluruh dunia"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <DollarSign className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              CashFlow Pro
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Masuk</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-emerald-500 shadow-md">
              <Link to="/register">Daftar Gratis</Link>
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
            <CheckCircle className="w-4 h-4" />
            Sudah dipercaya 100.000+ pengguna
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Hasilkan Uang dari{" "}
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              Smartphone
            </span>{" "}
            Anda
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Kerjakan tugas sederhana, unduh aplikasi, dan selesaikan survey untuk mendapatkan penghasilan tambahan setiap hari.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")}
              className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-lg shadow-primary/30 px-8"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/login")}
              className="border-primary/30 hover:bg-primary/10"
            >
              Sudah Punya Akun?
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-400 rounded-xl flex items-center justify-center text-primary-foreground mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-br from-primary/10 to-emerald-500/10 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Statistik Kami</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">$2.5M+</p>
              <p className="text-muted-foreground mt-2">Total Dibayarkan</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">100K+</p>
              <p className="text-muted-foreground mt-2">Pengguna Aktif</p>
            </div>
            <div>
              <p className="text-4xl font-bold bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">500+</p>
              <p className="text-muted-foreground mt-2">Tugas Tersedia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border/50">
        <div className="text-center text-muted-foreground text-sm">
          © 2024 CashFlow Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
