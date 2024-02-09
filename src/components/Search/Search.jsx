import { Button, Flex, Heading } from '@chakra-ui/react'
import { useContext, forwardRef} from "react";
import { HouseContext } from '../../context/HouseContext';

import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import PropertyTypeFilter from "./PropertyTypeFilter";
import ListingTypeFilter from "./ListingTypeFilter";

const Search = () => {

  const { searchHandler, clearFilters } = useContext(HouseContext);
  

  return (
    
    <Flex my='3' direction='column' borderRadius='md' bg='#fff' boxShadow='md' p='5'>

      <Heading py='2' size={{base: 'sm', md: 'md'}}>Discover Your Dream Property</Heading>

      <Flex gap={{base: 3, md: 2}} direction={{base: 'column', md:'row'}} borderRadius='30'>
        <LocationFilter />
        <PropertyTypeFilter />
        <PriceFilter />
        <ListingTypeFilter />
        <Button onClick={searchHandler} p={{base: 3, md: 2}} size="100%">Search</Button>
        <Button onClick={clearFilters} p={{base: 3, md: 2}} size="100%" colorScheme='red'>Clear</Button>
      </Flex>
    </Flex>
 
  );
};

export default Search