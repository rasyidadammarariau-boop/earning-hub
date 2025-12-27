import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User } from '@/types';

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      
      login: (email: string, password: string) => {
        // Dummy login - accepts any email/password with basic validation
        if (email && password.length >= 6) {
          const existingUser = localStorage.getItem(`user_${email}`);
          if (existingUser) {
            const user = JSON.parse(existingUser);
            set({ user, isAuthenticated: true });
            return true;
          }
          // Create new user on first login
          const newUser: User = {
            id: crypto.randomUUID(),
            email,
            name: email.split('@')[0],
            balance: 0,
            completedOffers: [],
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
      
      completeOffer: (offerId: number, payout: number) => {
        const { user } = get();
        if (user && !user.completedOffers.includes(offerId)) {
          const updatedUser = {
            ...user,
            balance: user.balance + payout,
            completedOffers: [...user.completedOffers, offerId],
          };
          localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedUser));
          set({ user: updatedUser });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
