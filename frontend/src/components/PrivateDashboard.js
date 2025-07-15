import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import './PrivateDashboard.css';

function PrivateDashboard() {
  const [privateData, setPrivateData] = useState('');
  const [loadingContent, setLoadingContent] = useState(true); // Renamed to avoid confusion with auth loading
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, token, isAuthenticated, logout, loading: authLoading } = useAuth(); // Get user, token, isAuthenticated, logout, and authLoading from context

  useEffect(() => {
    const fetchPrivateData = async () => {
      // If authentication check is still loading, wait
      if (authLoading) return;

      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        const config = {
          headers: {
            'x-auth-token': token, // Use token from context
          },
        };
        const res = await axios.get('http://localhost:5000/api/private', config);
        setPrivateData(res.data.msg);
        setLoadingContent(false);
      } catch (err) {
        console.error('Error fetching private data:', err.response ? err.response.data : err.message);
        setError(err.response?.data?.msg || 'Failed to fetch private data. Please log in.');
        setLoadingContent(false);
        // If token is invalid or expired, use the logout function from context
        if (err.response && err.response.status === 401) {
            logout(); // Clear token and redirect
        }
      }
    };

    fetchPrivateData();
  }, [isAuthenticated, token, logout, navigate, authLoading]); // Dependencies

  if (authLoading || loadingContent) {
    return <div className="private-dashboard">Loading dashboard content...</div>;
  }

  return (
    <div className="private-dashboard">
      <h2>Your Secure Dashboard Area</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="private-data-display">
          <p>{privateData}</p>
          {user && ( // Only display user info if user object exists
            <>
              <p>You are logged in as: **{user.username}**</p>
              <p>Your role: **{user.role}**</p>
            </>
          )}
        </div>
      )}
      <button onClick={logout} className="btn-primary logout-btn">Logout</button>
    </div>
  );
}

export default PrivateDashboard;