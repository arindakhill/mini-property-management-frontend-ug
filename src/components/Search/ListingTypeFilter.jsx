import { Select } from '@chakra-ui/react'
import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';

const ListingTypeFilter = () => {

  const {houses, country, setListingType, listingType} = useContext(HouseContext);

  const listingTypeHandler = (event)=> {
    setListingType(event.target.value);
  }



  
    const allListingTypes = houses.map(house => house.listingType);
    const uniqueListingTypes = [...new Set(allListingTypes)]
    
  
  
   




  return (
    <Select value={listingType} onChange={listingTypeHandler} placeholder='Select listing type'>
      {
        uniqueListingTypes.map((uniqueListingType, index)=> 
          <option key={index}>{uniqueListingType}</option>
        )
      }
    </Select>
  );
};

export default ListingTypeFilter;