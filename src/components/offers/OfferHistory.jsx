import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Button, Heading, useColorModeValue, useDisclosure , Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, NumberInput, NumberInputField, Select, HStack} from '@chakra-ui/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // If using React Router
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const OfferHistory = () => {
  const { user } = useAuth(); // get logged in user
  const toast = useToast();

  const [userOffers, setUserOffers] = useState([]);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
const apiUrl = 'http://localhost:8080/api/v1/properties/offers';
const deleteUrl = 'http://localhost:8080/api/v1/properties';

  const navigate = useNavigate(); // For navigation

 
  

  useEffect(() => {
    const fetchUserOffers = async () => {
      if (user) {
        try {
          const response = await axios.get(`${apiUrl}`, {
            headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
          });
          setUserOffers(response.data);
        } catch (error) {
          console.error('Error fetching offers:', error);
          // Optionally, handle the error, e.g., showing a notification using a toast
          toast({
            title: 'Error fetching offers',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });


        }
      }
    };

   //fetchUserOffers();
  // window.location.reload();
  }, [user,userOffers]);

  //  function to navigate to property details 
  const goToPropertyDetails = (propertyId) => {
    navigate(`/property-details/${propertyId}`);
  };

const checkAndDeleteOffer = async (offerId, propertyId) => {
  try{
    //check if offer can be deleted
    console.log('OfferId:',offerId)
    //print propertyId
    console.log('PropertyId:',propertyId);

    const canDeleteResponse = await axios.get(`http://localhost:8080/api/v1/properties/${propertyId}/can-delete-offer`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
    });

      if(canDeleteResponse.data === true){
        console.log('Can delete offer:',canDeleteResponse.data);
        //delete the offer
     await axios.delete(`http://localhost:8080/api/v1/properties/${propertyId}/offers`, {
          headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
        });
        console.log('Offer deleted successfully',response.data);
          //toast to show success message
          toast({
            title: 'Offer deleted successfully',
            description: 'Your offer has been deleted successfully.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

        //refresh the page
        //window.location.reload();
       const updatedOffers = userOffers.filter(offer => offer.id !== offerId);
       setUserOffers(updatedOffers);
      // window.location.reload();
      }else{
        //toast to show error message
        toast({
          title: 'failed to delete offer yet i was eligible to delete',
          description: 'failed to delete offer yet i was eligible to delete',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }catch (error) {
        console.error('Error deleting offer:', error);
        // Optionally, handle the error, e.g., showing a notification using a toast
        toast({
          title: 'Error deleting offer',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

  }
}




  // Function to update an offer
  const updateOffer = async (offerId, newOfferAmount, newOfferType) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/properties/${selectedOffer.property.id}/offers`, {
        offerAmount: newOfferAmount,
        offerType: newOfferType,
      }, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` },
      });
      // Update the userOffers state with the updated offer
      console.log('Offer updated successfully',response.data);
      //refresh the page
      window.location.reload();
      onClose();//close the modal
    } catch (error) {
      console.error('Error updating offer:', error);
      // Optionally, handle the error, e.g., showing a notification using a toast
      toast({
        title: 'Error updating offer',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }




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
              onClick={() => goToPropertyDetails(offer.property.id)}
            >
              View Property
            </Button>

            <Button  colorScheme="teal" onClick={() => { setSelectedOffer(offer); onOpen(); }}>
              Update Offer
            </Button>

            <Button  colorScheme="red" onClick={() => { setSelectedOffer(offer); console.log(selectedOffer);checkAndDeleteOffer(selectedOffer.id,selectedOffer.property.id) }}>
              Cancel Offer
            </Button>

            </HStack>
          </Box>
         
        ))
      ) 
       : 
       <Link to="/" ><Text textAlign="center" color='pink.700'>No offers made yet. Search for properties</Text>  </Link>
      }




 {/* Modal for updating an offer */}
 <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader>Update Your Offer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* Input for new offer amount */}
            <NumberInput defaultValue={selectedOffer?.offerAmount} min={0} required>
              <NumberInputField id="offerAmount" placeholder="Enter your new offer amount" />
            </NumberInput>
            {/* Select for new offer type */}
            <Select placeholder="Select offer type" defaultValue={selectedOffer?.offerType} mt={4} id="offerType" required>
              <option value="CASH">Cash</option>
              <option value="DOWNPAYMENT" >Down Payment</option>
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
