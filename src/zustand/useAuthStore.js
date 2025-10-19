// src/zustand/useAuthStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => ({
            user: null,

            // Login: set the user object
            login: (userData) => set({ user: userData }),

            // Logout: clear the user
            logout: () => set({ user: null }),
        }),
        {
            name: 'auth-storage', // storage key
            getStorage: () => localStorage,
        }
    )
);

export default useAuthStore;
