// frontend/src/components/ProductPopularityChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Assuming you're using react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ProductPopularityChart = () => {
  const [productPopularityData, setProductPopularityData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductPopularityData = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token

        if (!token) {
          setError({ msg: 'Non autorisé, pas de token. Veuillez vous connecter.' });
          setLoading(false);
          return;
        }

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Attach the JWT to the Authorization header
          }
        };

        const response = await axios.get('http://localhost:5000/api/data/product-popularity', config);

        // Assuming your backend sends data like [{ name: 'Laptop Pro', count: 150 }, ...]
        const labels = response.data.map(item => item.name);
        const data = response.data.map(item => item.count);

        setProductPopularityData({
          labels: labels,
          datasets: [
            {
              label: 'Popularité des Produits',
              data: data,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données de popularité des produits:", err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data : { msg: 'Une erreur est survenue lors du chargement des données de popularité des produits.' });
        setLoading(false);
      }
    };

    fetchProductPopularityData();
  }, []);

  if (loading) return <div className="text-center py-4">Chargement des données de popularité des produits...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Erreur: {error.msg || 'Impossible de charger les données de popularité des produits.'}</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Popularité des Produits',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Nombre de Ventes',
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Graphique de Popularité des Produits</h3>
      {productPopularityData.labels.length > 0 ? (
        <Bar data={productPopularityData} options={options} />
      ) : (
        <p className="text-center text-gray-500">Aucune donnée de popularité des produits disponible.</p>
      )}
    </div>
  );
};

export default ProductPopularityChart;