import { Select } from '@chakra-ui/react'
import { useContext } from 'react';
import { HouseContext } from '../../context/HouseContext';

const PropertyTypeFilter = () => {

  const {houses, property, setProperty, properties} = useContext(HouseContext);

  const propertyTypeHandler = (event)=> {
    setProperty(event.target.value);
  }

  const allPropertyTypes = houses.map(house => house.propertyType);
    const uniquePropertyTypes = [...new Set(allPropertyTypes)];


  return (
    <Select value={property} onChange={propertyTypeHandler} placeholder='Select Type'>
      {
        uniquePropertyTypes.map((type, index)=> 
          <option key={index}>{type}</option>
        )
      }
    </Select>
  );
};

export default PropertyTypeFilter;