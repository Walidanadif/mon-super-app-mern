import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateDashboard from './components/PrivateDashboard';
import ProductList from './components/ProductList';
import OrderList from './components/OrderList';
import CustomerList from './components/CustomerList';

import useThemeStore from './store/themeStore';
import useLoadingStore from './store/loadingStore';
import setupAxiosInterceptors from './utils/axiosInterceptor';
import Spinner from './components/Spinner';

// Importez les fichiers CSS des composants
import './App.css'; // Global App layout
import './components/Sidebar.css';
import './components/Auth/Auth.css';
import './components/DashboardContent.css';
import './components/PrivateDashboard.css';
import './components/ProductList.css'; // Utilisé aussi pour OrderList et CustomerList

setupAxiosInterceptors();

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const isLoading = useLoadingStore((state) => state.isLoading);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

      {isLoading && (
        <div className="global-spinner-overlay">
          <Spinner />
        </div>
      )}

      <div className="app-container">
        <Sidebar />

        <div className="app-main-content">
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