import { Select } from '@chakra-ui/react'
import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';

const LocationFilter = () => {

  const {country, setCountry, countries} = useContext(HouseContext);

  const locationHandler = (event)=> {
    setCountry(event.target.value);
  }

  return (
    <Select value={country} onChange={locationHandler} placeholder='Select Country'>
      {
        countries.map((country, index)=> 
          <option key={index}>{country}</option>
        )
      }
    </Select>
  );
};

export default LocationFilter;