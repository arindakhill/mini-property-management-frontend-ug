// src/components/offers/OfferHistory.jsx

import React, { useEffect, useState } from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext'; // Adjust the path as necessary

const OfferHistory = () => {
  const { user } = useAuth();
  const [userOffers, setUserOffers] = useState([]);

  useEffect(() => {
    const fetchUserOffers = () => {
      // Fetch offers from localStorage or your backend
      const allOffers = JSON.parse(localStorage.getItem('offers')) || [];
      const offers = allOffers.filter(offer => offer.userId === user.id); // Adjust according to how you store user ID in offers
      setUserOffers(offers);
    };

    if (user) {
      fetchUserOffers();
    }
  }, [user]);

  return (
    <VStack align="stretch" spacing={4}>
      {userOffers.length > 0 ? (
        userOffers.map((offer) => (
          <Box key={offer.id} p={4} shadow="md" borderWidth="1px">
            <Text>Offer Amount: ${offer.offerAmount}</Text>
            <Text>Date: {new Date(offer.date).toLocaleString()}</Text>
            {/* Additional offer details can be displayed here */}
          </Box>
        ))
      ) : (
        <Text>No offers made yet.</Text>
      )}
    </VStack>
  );
};

export default OfferHistory;
