import {
  HStack,
  VStack,
  Button,
  Text,
  Heading,
  Stack,
  Box,
  Image,
  useBreakpointValue
} from "@chakra-ui/react";
import { keyframes } from '@emotion/react';


import { BiPlus } from "react-icons/bi";

import { bannerData } from "../data";
import Apartment1Lg from "../assets/images/apartments/a1lg.png";
import Apartment6Lg from "../assets/images/apartments/a6lg.png";



// Define keyframes for the glowing effect with a color transition
const glowing = keyframes`
  0%, 100% { 
    box-shadow: 0 0 5px #e53e3e, 0 0 15px #e53e3e; // red
    color: #e53e3e;
  }
  33% {
    box-shadow: 0 0 10px #ed64a6, 0 0 25px #ed64a6; // pink
    color: #ed64a6;
  }
  66% {
    box-shadow: 0 0 20px #9b2c2c, 0 0 30px #9b2c2c; // maroon
    color: #9b2c2c;
  }
`;



const Banner = ({searchRef}) => {


  const handleScrollToSearch = () => {
    searchRef.current.scrollIntoView({ behavior: 'smooth' });
  };


// Responsiveness settings
const buttonSize = useBreakpointValue({ base: "md", md: "lg" });



  return (
    <>
      <Stack direction={{base:"row",lg:"row"}} spacing={{base:"4",lg:"8"}} my='6' overflow='hidden'>
        <VStack
          w="sm"
          maxW={{xl:"80%"}}
          flexGrow='1'
          px={{ sm: "6", md: "10" }}
          py={{ sm: '8',  md: "16" }}
         /**  bg="blue.100"*/
          bgGradient='linear(to-r, blue.100, gray.200)' 
          justify="center"
          align="left"
          borderRadius="2xl"
          spacing ="20"
        >
          <Heading fontSize={{ base: "xl", sm: "2xl", md: "5xl" }}>
            Your Dream Home Awaits.
          </Heading>
          <Text fontSize="xl" >
          Discover a place where every detail feels like it's tailor-made for you - because it is.
           Explore our curated listings to find a home that resonates with your lifestyle and lets you live the life you've always imagined.
          </Text>
         

          <HStack spacing="5">
            {bannerData.map((item, index) => (
              <VStack
                key={index}
                bg="teal.200"
                p="4"
                borderRadius="md"
                align="left"
                pr="8"
              >
                <HStack>
                  <Text fontSize={{sm: '14px', md: 'md'}} fontWeight="extrabold" mr="-2">
                    {Object.keys(item)}
                  </Text>{" "}
                  <BiPlus style={{ color: "#ED64A6" }} />
                </HStack>
                <Text fontSize={{sm: '12px', md: 'sm'}}>{Object.values(item)}</Text>
              </VStack>
            ))}
          </HStack>

          


          <Button
        onClick={handleScrollToSearch}
        size={buttonSize}
        bg="teal.300"
        color="white"
        _hover={{
          bg: 'teal.400',
        }}
        sx={{
          animation: `${glowing} 2.5s ease-in-out infinite`,
        }}
      >
        Explore Listings
      </Button>




        </VStack>

        <VStack justify='center'>
          <Box h='100%' display={{ base: "none", lg: "block", xl:'none' }} >
            <Image
              src={Apartment1Lg}
              alt="house"
              h='200%'
              objectFit='cover'
            />
          </Box>
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={Apartment1Lg}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={Apartment6Lg}
              alt="house"
              style={{height: '100%', width: '200%', objectFit: 'contain'}}
            />
          </Box>
        </VStack>


    

      </Stack>
    </>
  );
};

export default Banner;
