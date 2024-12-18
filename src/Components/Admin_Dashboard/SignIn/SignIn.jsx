// src/Components/Admin_Dashboard/SignIn/SignIn.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Update last login timestamp in admins collection
      await updateDoc(doc(db, 'admins', userCredential.user.uid), {
        lastLogin: serverTimestamp()
      });

      // Save the user token
      const token = await userCredential.user.getIdToken();
      localStorage.setItem('token', token);
      
      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Admin Login</h2>
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
          <p>Need an admin account? <a href="/admin/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;