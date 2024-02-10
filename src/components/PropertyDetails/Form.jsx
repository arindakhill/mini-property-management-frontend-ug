import React, { useState, useEffect } from 'react';
import {
  useToast,
  VStack,
  HStack,
  Image,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  useDisclosure,
  Textarea,
  Select
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import SignInModal from '../auth/SignInModal';
import Agent1 from '../../assets/images/agents/agent1.png';




const Form = ({ searchedHouse }) => {

  const {user, signIn} = useAuth();
// Construct the default message only if user and searchedHouse are available
const defaultMessage = user && searchedHouse
  ? `Hello, I am interested in your property located at ${searchedHouse.address.city}. My name is ${user.firstname} ${user.lastname} and I can be reached on tel: ${user.phoneNumber}.`
  : 'Please Sign in or Sign up if you are new to send a message to the owner.'




  const { isOpen, onOpen, onClose } = useDisclosure();
  const [offer, setOffer] = useState('');
  const [offerType, setOfferType] = useState('');
const[isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const toast = useToast();

   // New state to track if the user can make an offer
   const [canMakeOffer, setCanMakeOffer] = useState(true);
   const navigate = useNavigate();
   const apiUrl = 'http://localhost:8080/api/v1/properties';
   const token = sessionStorage.getItem('token'); // Retrieve the token
   const [hasMadeOffer, setHasMadeOffer] = useState(false);

   useEffect(() => {
    const checkIfCanMakeOffer = async () => {
      try {
        // Assuming there's an endpoint to fetch offers by property ID and user ID
        const response = await axios.get(`http://localhost:8080/api/v1/properties/${searchedHouse.id}/offers-illegibility`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
  
       
  
        setCanMakeOffer(response.data);
      } catch (error) {
        console.error('Error checking if can make offer:', error);
        toast({
          title: "Cannot Check Offer Status",
          description: "There was a problem checking if you can make an offer. Please try again later.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        setCanMakeOffer(false);
      }
    };
  
    if (user && searchedHouse) {
      checkIfCanMakeOffer();
    }
  }, [user, searchedHouse]);
   


//handle signin for offer
const handleSignInForOffer = async (credentials) => {
  try{  
    await signIn(credentials);
   
    setIsSignInModalOpen(false);
  }catch(error){
    console.error('Error signing in:', error);
    toast({
      title: 'Error signing in',
      description: 'There was an error signing in. Please try again later.',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };
}




  const handlePlaceOffer = () => {

if(!user){
  toast({
    title: 'You must be signed in to place an offer.',
    status: 'warning',
    duration: 5000,
    isClosable: true,
  });
  setIsSignInModalOpen(true);
  return;
  //navigate('/signin');
}





//only customers can make offers
if (user.role !== 'CUSTOMER') {
  toast({
    title: 'Access Denied',
    description: 'Only customers can place offers.',
    status: 'error',
    duration: 5000,
    isClosable: true,
  });
  return;
}



if(!canMakeOffer){
  navigate('/offer-history');
}

    if(canMakeOffer){
      console.log('Can place offer');
      onOpen();
    }else{
      toast({
        title: 'Cannot Place Offer',
        description: `You cannot place an offer on this property at this moment.`,
        status: 'error',
        duration: 5000,
        isClosable: true,
    });
  }
  };


// Add the placeOffer function inside the Form component
const placeOffer = async (offerDetails) => {
  try {
    
    const propertyId = offerDetails.propertyId; // Make sure this is passed correctly
    const apiUrl = 'http://localhost:8080/api/v1/properties';
   
    const token = sessionStorage.getItem('token'); // Retrieve the token

    // Prepare the body of the request based on your backend requirements
    const body = {
      offerAmount: offerDetails.offerAmount,
      offerType: offerDetails.offerType,
      // You may add other fields required by your backend
    };

    // Make the POST request to the backend
    const response = await axios.post(`${apiUrl}/${propertyId}/offers`, body, {
      headers: {
        Authorization: `Bearer ${token}`, // Ensure the token is passed in the Authorization header
      },
    });

    // Handle the response from the backend
    console.log('Offer placed successfully:', response.data);
    // You can use toast or another method to notify the user of success
  } catch (error) {
    console.error('Error placing offer:', error.response ? error.response.data : error.message);
    // Handle errors, e.g., showing an error notification to the user
  }
};



  const submitOffer = () => {
    // Here you would handle the offer submission to your backend
        // Construct offer details
    const offerDetails = {
        propertyId: searchedHouse.id,
        userId: user.id,
        offerAmount: offer,
        offerType,
        offerStatus: 'PENDING',
        propertyStatus: searchedHouse.status,
        date: new Date().toISOString(),
      };
    // Save the offer details
    placeOffer(offerDetails);

 // Close the modal and show a success message
    onClose();
    toast({
      title: 'Offer Placed',
      description: `Your offer of ${offer} has been submitted for the property.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    // Reset the offer state after submitting
    setOffer('');
    setOfferType('');
  };




  // Function to send an email
  const handleSendEmail = () => {
    // Simulate email sending logic here
    // For now, just show a toast notification
    toast({
      title: 'Email Sent',
      description: 'Your message has been emailed to the owner.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };




  // Function to make a call
  const handleCall = () => {

    // For now we are  just making a toast
    toast({
        title: 'Making call',
        description: 'Calling property owner',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
  };


  return (
  
    <>
      <VStack
        spacing={4}
        align="stretch"
        border="1px"
        borderColor="gray.200"
        boxShadow="md"
        p={5}
        borderRadius="md"
        backgroundColor="white"
        // Adjust the width to fit the design
        w={{ base: '100%', md: '400px' }}
      >
        <HStack spacing={4}>
         {<Image borderRadius='full' boxSize='50px' src={Agent1} /> } 
          <VStack align="start">
           {<Text fontWeight='bold'>{searchedHouse.name}</Text> } 
            {<Text fontSize='sm'>Cool property owner</Text> }
          </VStack>
        </HStack>
        

                    <Textarea
                my='2'
                placeholder='Your message'
                size='md'
                defaultValue={defaultMessage}
                resize='vertical' // Allows the user to resize the textarea vertically
                rows={5}
            />    



        <Button colorScheme="teal" onClick={handlePlaceOffer}>
         {canMakeOffer ? 'Place Offer' : 'View Offer Status'} 
          </Button>


                {isSignInModalOpen && (
        <SignInModal
          isOpen={isSignInModalOpen}
          onClose={() => setIsSignInModalOpen(false)}
          onSignIn={handleSignInForOffer}
        />
           )}




          
        <Button colorScheme="blue" onClick={handleSendEmail}>Send Email</Button>

        <Button colorScheme="green" onClick={handleCall}>Call</Button>
      </VStack>



{/* Modal for placing an offer */}

<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Place Your Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>Suggested amount: $ {searchedHouse.price}</Text>
            <NumberInput min={0} onChange={(valueString) => setOffer(valueString)} required>
              <NumberInputField placeholder="Enter your offer amount" />
            </NumberInput>
            <Select placeholder="Select offer type" mt={4} onChange={(e) => setOfferType(e.target.value)} required>
              <option value="CASH">Cash</option>
              <option value="DOWNPAYMENT">Down Payment</option>
              <option value="CREDIT">Credit</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={submitOffer}>
              Submit Offer
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

};

export default Form;