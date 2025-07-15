import React from 'react';
import SalesChart from './Charts/SalesChart';
import ProductPopularityChart from './Charts/ProductPopularityChart'; // Importez le nouveau graphique

function DashboardContent() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Bienvenue sur votre tableau de bord E-commerce !</h1>
      <p className="text-gray-600 mb-8">Voici un aperçu rapide des performances de votre boutique.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold mb-2">Ventes Totales</h3>
          <p className="text-4xl font-extrabold">$12,345</p>
          <p className="text-sm opacity-90 mt-2">depuis 150 commandes</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold mb-2">Nouvelles Commandes</h3>
          <p className="text-4xl font-extrabold">50</p>
          <p className="text-sm opacity-90 mt-2">ces dernières 24 heures</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-lg font-semibold mb-2">Clients</h3>
          <p className="text-4xl font-extrabold">1,200</p>
          <p className="text-sm opacity-90 mt-2">clients actifs</p>
        </div>
      </div>

      {/* Conteneur pour les graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"> {/* Responsive grid pour les graphiques */}
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <SalesChart />
          </div>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <ProductPopularityChart />
          </div>
      </div>


    </div>
  );
}

export default DashboardContent;