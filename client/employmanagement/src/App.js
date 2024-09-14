import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
