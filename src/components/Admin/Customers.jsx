import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const toast = useToast();
  const apiUrl = 'http://localhost:8080/api/v1/customers';
  const token = sessionStorage.getItem('token'); // Retrieve the token

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCustomers(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching customers',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      await axios.delete(`${apiUrl}/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast({
        title: 'Customer Deleted',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchCustomers(); // Refresh the list after deletion
    } catch (error) {
      toast({
        title: 'Error deleting customer',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // You can implement viewFavoriteProperties and viewOffers similarly using respective endpoints
  

  return (
    <div className="container">
      <h3>List of Customers</h3><hr />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>
                <button onClick={() => deleteCustomer(customer.id)} className="btn btn-danger">Delete</button>
                {/* Add more buttons here for other actions */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>          
    </div>
  );
}
