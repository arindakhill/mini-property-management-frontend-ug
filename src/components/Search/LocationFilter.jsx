import { Select } from '@chakra-ui/react'
import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';

const LocationFilter = () => {

  const {houses, country, setCountry, countries} = useContext(HouseContext);

  const locationHandler = (event)=> {
    setCountry(event.target.value);
  }



  
    const allCountries = houses.map(house => house.address.country);
    const uniqueCountries = [...new Set(allCountries)]
    
  
  
   




  return (
    <Select value={country} onChange={locationHandler} placeholder='Select Country'>
      {
        uniqueCountries.map((uniqueCountry, index)=> 
          <option key={index}>{uniqueCountry}</option>
        )
      }
    </Select>
  );
};

export default LocationFilter;