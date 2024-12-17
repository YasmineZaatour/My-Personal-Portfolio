import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5002/api/admin/signin', formData);
      if (response.status === 200) {
        // Save the token to local storage or context
        localStorage.setItem('token', response.data.token);
        // Redirect to the admin dashboard
        navigate('/admin/dashboard');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Welcome Back</h2>
        <p>Please sign in to continue</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <div className="signin-footer">
          <p>Don't have an account? <a href="/admin/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;