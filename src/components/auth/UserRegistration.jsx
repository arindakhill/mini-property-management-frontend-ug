// src/components/auth/UserRegistration.jsx

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';

const UserRegistration = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstname:'',
    lastname:'',
    email: '',
    phoneNumber:'',
    password: '',
    confirmPassword: '',
    role: 'CUSTOMER',
  });
  const [formErrors, setFormErrors] = useState({});
  const { signUp } = useAuth();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "isOwner") {
      setFormData({
        ...formData,
        role: checked ? 'OWNER' : 'CUSTOMER', // Assign role based on checkbox
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    //first name and last name  validation
    if (!formData.firstname ) {
        formIsValid = false;
        errors.firstname = "First name is required";
      }

      if (!formData.lastname ) {
        formIsValid = false;
        errors.lastname = "Last name is required";
      }





    // Email validation
    if (!formData.email) {
      formIsValid = false;
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formIsValid = false;
      errors.email = "Email is invalid";
    }

  
   // phoneNumber validation
if (!formData.phoneNumber) {
    formIsValid = false;
    errors.phoneNumber = "Phone number is required";
  } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
    formIsValid = false;
    errors.phoneNumber = "Phone number is invalid";
  }

    // Password validation
    if (!formData.password) {
      formIsValid = false;
      errors.password = "Password is required";
    } else if (formData.password.length < 4) {
      formIsValid = false;
      errors.password = "Password must be at least 6 characters";
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      formIsValid = false;
      errors.confirmPassword = "Passwords do not match";
    }

    setFormErrors(errors);
    return formIsValid;
  };

// decide on the endpoint to use based on the role
let endpoint = '';
if(formData.role === 'OWNER'){
  endpoint = 'register-owner'}else{
  endpoint = 'register-customer'}

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await signUp({ ...formData },endpoint);
      toast({
        title: 'Registration Successful',
        description: "You're now signed in.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      onClose(); // Close the modal on success
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create a new account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>

        <FormControl isInvalid={formErrors.firstname}>
            <FormLabel>First Name</FormLabel>
            <Input name="firstname" value={formData.firstname} onChange={handleChange} placeholder="First Name" />
            <FormErrorMessage>{formErrors.firstname}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formErrors.lastname}>
            <FormLabel>Last Name</FormLabel>
            <Input name="lastname" value={formData.lastname} onChange={handleChange} placeholder="Last Name" />
            <FormErrorMessage>{formErrors.lastname}</FormErrorMessage>
          </FormControl>





          <FormControl isInvalid={formErrors.email}>
            <FormLabel>Email</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>


          <FormControl isInvalid={formErrors.phoneNumber}>
            <FormLabel>phone Number</FormLabel>
            <Input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Phone number" />
            <FormErrorMessage>{formErrors.phoneNumber}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formErrors.password} mt={4}>
            <FormLabel>Password</FormLabel>
            <Input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="Password" />
            <FormErrorMessage>{formErrors.password}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={formErrors.confirmPassword} mt={4}>
            <FormLabel>Confirm Password</FormLabel>
            <Input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm Password" />
            <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
          </FormControl>

          <Checkbox name="isOwner" isChecked={formData.isOwner} onChange={handleChange} mt={4}>
            I am a Property Owner
          </Checkbox>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit}>Sign Up</Button>
          <Button onClick={onClose} ml={3}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UserRegistration;
