import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useThemeStore from '../store/themeStore';
import { toast } from 'react-toastify';
// Pas besoin d'importer Sidebar.css ici, il est déjà importé dans App.js

function Sidebar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  const handleLogout = () => {
    const result = logout();
    if (result.success) {
      toast.info(result.message);
    }
  };

  return (
    <div className="sidebar-container">
      <h2 className="sidebar-title">AdminBoard</h2>

      <ul className="sidebar-nav-list">
        <li>
          <Link to="/" className="sidebar-nav-link">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7m-1.5 1.5V14m-7-3V10a1 1 0 011-1h3m-6 9v-4a1 1 0 011-1h2m-6 4v4h6m-3-12v4a1 1 0 001 1h2m-6-10v4m-2 4h6m-3 3v4a1 1 0 001 1h2m-4-6v4m-2 4h6m-3-13v4"></path></svg>
            Home (Public)
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/private" className="sidebar-nav-link">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                Dashboard (Protected)
              </Link>
            </li>
            <li>
              <Link to="/products" className="sidebar-nav-link">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                Products
              </Link>
            </li>
            <li>
              <Link to="/orders" className="sidebar-nav-link">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                Orders
              </Link>
            </li>
            <li>
              <Link to="/customers" className="sidebar-nav-link">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2h2m0 0l4-4m-4 4v-6a2 2 0 012-2h2a2 2 0 012 2v6m0 0l4-4m-4 4v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0h6"></path></svg>
                Customers
              </Link>
            </li>
            <li>
              <Link to="/settings" className="sidebar-nav-link">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.568.356 1.15.54 1.724 1.066z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Settings
              </Link>
            </li>
            <li className="sidebar-logout-container">
              <button onClick={handleLogout} className="sidebar-logout-button">
                Logout
              </button>
            </li>
            {user && (
              <li className="sidebar-user-info">
                Logged in as: <strong>{user.username}</strong>
                <span>({user.role})</span>
              </li>
            )}
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="sidebar-nav-link">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="sidebar-nav-link">
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 10a4 4 0 00-4 4v2H5V14a4 4 0 01-4-4h1v2h14v-2h1m-1-4a4 4 0 014 4v2h-3v-2a4 4 0 00-4-4z"></path></svg>
                Register
              </Link>
            </li>
          </>
        )}

        <li className="sidebar-theme-toggle-container">
            <button
                onClick={toggleDarkMode}
                className="theme-toggle-button"
            >
                {isDarkMode ? (
                    <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.459 4.363A9.914 9.914 0 0110 18a9.914 9.914 0 01-3.541-3.637 5.996 5.996 0 010-8.726C7.94 2.146 10.059 1.5 12.176 1.637A9.914 9.914 0 0110 2a9.914 9.914 0 01-3.541 3.637z"></path></svg>
                        Thème clair
                    </>
                ) : (
                    <>
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                        Thème sombre
                    </>
                )}
            </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;