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
  const { user } = useAuth(); // Corrected to useAuth()
  const [isFavorite, setIsFavorite] = useState(false);
  const styles = useStyleConfig("HouseItem");
  const isCustomer = user && user.role === 'CUSTOMER';

  // Function to fetch favorite status
  const fetchFavoriteStatus = async () => {
    if (user) {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/properties/favourite-properties`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        // Check if the current house is in the favorites
        setIsFavorite(response.data.some(property => property.id === house.id));
      } catch (error) {
        toast({
          title: 'Error fetching favorite status',
          description: error.response?.data?.message || error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // Function to handle like/unlike
  const handleFavoriteToggle = async () => {
    if (!user) {
      toast({
        title: 'You must be signed in to add favorites.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const endpoint = isFavorite ? 'unlike' : 'like';
      await axios.post(`http://localhost:8080/api/v1/properties/${house.id}/${endpoint}`, {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setIsFavorite(!isFavorite);
      console.log(house);
      toast({
        title: isFavorite ? 'Removed from Favorites' : 'Added to Favorites',
        status: isFavorite ? 'info' : 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating favorite status',
        description: error.response?.data?.message || error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Fetch the favorite status when the component mounts
  useEffect(() => {
   if(isCustomer) fetchFavoriteStatus();
  }, [house.id, user]);


 


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
        <Image src={house.imageUrl} h='170' alt='houses' />
        </Link>

        <VStack p='4' align='left'>
            <Text mt="-1" fontWeight="extrabold" fontSize="18px" color="pink.500">
            $ {house.price}
           {house.listingType=='RENT' && <span style={{ fontSize: 12, color: "grey", fontWeight: "normal" }}>
                /month
            </span>}
            {house.listingType=='SALE' && <span style={{ fontSize: 12, color: "red", fontWeight: "normal" }}>
                Hot Sale
            </span>}

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

           { isCustomer && <Button leftIcon={isFavorite ? <StarIcon /> : <StarIcon />} 
                colorScheme="yellow" size="sm" 
                onClick={handleFavoriteToggle}
                isDisabled={!user}>
          {isFavorite ? 'Favorited' : 'Add to Favorites'}
        </Button>
        }

           
            </HStack>

        </VStack>
        </Stack>



        </VStack>

    </Flex>
  );
};

export default HouseItem;
