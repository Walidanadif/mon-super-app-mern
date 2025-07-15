import React from 'react';
import './DashboardContent.css'; // We'll create this CSS file

function DashboardContent() {
  return (
    <div className="dashboard-content">
      <h1>Welcome to Your E-commerce Dashboard!</h1>
      {/* We'll add dynamic content here later */}
      <div className="dashboard-summary">
        <div className="summary-card">
          <h3>Total Sales</h3>
          <p>$12,345</p>
        </div>
        <div className="summary-card">
          <h3>New Orders</h3>
          <p>50</p>
        </div>
        <div className="summary-card">
          <h3>Customers</h3>
          <p>1,200</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;