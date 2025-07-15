import React from 'react';
import SalesChart from './Charts/SalesChart';
import ProductPopularityChart from './Charts/ProductPopularityChart';
// Pas besoin d'importer DashboardContent.css ici

function DashboardContent() {
  return (
    <div className="dashboard-grid">
      <div className="card-container">
        <h2 className="card-title">Statistiques de Ventes Annuelles</h2>
        <SalesChart />
      </div>

      <div className="card-container">
        <h2 className="card-title">Popularité des Produits</h2>
        <ProductPopularityChart />
      </div>

      <div className="card-container overview-card">
        <h2 className="card-title">Vue d'Ensemble</h2>
        <p className="text-gray-600">Bienvenue sur votre tableau de bord. Explorez les différentes sections pour gérer vos données.</p>
      </div>
    </div>
  );
}

export default DashboardContent;