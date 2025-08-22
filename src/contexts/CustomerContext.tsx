
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Customer, CustomerFormData } from '../types/customer';
import { getCustomers, saveCustomers } from '../utils/localStorage';
import { generateCustomerId } from '../utils/validation';

interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customerData: CustomerFormData) => Promise<boolean>;
  updateCustomer: (id: string, customerData: CustomerFormData) => Promise<boolean>;
  deleteCustomer: (id: string) => Promise<boolean>;
  getCustomerById: (id: string) => Customer | undefined;
  searchCustomers: (query: string) => Customer[];
}

const CustomerContext = createContext<CustomerContextType | null>(null);

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const loadedCustomers = getCustomers();
    setCustomers(loadedCustomers);
  }, []);

  const addCustomer = async (customerData: CustomerFormData): Promise<boolean> => {
    try {
      const newCustomer: Customer = {
        id: generateCustomerId(),
        ...customerData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedCustomers = [...customers, newCustomer];
      setCustomers(updatedCustomers);
      saveCustomers(updatedCustomers);
      return true;
    } catch (error) {
      console.error('Error adding customer:', error);
      return false;
    }
  };

  const updateCustomer = async (id: string, customerData: CustomerFormData): Promise<boolean> => {
    try {
      const updatedCustomers = customers.map(customer =>
        customer.id === id
          ? { ...customer, ...customerData, updatedAt: new Date() }
          : customer
      );

      setCustomers(updatedCustomers);
      saveCustomers(updatedCustomers);
      return true;
    } catch (error) {
      console.error('Error updating customer:', error);
      return false;
    }
  };

  const deleteCustomer = async (id: string): Promise<boolean> => {
    try {
      const updatedCustomers = customers.filter(customer => customer.id !== id);
      setCustomers(updatedCustomers);
      saveCustomers(updatedCustomers);
      return true;
    } catch (error) {
      console.error('Error deleting customer:', error);
      return false;
    }
  };

  const getCustomerById = (id: string): Customer | undefined => {
    return customers.find(customer => customer.id === id);
  };

  const searchCustomers = (query: string): Customer[] => {
    if (!query.trim()) return customers;
    
    const lowerQuery = query.toLowerCase().trim();
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(lowerQuery) ||
      customer.email.toLowerCase().includes(lowerQuery) ||
      customer.phone.includes(lowerQuery) ||
      customer.contactPerson.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <CustomerContext.Provider value={{
      customers,
      addCustomer,
      updateCustomer,
      deleteCustomer,
      getCustomerById,
      searchCustomers,
    }}>
      {children}
    </CustomerContext.Provider>
  );
};
