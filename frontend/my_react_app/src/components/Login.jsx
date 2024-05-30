// src/components/Login.js
import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === "admin@email.com"){
      if(password === "Admin@123"){
        if(name === "admin"){
        navigate('/admin')
      }}
    }
    try {
      const response = await api.post('http://localhost:5000/api/auth/login', { email, password, name });
      localStorage.setItem('token', response.data.token);
      navigate('/profile');
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <div className="button-group">
          <button type="submit" className="signin-button">Sign In</button>
          <button type="button" className="signup-button" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
