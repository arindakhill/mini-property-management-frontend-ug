import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';


const SignOutButton = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const toast = useToast(); // Initialize useToast

  const handleSignOut = async () => {
    try {
      await signOut();
      // Navigate to the home page
      navigate('/');
      // Show success toast
      toast({
        title: 'Sign out successful.',
        description: "You've been signed out.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Sign out failed:', error.message);
      // Show error toast
      toast({
        title: 'Sign out failed.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={handleSignOut} _hover={{bg:'red.500'}}>Sign Out</Button>
  );
};

export default SignOutButton;
