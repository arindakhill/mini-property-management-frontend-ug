import React, { useState } from 'react';
import axios from 'axios';
import {
  VStack,
  Input,
  Checkbox,
  Select,
  Button,
  FormControl,
  FormLabel,
  Text,
  useToast
} from '@chakra-ui/react';

const UserRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    isOwner: false
  
  });
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the endpoint URL to your API for user registration
      const response = await axios.post('/api/register', formData);
      toast({
        title: 'Registration Successful',
        description: response.data.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      spacing={4}
      align="stretch"
      p={8}
      boxShadow="xl"
      borderRadius="md"
      background="white"
    >
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input type="text" name="firstName" onChange={handleInputChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input type="text" name="lastName" onChange={handleInputChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" name="email" onChange={handleInputChange} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" onChange={handleInputChange} />
      </FormControl>
      <Checkbox name="isOwner" onChange={handleInputChange} isChecked={formData.isOwner}>
        I am a landlord or industry professional
      </Checkbox>
      {formData.isOwner && (
        <>
          <FormControl isRequired>
            <FormLabel>Professional Type</FormLabel>
            <Select name="profession" onChange={handleInputChange}>
              <option value="">Select your category</option>
              <option value="real_estate_agent">Real Estate Agent</option>
              <option value="property_manager">Property Manager</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Zip/Postal</FormLabel>
            <Input type="text" name="zipcode" onChange={handleInputChange} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input type="tel" name="phoneNumber" onChange={handleInputChange} />
          </FormControl>
        </>
      )}
      <Button type="submit" colorScheme="pink" size="lg">
        Continue
      </Button>
    </VStack>
  );
};

export default UserRegistration;
