import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, Mail, Phone, Wallet, Calendar, Save } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [paymentMethod, setPaymentMethod] = useState(user?.paymentMethod || "");
  const [paymentAccount, setPaymentAccount] = useState(user?.paymentAccount || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error("Nama tidak boleh kosong");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      updateProfile({
        name: name.trim(),
        phone: phone.trim(),
        paymentMethod,
        paymentAccount: paymentAccount.trim(),
      });
      toast.success("Profil berhasil diperbarui!");
      setIsLoading(false);
    }, 500);
  };

  const totalEarned = user?.completedOffers.reduce((sum, o) => sum + o.payout, 0) || 0;
  const totalWithdrawn = user?.withdrawals
    .filter(w => w.status === 'completed')
    .reduce((sum, w) => sum + w.amount, 0) || 0;

  return (
    <DashboardLayout>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profil Saya</h1>
          <p className="text-muted-foreground mt-1">
            Kelola informasi akun dan preferensi pembayaran
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Summary */}
          <Card className="lg:col-span-1 border-border/50">
            <CardContent className="p-6 text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-400 text-primary-foreground text-3xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground text-sm">{user?.email}</p>
              
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Saldo Tersedia</p>
                  <p className="text-2xl font-bold text-primary">${user?.balance.toFixed(2)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Total Penghasilan</p>
                    <p className="text-lg font-semibold text-foreground">${totalEarned.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Total Ditarik</p>
                    <p className="text-lg font-semibold text-foreground">${totalWithdrawn.toFixed(2)}</p>
                  </div>
                </div>

                <div className="text-left space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Bergabung: {user?.createdAt ? format(new Date(user.createdAt), "dd MMM yyyy", { locale: id }) : '-'}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Wallet className="w-4 h-4" />
                    Tugas selesai: {user?.completedOffers.length || 0}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="lg:col-span-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Edit Profil
              </CardTitle>
              <CardDescription>
                Perbarui informasi pribadi dan preferensi pembayaran Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email}
                      disabled
                      className="bg-muted/50"
                    />
                    <p className="text-xs text-muted-foreground">Email tidak dapat diubah</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Nomor Telepon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="08xxxxxxxxxx"
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Wallet className="w-4 h-4" />
                      Metode Pembayaran Default
                    </Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Pilih metode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="dana">DANA</SelectItem>
                        <SelectItem value="gopay">GoPay</SelectItem>
                        <SelectItem value="ovo">OVO</SelectItem>
                        <SelectItem value="bank">Transfer Bank</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="paymentAccount">
                      {paymentMethod === 'paypal' ? 'Email PayPal' : 
                       paymentMethod === 'bank' ? 'Nomor Rekening' : 
                       paymentMethod ? 'Nomor HP untuk ' + paymentMethod.toUpperCase() : 'Akun Pembayaran'}
                    </Label>
                    <Input
                      id="paymentAccount"
                      type="text"
                      value={paymentAccount}
                      onChange={(e) => setPaymentAccount(e.target.value)}
                      placeholder={
                        paymentMethod === 'paypal' ? 'email@paypal.com' : 
                        paymentMethod === 'bank' ? 'Nama Bank - No. Rekening - Atas Nama' : 
                        paymentMethod ? '08xxxxxxxxxx' : 'Pilih metode pembayaran terlebih dahulu'
                      }
                      disabled={!paymentMethod}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90"
                  disabled={isLoading}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
