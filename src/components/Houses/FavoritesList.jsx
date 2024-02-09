import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, SimpleGrid, useToast ,Heading} from '@chakra-ui/react';
import HouseItem from './HouseItem'; // Adjust the import path as necessary
import { useAuth } from '../../context/AuthContext';

const FavoritesList = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const toast = useToast();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/properties/favourite-properties`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setFavorites(response.data);
      console.log(response.data);
    } catch (error) {
      toast({
        title: 'Error fetching favorites',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Heading as="h2" size="xl" textAlign="center" mb={10}>
       { `${user.firstname}'s Favorite Properties`}
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        {favorites.map(house => (
          <Box key={house.id}>
            <HouseItem house={house} />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default FavoritesList;
