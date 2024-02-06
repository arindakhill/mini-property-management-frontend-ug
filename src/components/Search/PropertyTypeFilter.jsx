import { Select } from '@chakra-ui/react'
import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';

const PropertyTypeFilter = () => {

  const {property, setProperty, properties} = useContext(HouseContext);

  const propertyTypeHandler = (event)=> {
    setProperty(event.target.value);
  }

  return (
    <Select value={property} onChange={propertyTypeHandler} placeholder='Select Type'>
      {
        properties.map((type, index)=> 
          <option key={index}>{type}</option>
        )
      }
    </Select>
  );
};

export default PropertyTypeFilter;