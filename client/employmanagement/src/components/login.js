import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Add custom styles for the login form

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Updated hook

  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setError('Both username and password are required');
      return;
    }

    // Mock login validation (replace with API call in real implementation)
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('username', username);
      navigate('/dashboard'); // Updated navigation method
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>User Name</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
