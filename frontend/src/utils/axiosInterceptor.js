import axios from 'axios';
import useLoadingStore from '../store/loadingStore';

const setupAxiosInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      useLoadingStore.getState().startLoading(); // Déclenche le chargement
      return config;
    },
    (error) => {
      useLoadingStore.getState().stopLoading(); // Arrête le chargement en cas d'erreur de requête
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      useLoadingStore.getState().stopLoading(); // Arrête le chargement quand la réponse est reçue
      return response;
    },
    (error) => {
      useLoadingStore.getState().stopLoading(); // Arrête le chargement en cas d'erreur de réponse
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;