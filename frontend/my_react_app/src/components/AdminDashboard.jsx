// src/components/AdminDashboard.js
import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';
import api from '../api';
import './AdminDashboard.css'; // Add this line to include custom CSS

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'User Count',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  });
  const [totalUserCount, setTotalUserCount] = useState(0);
  const [totalClickCount, setTotalClickCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null); // Use ref to keep track of the chart instance

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/admin/users');
        setUsers(response.data);
        prepareChartData(response.data);
        setTotalUserCount(response.data.length);
        // Assuming total click count is obtained from user data, otherwise fetch it from API
        setTotalClickCount(response.data.reduce((sum, user) => sum + (user.clickCount || 0), 0));
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const prepareChartData = (users) => {
    const userCountsByMonth = {};

    users.forEach(user => {
      const date = new Date(user.lastLoginDate);
      const month = date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();

      if (userCountsByMonth[month]) {
        userCountsByMonth[month] += 1;
      } else {
        userCountsByMonth[month] = 1;
      }
    });

    const labels = Object.keys(userCountsByMonth).sort((a, b) => new Date(a) - new Date(b));
    const data = labels.map(label => userCountsByMonth[label]);

    setChartData({
      labels: labels,
      datasets: [{
        label: 'User Count',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    });
  };

  useEffect(() => {
    if (!chartRef.current) return; // Ensure the chartRef is defined

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return; // Ensure the context is available

    const newChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      newChart.destroy();
    };
  }, [chartData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="counts">
        <div className="count-box">
          <h2>{totalUserCount}</h2>
          <p>Total User Count</p>
        </div>
        <div className="count-box">
          <h2>{totalClickCount}</h2>
          <p>Total Click Count</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Count</th>
            <th>Gender</th>
            <th>Last Login Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.count}</td>
              <td>{user.gender}</td>
              <td>{new Date(user.lastLoginDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ width: '600px', margin: '50px auto' }}>
        <h2>User Count by Month</h2>
        <canvas id="userChart" ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default AdminDashboard;
