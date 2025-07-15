import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Pour récupérer le token
import Spinner from '../Spinner'; // Importez le Spinner

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart() {
  const { token, isAuthenticated } = useAuth(); // Récupérer le token du contexte
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Ventes Mensuelles ($)',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        setError("Vous n'êtes pas authentifié pour voir les données de ventes.");
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token, // Envoyer le token dans l'en-tête
          },
        };
        const res = await axios.get('http://localhost:5000/api/data/sales', config);
        const dataFromBackend = res.data;

        setChartData({
          labels: dataFromBackend.map(item => item.month),
          datasets: [{
            label: 'Ventes Mensuelles ($)',
            data: dataFromBackend.map(item => item.sales),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        });
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données de ventes:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.msg || 'Échec de la récupération des données de ventes.');
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [token, isAuthenticated]); // Dépendances: refetch quand le token ou l'état d'authentification change

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: {
        display: true,
        text: 'Tendances des Ventes Mensuelles',
        font: { size: 18, weight: 'bold' },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Montant des Ventes ($)' },
      },
      x: {
        title: { display: true, text: 'Mois' },
      },
    },
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}><Spinner /></div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Erreur: {error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default SalesChart;