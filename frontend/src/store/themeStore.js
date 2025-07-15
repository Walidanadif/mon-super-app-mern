import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false, // État initial: thème clair

      // Action pour basculer le thème
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'theme-storage', // Nom unique pour le stockage (clé dans localStorage)
      storage: createJSONStorage(() => localStorage), // Utilise localStorage pour la persistance
    }
  )
);

export default useThemeStore;