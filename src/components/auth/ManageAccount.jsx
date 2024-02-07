// src/components/auth/ManageAccount.jsx
import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ManageAccount = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const { updateUserPassword } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (newPassword !== confirmNewPassword) {
        toast({
          title: "Passwords don't match",
          status: 'error',
          isClosable: true,
        });
        return;
      }
  
      try {
        await updateUserPassword(currentPassword, newPassword,confirmNewPassword);
        toast({
          title: 'Password Updated',
          description: 'Your password has been successfully updated.',
          status: 'success',
          isClosable: true,
        });

        navigate('/');
        // Optionally, redirect the user or clear the form
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          isClosable: true,
        });
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired>
        <FormLabel>Current Password</FormLabel>
        <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} borderColor="black" // Sets default border color
          focusBorderColor="black" // Sets border color on focus
          borderWidth="2px" // Sets border width
          _hover={{
            borderColor: "black", // Sets border color on hover
          }} />
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>New Password</FormLabel>
        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} borderColor="black" // Sets default border color
          focusBorderColor="black" // Sets border color on focus
          borderWidth="2px" // Sets border width
          _hover={{
            borderColor: "black", // Sets border color on hover
          }}/>
      </FormControl>
      <FormControl isRequired mt={4}>
        <FormLabel>Confirm New Password</FormLabel>
        <Input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)}borderColor="black" // Sets default border color
          focusBorderColor="black" // Sets border color on focus
          borderWidth="2px" // Sets border width
          _hover={{
            borderColor: "black", // Sets border color on hover
          }} />
      </FormControl>
      <Button mt={4} colorScheme="teal" type="submit" >Update Password</Button>
    </form>
  );
};

export default ManageAccount;
