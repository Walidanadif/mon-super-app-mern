import { create } from 'zustand';
import axios from 'axios';

// Fonction utilitaire pour décoder le JWT
const decodeToken = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Erreur lors du décodage du token:", error);
    return null;
  }
};

// Récupérer le token du localStorage au démarrage
const storedToken = localStorage.getItem('token');
const initialUser = storedToken ? decodeToken(storedToken) : null;
const initialIsAuthenticated = !!storedToken; // Convertir en booléen

// Créez votre store Zustand
const useAuthStore = create((set) => ({
  token: storedToken,
  isAuthenticated: initialIsAuthenticated,
  user: initialUser,
  loading: false, // Ajout d'un état de chargement

  // Action pour la connexion
  login: async (username, password) => {
    set({ loading: true }); // Démarre le chargement
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const body = JSON.stringify({ username, password });
      const res = await axios.post('http://localhost:5000/api/auth/login', body, config);

      localStorage.setItem('token', res.data.token);
      const decodedUser = decodeToken(res.data.token);

      set({
        token: res.data.token,
        isAuthenticated: true,
        user: decodedUser,
        loading: false, // Arrête le chargement
      });
      return { success: true, message: 'Connexion réussie !' };
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      localStorage.removeItem('token');
      set({
        token: null,
        isAuthenticated: false,
        user: null,
        loading: false, // Arrête le chargement
      });
      const msg = err.response?.data?.msg || 'Identifiants invalides';
      return { success: false, message: msg };
    }
  },

  // Action pour l'inscription (seulement si vous voulez qu'elle affecte l'état auth du store)
  // Pour l'instant, on laisse l'inscription séparée pour ne pas modifier l'état d'authentification directement après l'inscription
  // et rediriger simplement vers la page de login.

  // Action pour la déconnexion
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false, user: null });
    return { success: true, message: 'Déconnexion réussie !' };
  },

  // Action pour vérifier l'état d'authentification (utile au démarrage de l'app)
  checkAuth: () => {
    const currentToken = localStorage.getItem('token');
    if (currentToken) {
      const decodedUser = decodeToken(currentToken);
      set({
        token: currentToken,
        isAuthenticated: true,
        user: decodedUser,
      });
    } else {
      set({
        token: null,
        isAuthenticated: false,
        user: null,
      });
    }
  },
}));

export default useAuthStore;