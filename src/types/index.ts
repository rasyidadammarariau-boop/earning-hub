export interface Offer {
  offerid: number;
  name: string;
  name_short: string;
  description: string;
  adcopy: string;
  picture: string;
  payout: string;
  country: string;
  device: string;
  link: string;
  epc: string;
}

export interface CompletedOffer {
  offerId: number;
  offerName: string;
  payout: number;
  completedAt: Date;
}

export interface Withdrawal {
  id: string;
  amount: number;
  method: string;
  accountInfo: string;
  status: 'pending' | 'processing' | 'completed' | 'rejected';
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  paymentMethod?: string;
  paymentAccount?: string;
  balance: number;
  completedOffers: CompletedOffer[];
  withdrawals: Withdrawal[];
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  completeOffer: (offerId: number, offerName: string, payout: number) => void;
  updateProfile: (data: Partial<User>) => void;
  requestWithdrawal: (amount: number, method: string, accountInfo: string) => boolean;
}
