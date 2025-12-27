import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DollarSign, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  Users, 
  Smartphone,
  TrendingUp,
  Star,
  Gift,
  Clock,
  CreditCard
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Cepat & Mudah",
      description: "Selesaikan tugas dalam hitungan menit dan dapatkan pembayaran instan ke akun Anda"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Aman",
      description: "Platform terenkripsi dengan sistem keamanan tingkat tinggi untuk melindungi data Anda"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Komunitas Global",
      description: "Bergabung dengan 100.000+ pengguna aktif dari seluruh dunia"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Pembayaran Fleksibel",
      description: "Tarik saldo ke PayPal, DANA, GoPay, OVO, atau transfer bank"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Kapan Saja",
      description: "Kerjakan tugas 24/7 sesuai waktu luang Anda tanpa batasan"
    },
    {
      icon: <Gift className="w-6 h-6" />,
      title: "Bonus Harian",
      description: "Dapatkan bonus tambahan setiap hari dengan menyelesaikan target tugas"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Daftar Gratis",
      description: "Buat akun dalam 30 detik tanpa biaya apapun"
    },
    {
      number: "02",
      title: "Pilih Tugas",
      description: "Pilih dari ratusan tugas yang tersedia sesuai minat Anda"
    },
    {
      number: "03",
      title: "Kerjakan",
      description: "Selesaikan tugas sederhana seperti unduh aplikasi atau survey"
    },
    {
      number: "04",
      title: "Tarik Saldo",
      description: "Tarik penghasilan Anda mulai dari $10 ke berbagai metode"
    }
  ];

  const testimonials = [
    {
      name: "Andi Pratama",
      role: "Mahasiswa",
      content: "Sangat membantu untuk uang jajan tambahan. Sudah dapat $50 dalam sebulan!",
      rating: 5
    },
    {
      name: "Siti Rahayu",
      role: "Ibu Rumah Tangga",
      content: "Bisa dikerjakan sambil mengurus rumah. Pembayaran selalu tepat waktu.",
      rating: 5
    },
    {
      name: "Budi Santoso",
      role: "Freelancer",
      content: "Platform terpercaya dengan tugas yang mudah. Recommended!",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Decorative Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 gradient-primary rounded-xl flex items-center justify-center shadow-lg gradient-glow">
                <DollarSign className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-gradient">
                CashFlow Pro
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild className="hidden sm:flex">
                <Link to="/login">Masuk</Link>
              </Button>
              <Button asChild className="gradient-primary gradient-glow hover:opacity-90 transition-opacity">
                <Link to="/register">
                  <span className="hidden sm:inline">Daftar Gratis</span>
                  <span className="sm:hidden">Daftar</span>
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-8">
              <CheckCircle className="w-4 h-4" />
              <span>Sudah dipercaya 100.000+ pengguna aktif</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up-delay-1">
            Hasilkan Uang dari{" "}
            <span className="text-gradient">Smartphone</span>{" "}
            Anda
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay-2">
            Kerjakan tugas sederhana, unduh aplikasi, dan selesaikan survey untuk mendapatkan penghasilan tambahan setiap hari. Mulai gratis sekarang!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
            <Button 
              size="lg" 
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto gradient-primary gradient-glow hover:opacity-90 transition-all px-8 py-6 text-lg"
            >
              Mulai Menghasilkan
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/login")}
              className="w-full sm:w-auto border-border hover:bg-accent hover:border-primary/30 px-8 py-6 text-lg"
            >
              Sudah Punya Akun?
            </Button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gradient">$2.5M+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Dibayarkan</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-2xl sm:text-3xl font-bold text-gradient">100K+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Pengguna</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-gradient">500+</p>
              <p className="text-xs sm:text-sm text-muted-foreground">Tugas</p>
            </div>
          </div>
        </div>

        {/* Floating Phone Illustration */}
        <div className="relative mt-16 flex justify-center">
          <div className="relative animate-float">
            <div className="w-64 h-[500px] bg-gradient-to-b from-card to-muted rounded-[3rem] border-4 border-border shadow-2xl overflow-hidden">
              <div className="h-8 bg-muted flex items-center justify-center">
                <div className="w-20 h-4 bg-border rounded-full" />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-xl">
                  <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">TikTok</div>
                    <div className="text-xs text-muted-foreground">+$0.45</div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Gift className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Spotify</div>
                    <div className="text-xs text-muted-foreground">+$0.55</div>
                  </div>
                  <Button size="sm" className="gradient-primary text-xs h-7">Kerjakan</Button>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent rounded-xl">
                  <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Amazon</div>
                    <div className="text-xs text-muted-foreground">+$0.30</div>
                  </div>
                  <Button size="sm" className="gradient-primary text-xs h-7">Kerjakan</Button>
                </div>
                <div className="mt-4 p-4 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-xl text-center border border-primary/20">
                  <p className="text-xs text-muted-foreground">Total Saldo</p>
                  <p className="text-2xl font-bold text-gradient">$24.50</p>
                </div>
              </div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-emerald-500/20 rounded-[4rem] blur-2xl -z-10" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Cara Kerjanya</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Empat langkah mudah untuk mulai menghasilkan uang dari smartphone Anda
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 h-full">
                <span className="text-5xl font-bold text-gradient opacity-30">{step.number}</span>
                <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-primary/30 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Mengapa Memilih Kami?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Platform terpercaya dengan berbagai keunggulan untuk memaksimalkan penghasilan Anda
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="group border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center text-primary-foreground mb-5 group-hover:scale-110 transition-transform duration-300 gradient-glow">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-24 border-t border-border/50">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Apa Kata Mereka?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Ribuan pengguna sudah merasakan manfaatnya
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-12 text-center">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Siap Mulai Menghasilkan?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Bergabung dengan ribuan pengguna lainnya dan mulai dapatkan penghasilan tambahan hari ini
            </p>
            <Button 
              size="lg"
              onClick={() => navigate("/register")}
              className="bg-background text-primary hover:bg-background/90 shadow-xl px-8 py-6 text-lg"
            >
              Daftar Gratis Sekarang
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-gradient">CashFlow Pro</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link to="#" className="hover:text-primary transition-colors">Tentang Kami</Link>
              <Link to="#" className="hover:text-primary transition-colors">FAQ</Link>
              <Link to="#" className="hover:text-primary transition-colors">Kontak</Link>
              <Link to="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            © 2024 CashFlow Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
