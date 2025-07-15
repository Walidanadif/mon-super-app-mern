import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner';

function CustomerList() {
  const { token, isAuthenticated } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        setError("Vous n'êtes pas authentifié pour voir les clients.");
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/data/customers', config);
        setCustomers(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des clients:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.msg || 'Échec de la récupération des clients.');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [token, isAuthenticated]);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center', fontSize: '1.2em' }}><Spinner /></div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center', fontSize: '1.2em' }}>Erreur: {error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Liste des Clients</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID Client</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Nom</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Email</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Date Inscription</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Commandes Totales</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{customer.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{customer.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{customer.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{customer.registrationDate}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{customer.totalOrders}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {customers.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>Aucun client trouvé.</p>}
    </div>
  );
}

export default CustomerList;