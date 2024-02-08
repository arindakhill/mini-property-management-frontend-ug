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


const HouseItem = ({ house ,user }) => {
  const toast = useToast();
  const favorites = JSON.parse(localStorage.getItem('favorites')) || {};
  const userFavorites = favorites[user?.id] || [];
  const isFavorite = userFavorites.includes(house.id);

  const addToFavorites = (houseId) => {
    if (!user) {
      toast({
        title: 'You must be signed in to add favorites.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (isFavorite) {
      toast({
        title: 'Property already in favorites.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
      return;
    }


    userFavorites.push(houseId);
    favorites[user.id] = userFavorites;
    localStorage.setItem('favorites', JSON.stringify(favorites));
    toast({
      title: 'Added to Favorites',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };
  

  const styles = useStyleConfig("HouseItem");


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
        <Image src={house.imageLg} h='170' alt='houses' />

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
             {house.address}
            </Text>

            <Divider my="2.5" />

            <HStack spacing="5">
            <HStack>
                <BiBed style={{ color: "#D53F8C" }} />
                <Text fontSize="12px">{house.bedrooms}</Text>
            </HStack>

            <HStack>
                <BiBath style={{ color: "#D53F8C" }} />
                <Text fontSize="12px">{house.bathrooms}</Text>
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
