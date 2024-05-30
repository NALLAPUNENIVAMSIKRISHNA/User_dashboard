import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, createBrowserRouter, RouterProvider, Link } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import AdminDashboard from "./components/AdminDashboard";
import './index.css';

const HomePage = () => {
  return (
    <div className="container">
      <h1>Welcome to my project</h1>
      <div className="button-container">
        <Link to="/login" className="button">Sign In</Link>
        <Link to="/signup" className="button">Sign Up</Link>
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/admin',
    element: (
      <App>
        <AdminDashboard />
      </App>
    )
  },
  {
    path: '/login',
    element: (
      <App>
        <Login />
      </App>
    )
  },
  {
    path: '/profile',
    element: (
      <App>
        <Profile />
      </App>
    )
  },
  {
    path: '/signup',
    element: (
      <App>
        <Signup />
      </App>
    )
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>
);
