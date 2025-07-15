import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  isLoading: false,
  activeRequests: 0, // Compteur pour suivre les requêtes actives

  // Actions pour gérer l'état de chargement
  startLoading: () => set((state) => ({
    activeRequests: state.activeRequests + 1,
    isLoading: true, // Si au moins une requête est active, l'app est en chargement
  })),
  stopLoading: () => set((state) => ({
    activeRequests: Math.max(0, state.activeRequests - 1), // Ne pas descendre en dessous de 0
    isLoading: state.activeRequests - 1 > 0, // Est en chargement s'il reste des requêtes
  })),
}));

export default useLoadingStore;