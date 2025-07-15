// frontend/src/pages/PrivateDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure Axios is imported

const PrivateDashboard = () => {
  const [privateData, setPrivateData] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPrivateData = async () => {
      // 1. Get the token from localStorage
      const token = localStorage.getItem('authToken'); // Assuming you store your token under 'authToken'

      // Check if token exists
      if (!token) {
        setError('No authentication token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        // 2. Configure Axios to send the token in the Authorization header
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // <-- This is crucial!
          },
        };

        // 3. Make the request with the configured headers
        const { data } = await axios.get('/api/private', config); // Adjust API_URL if needed
        setPrivateData(data.message);
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération des données privées:", err.response ? err.response.data : err.message);
        setError(err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : 'Échec de la récupération des données privées.');
        setLoading(false);
      }
    };

    fetchPrivateData();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading) {
    return <div>Chargement des données privées...</div>;
  }

  return (
    <div className="private-dashboard">
      <h2>Tableau de Bord Privé</h2>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <p>{privateData}</p>
      )}
      <p>Ceci est une page qui devrait être accessible uniquement aux utilisateurs authentifiés.</p>
      {/* You might want to add a logout button here */}
    </div>
  );
};

export default PrivateDashboard;