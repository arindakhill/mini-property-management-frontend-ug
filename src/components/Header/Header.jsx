// src/components/Header/Header.jsx

import { Avatar,Flex, Heading, Button, HStack, chakra, ButtonGroup, useBreakpointValue,Menu,MenuDivider, MenuButton,MenuList,MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon }  from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import NavMobile from './NavMobile';
import { useDisclosure , Text} from '@chakra-ui/react';
import SignInModal from '../auth/SignInModal';
import UserRegistration from '../auth/UserRegistration'; // Import UserRegistration (Sign Up Modal)
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen: isSignInOpen, onOpen: onSignInOpen, onClose: onSignInClose } = useDisclosure();
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure(); // Separate disclosure for sign up
  const { user,signIn, signOut } = useAuth(); // Use the signIn function from AuthContext
  
  // Function to handle sign in, which will be passed to SignInModal
  const handleSignIn = async (credentials) => {
    try {
      await signIn(credentials);
      onSignInClose(); // Close the sign-in modal on successful sign in
    } catch (error) {
      // Handle sign in error (e.g., showing an error message)
      console.error("Sign in failed:", error.message);
    }
  };


  //to to offer history
  const goToOfferHistory = ()=>{
    navigate('/offer-history');
  }

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>

      <Flex w='100%' py='5' align='left' justify='space-between'>
        <Link to='/'>
          <Heading fontSize='5xl' color='pink.600'>NestQuest</Heading>
        </Link>
       
        {user ? (
          
  <Menu>
    <Button onClick={goToOfferHistory}>View Offer History</Button>
    <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
      <Avatar size={'lg'} src={user.profilePicture || "/src/assets/images/profile-pictures/default-profile.png"} />
    </MenuButton>
    <MenuList>
      <MenuItem onClick={() => navigate('/manage-account')}>Manage Account</MenuItem>
      <MenuDivider />
      <MenuItem onClick={signOut} >Sign Out</MenuItem>
    </MenuList>
  </Menu>
) : (
          <HStack>
            <Button onClick={onSignInOpen}>Sign In</Button>
            <Button onClick={onSignUpOpen} bg='pink.700'>Sign Up</Button>
          </HStack>
        )}



      </Flex>
      <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} onSignIn={handleSignIn} />
      <UserRegistration isOpen={isSignUpOpen} onClose={onSignUpClose} /> {/*// Ensure UserRegistration accepts isOpen and onClose props*/}
    </chakra.header>
  );
};

export default Header;
