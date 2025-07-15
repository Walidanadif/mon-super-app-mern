// frontend/src/components/SalesChart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2'; // Assuming you're using react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = async () => {
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

        const response = await axios.get('http://localhost:5000/api/data/sales', config);

        // Assuming your backend sends data like [{ month: 'Jan', sales: 1200 }, ...]
        const labels = response.data.map(item => item.month);
        const data = response.data.map(item => item.sales);

        setSalesData({
          labels: labels,
          datasets: [
            {
              label: 'Ventes Mensuelles',
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.1,
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données de ventes:", err.response ? err.response.data : err.message);
        setError(err.response ? err.response.data : { msg: 'Une erreur est survenue lors du chargement des données de ventes.' });
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading) return <div className="text-center py-4">Chargement des données de ventes...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Erreur: {error.msg || 'Impossible de charger les données de ventes.'}</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance des Ventes',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Graphique des Ventes</h3>
      {salesData.labels.length > 0 ? (
        <Line data={salesData} options={options} />
      ) : (
        <p className="text-center text-gray-500">Aucune donnée de ventes disponible.</p>
      )}
    </div>
  );
};

export default SalesChart;