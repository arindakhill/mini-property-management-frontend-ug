import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';
import { Box, Button, Flex, Input, Select, Text, Heading } from '@chakra-ui/react';
import { all } from 'axios';

const SearchFilters = () => {
  const {
    houses,minPrice, setMinPrice, maxPrice, setMaxPrice, listingType, setListingType,
    minBedRooms, setMinBedRooms, maxBedRooms, setMaxBedRooms,
    minBathRooms, setMinBathRooms, maxBathRooms, setMaxBathRooms,
    propertyType, setPropertyType, city, setCity, state, setState,
    clearFilters, searchHandler // Assuming you have a function to trigger the search
  } = useContext(HouseContext);

  // Handlers for filter changes
  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  // Add more handlers for other filters
  const handleListingTypeChange = (e) => setListingType(e.target.value);
    const handleMinBedRoomsChange = (e) => setMinBedRooms(e.target.value);
    const handleMaxBedRoomsChange = (e) => setMaxBedRooms(e.target.value);
    const handleMinBathRoomsChange = (e) => setMinBathRooms(e.target.value);
    const handleMaxBathRoomsChange = (e) => setMaxBathRooms(e.target.value);
    const handlePropertyTypeChange = (e) => setPropertyType(e.target.value);
    const handleCityChange = (e) => setCity(e.target.value);
    const handleStateChange = (e) => setState(e.target.value);
   // const handleCountryChange = (e) => setCountry(e.target.value);
    // Add more handlers for other filters


    const allCites = houses.map(house => house.address.city);
    const uniqueCities = [...new Set(allCites)];
    const allStates = houses.map(house => house.address.state);
    const uniqueStates = [...new Set(allStates)];


 

  return (
    <Flex my='3' direction='column' borderRadius='md' bg='#fff' boxShadow='md' p='5'>

<Heading py='2' size={{base: 'sm', md: 'md'}} align='center' color='blue'>Discover Your Dream Property</Heading>
<Flex gap={{base: 3, md: 2}} direction={{base: 'column', md:'row'}} borderRadius='30'>

      <Text fontSize="xl" mb="4">Search Filters</Text>
      <Flex gap="4" wrap="wrap">
        <Box>
          <Input placeholder="Min Price" value={minPrice} onChange={handleMinPriceChange} />
        </Box>
        <Box>
          <Input placeholder="Max Price" value={maxPrice} onChange={handleMaxPriceChange} />
        </Box>
        {/* Implement inputs/selects for other filters similarly */}
        <Box>
          <Input placeholder="Min Bed Rooms" value={minBedRooms} onChange={handleMinBedRoomsChange} />
        </Box>
        <Box>
          <Input placeholder="Max Bed Rooms" value={maxBedRooms} onChange={handleMaxBedRoomsChange} />
        </Box>
        <Box>
          <Input placeholder="Min Bath Rooms" value={minBathRooms} onChange={handleMinBathRoomsChange} />
        </Box>
        <Box>
          <Input placeholder="Max Bath Rooms" value={maxBathRooms} onChange={handleMaxBathRoomsChange} />
        </Box>
        <Box>
          <Select value={city} onChange={handleCityChange} placeholder='Select City'>
                {
                    uniqueCities.map((type, index)=> 
                    <option key={index}>{type}</option>
                    )
                }
         </Select>

        </Box>
        <Box>

          <Select value={state} onChange={handleStateChange} placeholder='Select State'>
                {
                    uniqueStates.map((type, index)=> 
                    <option key={index}>{type}</option>
                    )
                }
         </Select>  


        </Box>
        
        <Box>
          <Select value={listingType} onChange={handleListingTypeChange} placeholder="Listing Type">
            <option value="RENT">Rent</option>
            <option value="SALE">Sale</option>
          </Select>
        </Box>
        <Box>
          <Select value={propertyType} onChange={handlePropertyTypeChange} placeholder="Property Type">
            <option value="APARTMENT">Apartment</option>
            <option value="HOUSE">House</option>
            <option value="CONDO">Condo</option>
            <option value="MOBILE">Shop</option>
          </Select>
        </Box>

      </Flex>
      <Flex gap="4" mt="4">
        <Button colorScheme="blue" onClick={searchHandler}>Search</Button>
        <Button colorScheme="red" onClick={clearFilters}>Clear Filters</Button>
      </Flex>
    </Flex>
    </Flex>
  );
};

export default SearchFilters;
