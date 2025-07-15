import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css'; // Importez le fichier CSS pour le style de la sidebar

function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className="w-64 bg-gray-800 text-white p-6 shadow-lg flex-shrink-0">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-100">Admin Dashboard</h2>
      <ul>
        <li className="mb-4"><Link to="/" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Home (Public)</Link></li>
        {isAuthenticated ? (
          <>
            <li className="mb-4"><Link to="/private" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Dashboard (Protected)</Link></li>
            <li className="mb-4"><Link to="/products" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Products</Link></li>
            <li className="mb-4"><Link to="/orders" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Orders</Link></li>       {/* Nouveau lien */}
            <li className="mb-4"><Link to="/customers" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Customers</Link></li>   {/* Nouveau lien */}
            <li className="mb-4"><Link to="/settings" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Settings</Link></li>
            <li className="mt-6">
              <button onClick={logout} className="w-full text-left py-2 px-4 bg-red-600 rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                Logout
              </button>
            </li>
            {user && (
              <li className="text-sm text-gray-400 mt-6 pt-4 border-t border-gray-700">
                Logged in as: <strong className="block">{user.username}</strong>
                <span className="block text-xs mt-1">({user.role})</span>
              </li>
            )}
          </>
        ) : (
          <>
            <li className="mb-4"><Link to="/login" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Login</Link></li>
            <li className="mb-4"><Link to="/register" className="block py-2 px-4 rounded-md hover:bg-gray-700 transition-colors duration-200">Register</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;