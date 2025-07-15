// frontend/src/components/CustomerList.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);

  const fetchCustomers = useCallback(async () => {
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
        },
      };

      const response = await axios.get('http://localhost:5000/api/customers', config);
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des clients:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : { msg: 'Une erreur est survenue lors du chargement des clients.' });
      setLoading(false);
    }
  }, [page, limit, search]);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
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

  if (loading) return <div className="text-center py-4">Chargement des clients...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Erreur: {error.msg || 'Impossible de charger les clients.'}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Liste des Clients</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher des clients..."
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded w-full"
        />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nom</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Téléphone</th>
            <th className="py-2 px-4 border-b">Adresse</th>
          </tr>
        </thead>
        <tbody>
          {customers.length > 0 ? (
            customers.map(customer => (
              <tr key={customer._id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{customer.name}</td>
                <td className="py-2 px-4 border-b">{customer.email}</td>
                <td className="py-2 px-4 border-b">{customer.phone}</td>
                <td className="py-2 px-4 border-b">{customer.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">Aucun client trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
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

export default CustomerList;