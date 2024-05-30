import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('http://localhost:5000/api/auth/signup', { email, password, name, gender });
      navigate('/login'); // Navigate to login page after successful signup
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  const handleSignin = () => {
    navigate('/login'); // Navigate to login page on sign-in button click
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        
        <label>Gender:</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        <button type="submit">Signup</button>
      </form>
      <button onClick={handleSignin} className="signin-button">Signin</button>
    </div>
  );
}

export default Signup;
