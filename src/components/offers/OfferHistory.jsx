import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button, Heading, useColorModeValue, useDisclosure , Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, NumberInput, NumberInputField, Select, HStack} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // If using React Router

const OfferHistory = () => {
  const { user } = useAuth();

  const [userOffers, setUserOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate(); // For navigation
  

  useEffect(() => {
    const fetchUserOffers = () => {
      const allOffers = JSON.parse(localStorage.getItem('offers')) || [];
      const offers = allOffers.filter(offer => offer.userId === user.id);
      setUserOffers(offers);
    };

    if (user) {
      fetchUserOffers();
    }
  }, [user]);

  // Mock function to navigate to property details - adjust with your actual routing logic
  const goToPropertyDetails = (propertyId) => {
    navigate(`/property-details/${propertyId}`);
  };

  const updateOffer = (offerId, newAmount, newType) => {
    const offers = JSON.parse(localStorage.getItem('offers')) || [];
    const offerIndex = offers.findIndex(offer => offer.id === offerId);
    if (offerIndex > -1) {
      offers[offerIndex].offerAmount = newAmount;
      offers[offerIndex].offerType = newType;
      localStorage.setItem('offers', JSON.stringify(offers));
      fetchUserOffers(); // Refresh offers after update
      onClose(); // Close modal
    }
  };



  return (
    <VStack
      align="stretch"
      spacing={4}
      p={5}
      backgroundColor={useColorModeValue('gray.50', 'gray.800')}
      borderRadius="lg"
      boxShadow="lg"
    >
      <Heading size="lg" textAlign="center" mb={5}>
        Offer History
      </Heading>
      {userOffers.length > 0 ? (
        userOffers.map((offer) => (
          <Box key={offer.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg={useColorModeValue('white', 'gray.700')}>
            <Text fontSize="lg" fontWeight="bold">
              Property: {offer.propertyName}
            </Text>
            <Text>Offer Amount: ${offer.offerAmount}</Text>
            <Text>Status: {offer.offerStatus}</Text>
            <Text>Type: {offer.offerType}</Text>
            <Text>Date: {new Date(offer.offerDate).toLocaleDateString()}</Text>

<HStack>
            <Button
            
              colorScheme="teal"
              onClick={() => goToPropertyDetails(offer.propertyId)}
            >
              View Property
            </Button>

            <Button  colorScheme="teal" onClick={() => { setSelectedOffer(offer); onOpen(); }}>
              Update Offer
            </Button>
            </HStack>
          </Box>
         
        ))
      ) 
       : 
        <Text textAlign="center">No offers made yet.</Text>
      }




 {/* Modal for updating an offer */}
 <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Update Your Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Input for new offer amount */}
            <NumberInput defaultValue={selectedOffer?.offerAmount} min={0}>
              <NumberInputField id="offerAmount" placeholder="Enter your new offer amount" />
            </NumberInput>
            {/* Select for new offer type */}
            <Select placeholder="Select offer type" defaultValue={selectedOffer?.offerType} mt={4} id="offerType">
              <option value="CASH">Cash</option>
              <option value="DOWNPAYMENT">Down Payment</option>
              <option value="CREDIT">Credit</option>
            </Select>
          </ModalBody>
          <ModalFooter>
        
            <Button  width='200px' colorScheme="blue" onClick={() => updateOffer(selectedOffer.id, document.getElementById('offerAmount').value, document.getElementById('offerType').value)}>
              Update Offer
            </Button>
            </ModalFooter>
       
        </ModalContent>
      </Modal>

    





    </VStack>
  );
};

export default OfferHistory;
