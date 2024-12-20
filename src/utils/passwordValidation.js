// passwordValidation.js
export const passwordPatterns = {
  minLength: { value: 8, message: 'At least 8 characters' },
  uppercase: { pattern: /[A-Z]/, message: 'One uppercase letter' },
  lowercase: { pattern: /[a-z]/, message: 'One lowercase letter' },
  number: { pattern: /\d/, message: 'One number' },
  specialChar: { pattern: /[!@#$%^&*(),.?":{}|<>]/, message: 'One special character' },
  noSpaces: { pattern: /^\S*$/, message: 'No spaces allowed' },
  consecutive: { pattern: /^(?!.*(.)\1{2,}).*$/, message: 'No more than 2 consecutive same characters' },
  sequential: { pattern: /^(?!.*(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|123|234|345|456|567|678|789)).*$/i, message: 'No sequential characters' }
};

export const validatePassword = (password) => {
  const errors = [];
  
  // Check minimum length
  if (password.length < passwordPatterns.minLength.value) {
    errors.push(passwordPatterns.minLength.message);
  }

  // Check for uppercase letter
  if (!passwordPatterns.uppercase.pattern.test(password)) {
    errors.push(passwordPatterns.uppercase.message);
  }

  // Check for lowercase letter
  if (!passwordPatterns.lowercase.pattern.test(password)) {
    errors.push(passwordPatterns.lowercase.message);
  }

  // Check for number
  if (!passwordPatterns.number.pattern.test(password)) {
    errors.push(passwordPatterns.number.message);
  }

  // Check for special character
  if (!passwordPatterns.specialChar.pattern.test(password)) {
    errors.push(passwordPatterns.specialChar.message);
  }

  // Check for spaces
  if (!passwordPatterns.noSpaces.pattern.test(password)) {
    errors.push(passwordPatterns.noSpaces.message);
  }

  // Check for consecutive characters
  if (!passwordPatterns.consecutive.pattern.test(password)) {
    errors.push(passwordPatterns.consecutive.message);
  }

  // Check for sequential characters
  if (!passwordPatterns.sequential.pattern.test(password)) {
    errors.push(passwordPatterns.sequential.message);
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password)
  };
};

const calculatePasswordStrength = (password) => {
  let strength = 0;
  
  // Add points for each met criteria
  Object.values(passwordPatterns).forEach(({ pattern }) => {
    if (pattern && pattern.test(password)) strength += 1;
  });
  
  // Add points for length
  if (password.length >= 12) strength += 2;
  else if (password.length >= 10) strength += 1;

  // Convert to percentage
  return Math.min(100, (strength / 10) * 100);
};

export default validatePassword;