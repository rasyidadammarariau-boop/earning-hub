import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, CompletedOffer, Withdrawal } from '@/types';

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (email: string, password: string) => {
        if (email && password.length >= 6) {
          const existingUser = localStorage.getItem(`user_${email}`);
          if (existingUser) {
            const user = JSON.parse(existingUser);
            set({ user, isAuthenticated: true });
            return true;
          }
          const newUser: User = {
            id: crypto.randomUUID(),
            email,
            name: email.split('@')[0],
            balance: 0,
            completedOffers: [],
            withdrawals: [],
            createdAt: new Date(),
          };
          localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
          set({ user: newUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      register: (email: string, password: string, name: string) => {
        if (email && password.length >= 6 && name) {
          const newUser: User = {
            id: crypto.randomUUID(),
            email,
            name,
            balance: 0,
            completedOffers: [],
            withdrawals: [],
            createdAt: new Date(),
          };
          localStorage.setItem(`user_${email}`, JSON.stringify(newUser));
          set({ user: newUser, isAuthenticated: true });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      
      completeOffer: (offerId: number, offerName: string, payout: number) => {
        const { user } = get();
        if (user && !user.completedOffers.some(o => o.offerId === offerId)) {
          const completedOffer: CompletedOffer = {
            offerId,
            offerName,
            payout,
            completedAt: new Date(),
          };
          const updatedUser = {
            ...user,
            balance: user.balance + payout,
            completedOffers: [...user.completedOffers, completedOffer],
          };
          localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
          set({ user: updatedUser });
        }
      },

      updateProfile: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          const updatedUser = { ...user, ...data };
          localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
          set({ user: updatedUser });
        }
      },

      requestWithdrawal: (amount: number, method: string, accountInfo: string) => {
        const { user } = get();
        if (user && amount >= 10 && amount <= user.balance) {
          const withdrawal: Withdrawal = {
            id: crypto.randomUUID(),
            amount,
            method,
            accountInfo,
            status: 'pending',
            createdAt: new Date(),
          };
          const updatedUser = {
            ...user,
            balance: user.balance - amount,
            withdrawals: [...user.withdrawals, withdrawal],
          };
          localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
          set({ user: updatedUser });
          return true;
        }
        return false;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
