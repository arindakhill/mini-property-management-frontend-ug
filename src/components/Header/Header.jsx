import { Avatar, Flex, Heading, Button, HStack, chakra, ButtonGroup, useBreakpointValue, Menu, MenuDivider, MenuButton, MenuList, MenuItem, Box, Text } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavMobile from './NavMobile';
import { useDisclosure } from '@chakra-ui/react';
import SignInModal from '../auth/SignInModal';
import UserRegistration from '../auth/UserRegistration'; // Import UserRegistration (Sign Up Modal)
import { useAuth } from '../../context/AuthContext'; // Import useAuth hook

import { useState } from 'react';
import SignOutButton from '../auth/SignOutButton';
import {jwtDecode} from 'jwt-decode';

import { HouseContext } from '../../context/HouseContext';


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen: isSignInOpen, onOpen: onSignInOpen, onClose: onSignInClose } = useDisclosure();
  const { isOpen: isSignUpOpen, onOpen: onSignUpOpen, onClose: onSignUpClose } = useDisclosure();
  const { user, signIn, signOut } = useAuth();
  const [errorMessage, setErrorMessage] = useState(''); 


  //get the user role for jwt token

  const userRole = user ? jwtDecode(sessionStorage.getItem('token')).role : null;

//handler for the buy and sell buttons
const handleListingTypeChange = (listingType) => {
  navigate(`/house-list${listingType}`);
};



   const handleSignIn = async (credentials) => {
    try {
      await signIn(credentials);
      onSignInClose();
      setErrorMessage(''); // Clear error message
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Sign in failed:", error.message);
    }
  };

  const goToOfferHistoryCustomer = () => {
    navigate('/offer-history');
  };
  const goToDashBoardOwner = () => {
    navigate('/owner');
  };
  const goToManageOnwners = () => { 
    navigate('/owner');
  };


// Determine whether to show the "View Offer History" button
const shouldShowOfferHistoryButton = user && location.pathname !== '/offer-history' && location.pathname !== '/manage-account';
const shouldShowManageAccountButton = user && location.pathname === '/manage-account' ;
const isCurrentUserAdmin = user && user.role === 'ADMIN';
const isCurrentUserCustomer = user && user.role === 'CUSTOMER';
const isCurrentUserOwner = user && user.role === 'OWNER';



  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' align='left' justify='space-between'>


      <Flex alignItems="center">
  <Link to='/'>
    <Heading fontSize='5xl' color='pink.600' marginRight="4">NestQuest</Heading>
  </Link>

  <Link to='/'>

  <Avatar size={'md'} src={"/src/assets/images/profile-pictures/default-profile.png" || user.profilePicture } />

    
  </Link>


</Flex>

  
        

        {user ? (
          <Flex justifyContent="right" w="100%" align="center">
            <Menu>
              <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0} rightIcon={<ChevronDownIcon />}>
                <HStack spacing={3}>


                  

                  {(user && isCurrentUserOwner)? (

<Avatar size={'md'} src={"/src/assets/images/profile-pictures/default-profile.png" ||user.profilePicture } />
 ) : (
<Avatar size={'md'} src={"/src/assets/images/profile-pictures/default-profile1.png" ||user.profilePicture } />
 )
}


                  <Box display={{ base: 'none', md: 'flex' }}>{user.firstname}</Box>
                </HStack>
              </MenuButton>


              <MenuList>
                
                <MenuItem onClick={() => navigate('/manage-account')}>Manage Account</MenuItem>
                <MenuDivider />
                <SignOutButton/>
              </MenuList>
            </Menu>
         

            {
            shouldShowOfferHistoryButton &&
             (
              isCurrentUserOwner ?
               (
              <Button onClick={goToDashBoardOwner} bg='pink.700'>View Dashboard</Button>
              ) : 
              isCurrentUserCustomer?
              
              (
              <Button onClick={goToOfferHistoryCustomer} >View Offer History</Button>
              ):
              (
                <Button onClick={goToManageOnwners} >View Admin Dashboard</Button>

            )
             )
            }


          <HStack> 
            {shouldShowManageAccountButton && (
              <Button bg='pink.700' alignSelf="center" >Update Password here</Button>
            )} </HStack>
            



          </Flex>
        ) : (
          <HStack>
            <Button onClick={onSignInOpen}>Sign In</Button>
            <Button onClick={onSignUpOpen} bg='pink.700' _hover={{ bg: 'pink.800' }}>Sign Up</Button>
          </HStack>
        )}
      </Flex>
      <SignInModal isOpen={isSignInOpen} onClose={onSignInClose} onSignIn={handleSignIn} errorMessage={errorMessage} />
      <UserRegistration isOpen={isSignUpOpen} onClose={onSignUpClose} />
    </chakra.header>
  );
};

export default Header;
