import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // If using React Router

const OfferHistory = () => {
  const { user } = useAuth();
  const [userOffers, setUserOffers] = useState([]);
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
            <Button
              mt={3}
              colorScheme="teal"
              onClick={() => goToPropertyDetails(offer.propertyId)}
            >
              View Property
            </Button>
          </Box>
        ))
      ) : (
        <Text textAlign="center">No offers made yet.</Text>
      )}
    </VStack>
  );
};

export default OfferHistory;
