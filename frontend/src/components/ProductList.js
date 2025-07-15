// frontend/src/components/ProductList.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(''); // For filtering by category
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Retrieve the token

      if (!token) {
        setError({ msg: 'Non autorisé, pas de token. Veuillez vous connecter.' });
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Attach the JWT
        },
        params: {
          page,
          limit,
          search,
          category,
        },
      };

      const response = await axios.get('http://localhost:5000/api/products', config);
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Erreur lors de la récupération des produits:", err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data : { msg: 'Une erreur est survenue lors du chargement des produits.' });
      setLoading(false);
    }
  }, [page, limit, search, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
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

  if (loading) return <div className="text-center py-4">Chargement des produits...</div>;
  if (error) return <div className="text-red-500 text-center py-4">Erreur: {error.msg || 'Impossible de charger les produits.'}</div>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Liste des Produits</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Rechercher des produits..."
          value={search}
          onChange={handleSearchChange}
          className="p-2 border rounded flex-grow"
        />
        <select
          value={category}
          onChange={handleCategoryChange}
          className="p-2 border rounded"
        >
          <option value="">Toutes les catégories</option>
          {/* You might fetch categories dynamically from your backend or hardcode common ones */}
          <option value="Électronique">Électronique</option>
          <option value="Vêtements">Vêtements</option>
          <option value="Livres">Livres</option>
          <option value="Maison">Maison</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Nom</th>
              <th className="py-2 px-4 border-b">Catégorie</th>
              <th className="py-2 px-4 border-b">Prix</th>
              <th className="py-2 px-4 border-b">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{product.name}</td>
                  <td className="py-2 px-4 border-b">{product.category}</td>
                  <td className="py-2 px-4 border-b">{product.price} DH</td>
                  <td className="py-2 px-4 border-b">{product.countInStock}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">Aucun produit trouvé.</td>
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

export default ProductList;