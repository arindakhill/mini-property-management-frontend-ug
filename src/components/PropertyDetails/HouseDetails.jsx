import { IconButton,Stack, VStack, Heading, Text, Box, HStack, Image, Input, Textarea, Button, useToast } from "@chakra-ui/react"
import { BiBed, BiBath, BiArea } from "react-icons/bi";
import {StarIcon} from "@chakra-ui/icons";

import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useAuth } from '../../context/AuthContext';

import { HouseContext } from "../../context/HouseContext";
import Form from "./Form";

import axios from 'axios';

const HouseDetails = () => {


const toast = useToast();
  const {propertyId} = useParams();
  const { houses } = useContext(HouseContext);
  const {user} = useAuth();

  const searchedHouse = houses.find(house=> house.id== propertyId);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [isLiked, setIsLiked] = useState(false);


//fetch all favorite properties
const fetchFavoriteProperties = async () => {
  if (user) {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/properties/favourite-properties`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      setFavoriteProperties(response.data);

      //check if current property is in favorite properties
      setIsLiked(response.data.some(property => property.id === parseInt(propertyId)));
    } catch (error) {
      console.error('Error fetching favorite properties:', error);
      // Handle error, e.g., show a notification using a toast
      toast({
        title: 'Error fetching favorite properties',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    
    }

  }
};


// Call fetchFavoriteProperties when the component mounts
useEffect(() => {
  fetchFavoriteProperties();
  console.log(searchedHouse);

}, [user, propertyId]);

// Function to like a property
const likeProperty = async () => {
  if (user) {
    try {
      await axios.post(`http://localhost:8080/api/v1/properties/${propertyId}/like`, {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      // Refetch the favorite properties to update the UI
      //toast to show success message
      toast({
        title: 'Property liked successfully',
        description: 'The property has been liked successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchFavoriteProperties();
    } catch (error) {
      console.error('Error liking the property:', error);
      // Handle error, e.g., show a notification using a toast
      toast({
        title: 'Error liking the property',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
};

// Function to unlike a property
const unlikeProperty = async () => {
  if (user) {
    try {
      await axios.post(`http://localhost:8080/api/v1/properties/${propertyId}/unlike`, {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`, 
        },
      });
      // Refetch the favorite properties to update the UI
      //toast to show success message
      toast({
        title: 'Property unliked successfully',
        description: 'The property has been unliked successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      fetchFavoriteProperties();
    } catch (error) {
      console.error('Error unliking the property:', error);
      // Handle error, e.g., show a notification using a toast
      toast({
        title: 'Error unliking the property',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
};

  






  return (
    <>
      <Stack direction={{base: 'column', md: 'row'}} justify='space-between' align={{md: 'center'}}  my='28px'>
        <Box>
          <Heading fontSize='30px'>{searchedHouse.name}</Heading>
          <Text fontSize='20px'>{searchedHouse.address.country} {searchedHouse.address.city} {searchedHouse.address.street} {searchedHouse.address.zipCode}</Text>
        </Box>
        
        <HStack>
          <Text px='5' borderRadius='full' bg='green.300' fontWeight="extrabold">{'for '+searchedHouse.listingType}</Text>
          <Text px='3' borderRadius='full' bg='purple.300'>{searchedHouse.address.country}</Text>
          <Text px='3' borderRadius='full' bg='teal.300'>{searchedHouse.address.state}</Text>
          <Text px='3' borderRadius='full' bg='teal.300'>{searchedHouse.address.city}</Text>
          <Text fontWeight="extrabold" fontSize="20px" color="pink.500">$ {searchedHouse.price}</Text>
        </HStack>

     
      </Stack>

      <Stack direction={{base:'column', lg: 'row'}} gap='40' align='flex-start'>
        <VStack align='left' maxW='840px'>
          <Image src={searchedHouse.imageUrl} alt='house' />

          <Stack py='10px' spacing={{sm: '3', md: '5'}} direction={{base: 'column', md: 'row'}}>
            <HStack>
                <BiBed style={{ color: "#D53F8C" }} />
                <Text fontSize="14px">{searchedHouse.bedRooms} Bedrooms</Text>
            </HStack>

            <HStack>
                <BiBath style={{ color: "#D53F8C" }} />
                <Text fontSize="14px">{searchedHouse.bathRooms} Bathrooms</Text>
            </HStack>

          

               {/* Like/Unlike button */}

           { user && user.role=='CUSTOMER' &&
           <IconButton
        aria-label={isLiked ? 'Unlike' : 'Like'}
        icon={isLiked ? <StarIcon color="yellow.400" /> : <Text fontSize="20px">☆</Text>}
        isRound={true}
        size="lg"
        variant="ghost"
        colorScheme="yellow"
        onClick={isLiked ? unlikeProperty : likeProperty}
      />
  }



          
          </Stack>
        
          <Text fontSize='15px'>{searchedHouse.description}</Text>
      
        </VStack>
        
        <Form searchedHouse={searchedHouse} user={user} />
      </Stack>
    </>
  )
}

export default HouseDetails;