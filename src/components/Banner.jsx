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
import Apartment2Lg from "../assets/images/apartments/a2lg.png";
import Apartment3Lg from "../assets/images/apartments/a3lg.png";
import Apartment4Lg from "../assets/images/apartments/a4lg.png";
import Apartment5Lg from "../assets/images/apartments/a5lg.png";
import Apartment6Lg from "../assets/images/apartments/a6lg.png";
import House1Lg from '../assets/images/houses/house1lg.png';
import House2Lg from '../assets/images/houses/house2lg.png';
import House3Lg from '../assets/images/houses/house3lg.png';
import House4Lg from '../assets/images/houses/house4lg.png';
import House5Lg from '../assets/images/houses/house5lg.png';
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";



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
  
const { user } = useAuth();

  const handleScrollToSearch = () => {
    searchRef.current.scrollIntoView({ behavior: 'smooth' });
  };


// Responsiveness settings
const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

const isOwner = user && user.role == "OWNER";
const isAdmin = user && user.role == "ADMIN";
const isCustomer = user && user.role == "CUSTOMER";
const isNotLoggedIn = !user;


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
        <Heading fontSize={{ base: "xl", sm: "2xl", md: "5xl" }} color="purple.600" fontWeight="bold" textAlign="center" textTransform="uppercase">
  {isOwner ? 
  'Sell Your Property with Confidence' 
  : isAdmin ?
  'Discover a Comprehensive Platform for Property Management'

  :

  'Find Your Dream Home Today'
  }
</Heading>

<Text fontSize="xl" color="lilac" textAlign="center" fontWeight="bold">
  {(!isOwner && !isAdmin) ? (
    <>
      Discover a place where every detail feels <span style={{ color: "blue" }}>tailor-made for you</span> - because it is. Explore our curated listings to find homes that <span style={{ color: "blue" }}>embody modern living</span> and reflect the aspirations of discerning buyers like yourself. With our diverse range of properties, you can turn your dream of homeownership into a reality.
    </>
  ) : isOwner?(
    <>
      Welcome to your platform for selling properties effortlessly. Our streamlined process and expert guidance ensure that your property stands out in the market, attracting the right buyers and maximizing its value. List your property with us today and embark on a journey to a successful sale.
    </>
  ) : (
    <>  
      As an admin, you have the power to manage the platform and ensure that all users have a seamless experience. You can view and manage all properties and users, and make any necessary changes to the platform. Your role is crucial in maintaining the integrity and functionality of the platform.
    </>
  )

}
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

          


       { isOwner?  <Link to='/owner'> <Button
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
        Empower your property sale
      </Button>
</Link>

      :
      isAdmin ?
       <Button
       onClick={handleScrollToSearch}
      size={buttonSize}
      bg="teal.300"
      color="lilac"
      _hover={{
        bg: 'blue.400',
      }}
      sx={{
        animation: `${glowing} 2.5s ease-in-out infinite`,
      }}
    >
      Stream line property management
    </Button>
    : 
    <Button
    onClick={handleScrollToSearch}
      size={buttonSize}
      bg="blue.300"
      color="blue.900"
      _hover={{
        bg: 'blue.400',
      }}
      sx={{
        animation: `${glowing} 2.5s ease-in-out infinite`,
      }}
    >
      Find Your Home
    </Button>


}


{user && user.role== 'CUSTOMER' && <Link to='/favorites'>  <Button colorScheme='teal' alignSelf={true}>My Favourites</Button>  </Link>}

        </VStack>

        <VStack justify='center'>
{isNotLoggedIn &&
          <Box h='100%' display={{ base: "none", lg: "block", xl:'none' }} >
            <Image
              src={Apartment1Lg}
              alt="house"
              h='200%'
              objectFit='cover'
            />
          </Box>
}
{isNotLoggedIn &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={Apartment1Lg}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
}
{isNotLoggedIn &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={House1Lg}
              alt="house"
              style={{height: '100%', width: '200%', objectFit: 'contain'}}
            />
          </Box>
}



{/**Customer logged */}
{isCustomer &&
          <Box h='100%' display={{ base: "none", lg: "block", xl:'none' }} >
            <Image
              src={House2Lg}
              alt="house"
              h='200%'
              objectFit='cover'
            />
          </Box>
}
{isCustomer &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={House2Lg}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
}
{isCustomer &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={Apartment3Lg}
              alt="house"
              style={{height: '100%', width: '200%', objectFit: 'contain'}}
            />
          </Box>
}




{/**Owner logged */}
{isOwner &&
          <Box h='100%' display={{ base: "none", lg: "block", xl:'none' }} >
            <Image
              src={Apartment2Lg}
              alt="house"
              h='200%'
              objectFit='cover'
            />
          </Box>
}
{isOwner &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={House3Lg}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
}
{isOwner &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={Apartment6Lg}
              alt="house"
              style={{height: '100%', width: '200%', objectFit: 'contain'}}
            />
          </Box>
}




{/**Admin logged */}
{isAdmin &&
          <Box h='100%' display={{ base: "none", lg: "block", xl:'none' }} >
            <Image
              src={Apartment5Lg}
              alt="house"
              h='200%'
              objectFit='cover'
            />
          </Box>
}
{isAdmin &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={House4Lg}
              alt="house"
              style={{height: '100%', width: '100%', objectFit: 'contain'}}
            />
          </Box>
}
{isAdmin &&
          <Box h='50%' display={{ base: "none", xl: "block" }}>
            <Image
              src={House2Lg}
              alt="house"
              style={{height: '100%', width: '200%', objectFit: 'contain'}}
            />
          </Box>
}




        </VStack>
    


 




 


    

      </Stack>
    </>
  );
};

export default Banner;
