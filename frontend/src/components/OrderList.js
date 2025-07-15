// frontend/src/components/OrderList.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      if (!token) {
        setError({ msg: 'Non autorisé, pas de token. Veuillez vous connecter.' });
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        params: {
          page,
          limit,
          search,
          status,
        },
      };

      const response = await axios.get('http://localhost:5000/api/orders', config);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des commandes:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : { msg: 'Une erreur est survenue lors du chargement des commandes.' });
      setLoading(false);
    }
  }, [page, limit, search, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    setPage(1);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (loading) return <div className="text-center py-4">Chargement des commandes...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Erreur: {error.msg || 'Impossible de charger les commandes.'}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Liste des Commandes</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher des commandes..."
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded flex-grow"
        />
        <select
          value={status}
          onChange={handleStatusChange}
          className="p-2 border rounded"
        >
          <option value="">Tous les statuts</option>
          <option value="En attente">En attente</option>
          <option value="Traité">Traité</option>
          <option value="Livré">Livré</option>
          <option value="Annulé">Annulé</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID Commande</th>
              <th className="py-2 px-4 border-b">Client</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Statut</th>
              <th className="py-2 px-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{order._id.substring(0, 8)}...</td>
                  <td className="py-2 px-4 border-b">{order.user ? order.user.name : 'N/A'}</td>
                  <td className="py-2 px-4 border-b">{order.totalAmount} DH</td>
                  <td className="py-2 px-4 border-b">{order.status}</td>
                  <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">Aucune commande trouvée.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Précédent
        </button>
        <span>Page {page} sur {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default OrderList;