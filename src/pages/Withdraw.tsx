import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Wallet, AlertCircle, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const Withdraw = () => {
  const { user, requestWithdrawal } = useAuth();
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [accountInfo, setAccountInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const minWithdraw = 10;
  const canWithdraw = (user?.balance || 0) >= minWithdraw;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const withdrawAmount = parseFloat(amount);
    
    if (!method) {
      toast.error("Pilih metode pembayaran");
      return;
    }
    
    if (!accountInfo) {
      toast.error("Masukkan informasi akun");
      return;
    }
    
    if (withdrawAmount < minWithdraw) {
      toast.error(`Minimal penarikan $${minWithdraw}`);
      return;
    }
    
    if (withdrawAmount > (user?.balance || 0)) {
      toast.error("Saldo tidak mencukupi");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const success = requestWithdrawal(withdrawAmount, method, accountInfo);
      if (success) {
        toast.success("Permintaan penarikan berhasil diajukan!");
        setAmount("");
        setAccountInfo("");
        setMethod("");
      } else {
        toast.error("Gagal mengajukan penarikan");
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/30"><Clock className="w-3 h-3 mr-1" />Menunggu</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/30"><Clock className="w-3 h-3 mr-1" />Diproses</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30"><CheckCircle className="w-3 h-3 mr-1" />Selesai</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-600 border-red-500/30"><XCircle className="w-3 h-3 mr-1" />Ditolak</Badge>;
      default:
        return null;
    }
  };

  const sortedWithdrawals = [...(user?.withdrawals || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <DashboardLayout>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Penarikan Saldo</h1>
          <p className="text-muted-foreground mt-1">
            Tarik saldo Anda ke rekening bank atau e-wallet
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Withdraw Form */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Ajukan Penarikan
              </CardTitle>
              <CardDescription>
                Minimal penarikan ${minWithdraw}. Saldo Anda: <span className="font-semibold text-primary">${user?.balance.toFixed(2)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!canWithdraw && (
                <div className="mb-6 p-4 bg-destructive/10 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-destructive">Saldo Tidak Mencukupi</p>
                    <p className="text-sm text-muted-foreground">
                      Anda memerlukan minimal ${minWithdraw} untuk melakukan penarikan. Kerjakan lebih banyak tugas untuk menambah saldo.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label>Jumlah Penarikan ($)</Label>
                  <Input
                    type="number"
                    placeholder="Minimal $10"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min={minWithdraw}
                    max={user?.balance}
                    step="0.01"
                    disabled={!canWithdraw}
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Metode Pembayaran</Label>
                  <Select value={method} onValueChange={setMethod} disabled={!canWithdraw}>
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

                <div className="space-y-2">
                  <Label>
                    {method === 'paypal' ? 'Email PayPal' : 
                     method === 'bank' ? 'Nomor Rekening' : 
                     method ? 'Nomor HP' : 'Informasi Akun'}
                  </Label>
                  <Input
                    type="text"
                    placeholder={
                      method === 'paypal' ? 'email@paypal.com' : 
                      method === 'bank' ? 'Nama Bank - No. Rekening - Atas Nama' : 
                      method ? '08xxxxxxxxxx' : 'Pilih metode terlebih dahulu'
                    }
                    value={accountInfo}
                    onChange={(e) => setAccountInfo(e.target.value)}
                    disabled={!canWithdraw || !method}
                    className="bg-background/50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90"
                  disabled={!canWithdraw || isLoading}
                >
                  {isLoading ? "Memproses..." : "Ajukan Penarikan"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Withdrawal History */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Riwayat Penarikan</CardTitle>
              <CardDescription>
                Status permintaan penarikan Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedWithdrawals.length === 0 ? (
                <div className="text-center py-8">
                  <Wallet className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">Belum ada riwayat penarikan</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {sortedWithdrawals.map((withdrawal) => (
                    <div 
                      key={withdrawal.id} 
                      className="p-4 border border-border/50 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-foreground flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {withdrawal.amount.toFixed(2)}
                        </span>
                        {getStatusBadge(withdrawal.status)}
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>{withdrawal.method.toUpperCase()} - {withdrawal.accountInfo}</p>
                        <p>{format(new Date(withdrawal.createdAt), "dd MMM yyyy, HH:mm", { locale: id })}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Withdraw;
