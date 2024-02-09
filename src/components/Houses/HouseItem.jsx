import {
  VStack,
  Divider,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  Flex,
  Box,
  useStyleConfig,
  Button,
  useToast
  
} from "@chakra-ui/react";
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import { StarIcon } from "@chakra-ui/icons"; // Import the Star icon for the favorites button
import { Link } from 'react-router-dom';
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";



const HouseItem = ({ house }) => {
  const toast = useToast();
  const { user } = useAuth; // Using AuthContext to access the current user
  const [isFavorite, setIsFavorite] = useState(false);
  const styles = useStyleConfig("HouseItem");

  useEffect(() => {
    // Function to check if the current property is in the user's favorite list
    const checkFavoriteStatus = async () => {
      if (user) {
        try {
          const response = await axios.get(`http://localhost:8080/api/v1/properties/favourite-properties`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } // Assuming you have the token in your user context
          });
          const favoriteProperties = response.data;
          setIsFavorite(favoriteProperties.some(favoriteProperty => favoriteProperty.id === house.id));
        } catch (error) {
          console.error('Error fetching favorite properties:', error);
          //use toast to show error message
          toast({
            title: 'Error fetching favorite properties',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    checkFavoriteStatus();
  }, [house.id, user]);

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: 'You must be signed in to modify favorites.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const url = `http://localhost:8080/api/v1/properties/${house.id}/unlike`;
      if (isFavorite) {
        // Call unlike endpoint
        await axios.post(`http://localhost:8080/api/v1/properties/${house.id}/unlike`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`  },
        });
        setIsFavorite(false);
        toast({
          title: 'Removed from Favorites',
          description: 'This property has been removed from your favorites.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Call like endpoint
        await axios.post(`http://localhost:8080/api/v1/properties/${house.id}/like`, {}, {
          headers: { Authorization:  `Bearer ${sessionStorage.getItem('token')}`  },
        });
        setIsFavorite(true);
        toast({
          title: 'Added to Favorites',
          description: 'This property has been added to your favorites.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error modifying favorite status:', error);
      toast({
        title: 'Error',
        description: 'An error occurred while modifying favorite status.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };




 


  return (
    <Flex justify='center' align='center'>


<VStack
      as="article"
      {...styles}
      _hover={{
        transform: 'scale(1.05)', // Scales up the house item
        zIndex: 2, // Ensures the scaled item overlaps adjacent items
        boxShadow: '0 4px 14px 0 rgba(0, 0, 0, 0.25)', // Apply a shadow effect
      }}
      transition="transform 0.2s, box-shadow 0.2s" // Smooth transition for transform and shadow
    >


        <Stack justify='center' width="300px" bg="white" boxShadow="xl" borderRadius="xl">
        <Link to={`/property-details/${house.id}`} key={house.id}>
        <Image src={house.imageLg} h='170' alt='houses' />
        </Link>

        <VStack p='4' align='left'>
            <Text mt="-1" fontWeight="extrabold" fontSize="18px" color="pink.500">
            $ {house.price}
            <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                /month
            </span>
            </Text>

            <Heading fontSize="24px" letterSpacing="tight">
            {house.name}
            </Heading>

            <Text fontSize="13px" color="grey">
             {house.address.country} {house.address.city} {house.address.street} {house.address.zipCode}
            </Text>

            <Divider my="2.5" />

            <HStack spacing="5">
            <HStack>
                <BiBed style={{ color: "#D53F8C" }} />
                <Text fontSize="12px">{house.bedRooms}</Text>
            </HStack>

            <HStack>
                <BiBath style={{ color: "#D53F8C" }} />
                <Text fontSize="12px">{house.bathRooms}</Text>
            </HStack>

            <Button leftIcon={isFavorite ? <StarIcon /> : <StarIcon />} 
                colorScheme="yellow" size="sm" 
                onClick={() => addToFavorites(house.id)}
                isDisabled={isFavorite}>
          {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </Button>

           
            </HStack>

        </VStack>
        </Stack>



        </VStack>

    </Flex>
  );
};

export default HouseItem;
