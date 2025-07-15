import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Spinner from './Spinner'; // Importez le Spinner


function ProductList() {
  const { token, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!isAuthenticated || !token) {
        setLoading(false);
        setError("Vous n'êtes pas authentifié pour voir les produits.");
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const res = await axios.get('http://localhost:5000/api/data/products', config);
        setProducts(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des produits:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.msg || 'Échec de la récupération des produits.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, isAuthenticated]); // Dépendances

   if (loading) return <div style={{ padding: '20px', textAlign: 'center', fontSize: '1.2em' }}><Spinner /></div>;
  if (error) return <div style={{ padding: '20px', color: 'red', textAlign: 'center', fontSize: '1.2em' }}>Erreur: {error}</div>;

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Liste des Produits</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Nom</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Catégorie</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Prix</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{product.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{product.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{product.category}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>${product.price.toFixed(2)}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {products.length === 0 && <p style={{ textAlign: 'center', color: '#666' }}>Aucun produit trouvé.</p>}
    </div>
  );
}

export default ProductList;