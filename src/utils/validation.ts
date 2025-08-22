
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9][a-zA-Z0-9._-]*[a-zA-Z0-9]@[a-zA-Z0-9][a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && !email.startsWith('@') && !email.endsWith('@');
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone) && phone.length === 10;
};

export const validateCustomerName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$|^[a-zA-Z]$/;
  return nameRegex.test(name.trim()) && name.trim().length > 0;
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
};

export const generateCustomerId = (): string => {
  return `CUST-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};
