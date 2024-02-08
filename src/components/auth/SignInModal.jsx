//src/components/auth/SignInModal.jsx
import React, { useState } from 'react';
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
  Spinner,
  Text,

} from '@chakra-ui/react';

// Add isOpen and onClose as props
const SignInModal = ({ isOpen, onClose, onSignIn , errorMessage}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [credentials, setCredentials] = useState({ email: '', password: '' });//old

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit =  async (e) => {
    //e.preventDefault();
    setIsLoading(true);
   await onSignIn({email, password});
  //  onClose(); // Make sure to call the onClose prop to close the modal
  setIsLoading(false);
  };

  // return (
  //   <Modal isOpen={isOpen} onClose={onClose}>
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>Sign In</ModalHeader>
  //       <ModalCloseButton />
  //       <ModalBody pb={6}>
  //         <FormControl>
  //           <FormLabel>Email</FormLabel>
  //           <Input
  //             type="email"
  //             name="email"
  //             value={credentials.email}
  //             onChange={handleChange}
  //             placeholder="Enter your email"
  //           />
  //         </FormControl>

  //         <FormControl mt={4}>
  //           <FormLabel>Password</FormLabel>
  //           <Input
  //             type="password"
  //             name="password"
  //             value={credentials.password}
  //             onChange={handleChange}
  //             placeholder="Enter your password"
  //           />
  //         </FormControl>
  //       </ModalBody>

  //       <ModalFooter>
  //         <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
  //           Sign In
  //         </Button>
  //         <Button onClick={onClose}>Cancel</Button>
  //       </ModalFooter>
  //     </ModalContent>
  //   </Modal>
  // );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign In</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {errorMessage && <Text color="red.500">{errorMessage}</Text>}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          {isLoading ? (
            <Spinner />
          ) : (
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>Sign In</Button>
          )}
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );



};

export default SignInModal;
