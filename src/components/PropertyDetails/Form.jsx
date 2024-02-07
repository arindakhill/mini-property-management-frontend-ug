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

const Form = ({ searchedHouse, user }) => {
// Construct the default message only if user and searchedHouse are available
const defaultMessage = user && searchedHouse
  ? `Hello, I am interested in your property located at ${searchedHouse.address}. My name is ${user.firstname} ${user.lastname} and I can be reached on tel: ${user.phoneNumber}.`
  : '';




  const { isOpen, onOpen, onClose } = useDisclosure();
  const [offer, setOffer] = useState('');
  const [offerType, setOfferType] = useState('');
  const toast = useToast();

   // New state to track if the user can make an offer
   const [canMakeOffer, setCanMakeOffer] = useState(true);
   const navigate = useNavigate();


   useEffect(() => {
    const checkIfCanMakeOffer = () => {
      const offers = JSON.parse(localStorage.getItem('offers')) || [];
      const existingOffer = offers.find(o => o.propertyId === searchedHouse.id && o.userId === user.id && (o.status === "PENDING" || o.status === "ACCEPTED"));
      const propertyIsEligible =  searchedHouse.status !== "CONTINGENT";

      setCanMakeOffer(!existingOffer && propertyIsEligible);
    };

    if (user && searchedHouse) {
      checkIfCanMakeOffer();
    }
  }, [user, searchedHouse]);
   


  const handlePlaceOffer = () => {

if(!user){
  toast({
    title: 'You must be signed in to place an offer.',
    status: 'warning',
    duration: 5000,
    isClosable: true,
  });
  navigate('/signin');
}




    if(canMakeOffer){
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
const placeOffer = (offerDetails) => {
    const offers = JSON.parse(localStorage.getItem('offers')) || [];
    offerDetails.id = offers.length + 1; // Simple way to generate a unique ID for the offer
   offerDetails.offerStatus = "PENDING";
   offerDetails.propertyStatus="PENDING";
    offers.push(offerDetails);

    localStorage.setItem('offers', JSON.stringify(offers));
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
          <Image borderRadius='full' boxSize='50px' src={searchedHouse.agent.image} />
          <VStack align="start">
            <Text fontWeight='bold'>{searchedHouse.agent.name}</Text>
            <Text fontSize='sm'>{searchedHouse.agent.phone}</Text>
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



        <Button colorScheme="teal" onClick={handlePlaceOffer}>Place Offer</Button>
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
            <NumberInput min={0} onChange={(valueString) => setOffer(valueString)}>
              <NumberInputField placeholder="Enter your offer amount" />
            </NumberInput>
            <Select placeholder="Select offer type" mt={4} onChange={(e) => setOfferType(e.target.value)}>
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
