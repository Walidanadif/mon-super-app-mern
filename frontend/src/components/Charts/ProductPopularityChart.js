import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2'; // Importez le composant Pie
import {
  Chart as ChartJS,
  ArcElement, // Pour les graphiques en secteurs
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Spinner from '../Spinner'; // Importez le Spinner

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function ProductPopularityChart() {
  const { token, isAuthenticated } = useAuth();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)', // Rouge
        'rgba(54, 162, 235, 0.6)', // Bleu
        'rgba(255, 206, 86, 0.6)', // Jaune
        'rgba(75, 192, 192, 0.6)', // Vert
        'rgba(153, 102, 255, 0.6)',// Violet
        'rgba(255, 159, 64, 0.6)', // Orange
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    }],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductPopularityData = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        setError("Vous n'êtes pas authentifié pour voir la popularité des produits.");
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/data/product-popularity', config);
        const dataFromBackend = res.data;

        setChartData({
          labels: dataFromBackend.map(item => item.product),
          datasets: [{
            data: dataFromBackend.map(item => item.salesCount),
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          }],
        });
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données de popularité des produits:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.msg || 'Échec de la récupération des données de popularité des produits.');
        setLoading(false);
      }
    };

    fetchProductPopularityData();
  }, [token, isAuthenticated]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right', // Légende à droite pour le graphique en secteurs
      },
      title: {
        display: true,
        text: 'Popularité des Produits (par Ventes)',
        font: { size: 18, weight: 'bold' },
      },
    },
  };

  if (loading) return <div style={{ padding: '20px', textAlign: 'center', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Spinner /></div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>Erreur: {error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', height: '400px' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default ProductPopularityChart;