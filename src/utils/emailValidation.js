// src/utils/emailValidation.js

const validateEmail = (email) => {
  const errors = [];
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push('Invalid email format');
    return { isValid: false, errors };
  }

  // Check for common domains
  const [localPart, domain] = email.split('@');
  
  // Local part validations
  if (localPart.length < 3) {
    errors.push('Email username must be at least 3 characters long');
  }
  if (/[<>()[\]\\.,;:\s@"]/.test(localPart)) {
    errors.push('Email username contains invalid characters');
  }

  // Domain validations
  if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domain)) {
    errors.push('Invalid domain format');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export default validateEmail;