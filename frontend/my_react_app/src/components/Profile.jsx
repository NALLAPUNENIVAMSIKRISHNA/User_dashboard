import React, { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null); // Initialize state to null to avoid confusion
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/auth/profile', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
        // Handle unauthorized or token expiration
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/Login.jsx');
        }
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/Login');  // Changed to '/login' to match your routing
  };

  if (!user) {
    return <div>Welcome You are Logged in </div>;
  }

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}  {/* Conditional rendering for optional details */}
        {user.lastLogin && <p><strong>Last Login:</strong> {new Date(user.lastLogin).toLocaleString()}</p>}
      </div>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
}

export default Profile;
