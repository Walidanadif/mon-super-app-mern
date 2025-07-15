import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

function OrderList() {
  const { token, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        setError("Vous n'êtes pas authentifié pour voir les commandes.");
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/data/orders', config);
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des commandes:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.msg || 'Échec de la récupération des commandes.');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, isAuthenticated]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center', fontSize: '1.2em' }}><Spinner /></div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center', fontSize: '1.2em' }}>Erreur: {error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Liste des Commandes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID Commande</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Client</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Date</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Total</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{order.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{order.customer}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{order.date}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>${order.total.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>Aucune commande trouvée.</p>}
    </div>
  );
}

export default OrderList;