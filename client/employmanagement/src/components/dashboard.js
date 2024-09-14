// src/components/Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div>
      <header>
        <nav>
          <span>Home</span>
          <span>Employee List</span>
          <span>{username} - <button onClick={handleLogout}>Logout</button></span>
        </nav>
      </header>
      <div>
        <h1>Welcome Admin Panel</h1>
      </div>
    </div>
  );
}

export default Dashboard;
