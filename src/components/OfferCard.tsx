import { Offer } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Globe, CheckCircle, DollarSign } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useState } from "react";

interface OfferCardProps {
  offer: Offer;
}

const OfferCard = ({ offer }: OfferCardProps) => {
  const { user, completeOffer } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  const isCompleted = user?.completedOffers.some(o => o.offerId === offer.offerid);

  const handleComplete = () => {
    setIsCompleting(true);
    setTimeout(() => {
      completeOffer(offer.offerid, offer.name_short, parseFloat(offer.payout));
      toast.success(`+$${offer.payout} berhasil ditambahkan ke saldo Anda!`);
      setIsCompleting(false);
    }, 1500);
  };

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 border-border/50 ${isCompleted ? 'opacity-60' : ''}`}>
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          <div className="relative">
            <img
              src={offer.picture}
              alt={offer.name_short}
              className="w-20 h-20 rounded-xl object-cover shadow-md"
            />
            {isCompleted && (
              <div className="absolute inset-0 bg-primary/80 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {offer.name_short}
              </h3>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 shrink-0">
                <DollarSign className="w-3 h-3 mr-0.5" />
                {offer.payout}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {offer.adcopy}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="text-xs py-0">
                <Smartphone className="w-3 h-3 mr-1" />
                {offer.device}
              </Badge>
              <Badge variant="outline" className="text-xs py-0">
                <Globe className="w-3 h-3 mr-1" />
                {offer.country.split(',')[0]}
              </Badge>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <Button
            onClick={handleComplete}
            disabled={isCompleted || isCompleting}
            className={`w-full transition-all duration-300 ${
              isCompleted 
                ? 'bg-muted text-muted-foreground' 
                : 'bg-gradient-to-r from-primary to-emerald-500 hover:from-primary/90 hover:to-emerald-500/90 shadow-md hover:shadow-lg'
            }`}
          >
            {isCompleting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Memproses...
              </span>
            ) : isCompleted ? (
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Selesai
              </span>
            ) : (
              `Kerjakan +$${offer.payout}`
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OfferCard;
