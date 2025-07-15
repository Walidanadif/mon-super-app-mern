import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // <-- Re-add this import

import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateDashboard from './components/PrivateDashboard';

function App() {
  return (
    <Router>
      {/* Revert className to dashboard-container */}
      <div className="dashboard-container">
        <Sidebar />
        {/* Revert className to main-content */}
        <div className="main-content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<DashboardContent />} />
            <Route path="/private" element={<PrivateDashboard />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;