import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Importez ToastContainer
import 'react-toastify/dist/ReactToastify.css';   // Importez le CSS de Toastify

import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateDashboard from './components/PrivateDashboard';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <Router>
      {/* Le ToastContainer doit être rendu une seule fois, idéalement en haut de l'arbre des composants */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />

        <div className="flex-grow p-6">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashboardContent />} />
            <Route path="/private" element={<PrivateDashboard />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;