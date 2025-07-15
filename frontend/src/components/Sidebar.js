import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import './Sidebar.css';

function Sidebar() {
  const { isAuthenticated, user, logout } = useAuth(); // Get auth state and functions

  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><Link to="/">Home (Public)</Link></li>
        {/* Show protected links only if authenticated */}
        {isAuthenticated ? (
          <>
            <li><Link to="/private">Dashboard (Protected)</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/orders">Orders</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            {/* Show Logout if authenticated */}
            <li><button onClick={logout} className="sidebar-btn-logout">Logout</button></li>
            {/* Optional: Display username/role */}
            {user && <li className="sidebar-user-info">Logged in as: <strong>{user.username}</strong> ({user.role})</li>}
          </>
        ) : (
          <>
            {/* Show Login/Register if not authenticated */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;