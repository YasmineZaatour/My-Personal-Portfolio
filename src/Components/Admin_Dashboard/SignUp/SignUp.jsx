// src/Components/Admin_Dashboard/SignUp/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import './SignUp.css';
import validateEmail from '../../../utils/emailValidation';
import { validatePassword } from '../../../utils/passwordValidation';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [emailErrors, setEmailErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    // Email validation
    if (e.target.name === 'email') {
      const { errors } = validateEmail(e.target.value);
      setEmailErrors(errors);
    }

    // Check password validation when password field changes
    if (e.target.name === 'password') {
      const { errors, strength } = validatePassword(e.target.value);
      setPasswordErrors(errors);
      setPasswordStrength(strength);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email before submission
    const { isValid: isEmailValid, errors: emailValidationErrors } = validateEmail(formData.email);
    if (!isEmailValid) {
      setEmailErrors(emailValidationErrors);
      setError('Please fix email validation errors');
      return;
    }

    // Validate password before submission
    const { isValid, errors } = validatePassword(formData.password);
    if (!isValid) {
      setPasswordErrors(errors);
      setError('Please fix password validation errors');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Store admin data in Firestore
      await setDoc(doc(db, 'admins', userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        status: 'Active',
        createdAt: serverTimestamp(),
        lastLogin: null
      });

      // Redirect to sign in page after successful registration
      navigate('/admin/signin');
    } catch (error) {
      setError(error.message);
    }
  };

  // Helper function to get strength color
  const getStrengthColor = (strength) => {
    if (strength < 30) return '#ff0000';
    if (strength < 60) return '#ffa500';
    return '#00ff00';
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Admin Account</h2>
        <p>Please fill in admin information</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {/* Email validation errors */}
            {emailErrors.length > 0 && (
              <ul className="validation-errors">
                {emailErrors.map((error, index) => (
                  <li key={index} style={{ color: '#ff0000', fontSize: '12px' }}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
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
            {/* Password strength indicator */}
            {formData.password && (
              <div className="password-strength" style={{ marginTop: '5px' }}>
                <div 
                  style={{
                    height: '4px',
                    width: `${passwordStrength}%`,
                    backgroundColor: getStrengthColor(passwordStrength),
                    transition: 'all 0.3s'
                  }}
                />
              </div>
            )}
            {/* Password validation errors */}
            {passwordErrors.length > 0 && (
              <ul className="password-errors">
                {passwordErrors.map((error, index) => (
                  <li key={index} style={{ color: '#ff0000', fontSize: '12px' }}>
                    {error}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="signup-footer">
          <p>Already have an account? <a href="/admin/signin">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;