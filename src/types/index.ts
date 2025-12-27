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

export interface User {
  id: string;
  email: string;
  name: string;
  balance: number;
  completedOffers: number[];
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, name: string) => boolean;
  logout: () => void;
  completeOffer: (offerId: number, payout: number) => void;
}
