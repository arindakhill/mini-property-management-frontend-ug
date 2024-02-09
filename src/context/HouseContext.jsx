import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';




//import { housesData } from '../data';



export const HouseContext = createContext('');

const HouseProvider = ({children}) =>{
    const toast = useToast();
//state to store all properties
    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);



//Function to fetch all properties from backend
    const fetchProperties = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://localhost:8080/api/v1/properties')
            setHouses(response.data.content);
            console.log(response.data.content);
            
        }catch (error) {
            console.error('Error fetching properties:', error);
            // Handle error, e.g., show a notification using a toast
            toast({
                title: 'Error fetching properties',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            
           setHouses([]);
            
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProperties();
    }, []);






    
    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [price, setPrice] = useState('');
    const [property, setProperty] = useState('');
    const [properties, setProperties] = useState([]);
    const [listingType,setListingType] = useState('');
   
    
    useEffect(() => {
        const allCountries = houses.map(house=>{
            return house.address.country;
        })
        const uniqueCountries = [...new Set(allCountries)];
        setCountries(uniqueCountries);
    }, []);

    useEffect(() => {
        const allPropertyTypes = houses.map(house=>{
            return house.properyType;
        })
        const uniquePropertyTypes = [...new Set(allPropertyTypes)];
        setProperties(uniquePropertyTypes);
    }, []);

        //Clear Filters
        const clearFilters = () => {
            setCountry('');
            setPrice('');
            setProperty('');
            // Add any other states you want to reset
        };



    // const searchHandler=()=>{
    //     setIsLoading(true);
       
    //     // checking selection 
    //     const isDefault = (str)=> {
    //         return str.split(' ').includes('Select');
    //     }
    //     const minPrice = parseInt(price.split(' ')[0]);
    //     const maxPrice = parseInt(price.split('- ')[1]);


                



    //     const filteredHouses = housesData.filter(house=> {
    //         const housePrice = parseInt(house.price);
    //         // no selection 
    //         if(isDefault(country) && isDefault(price) && isDefault(property) ){
    //             return house;
    //         }

    //         // country is selected
    //         if(!isDefault(country) && isDefault(price) && isDefault(property)){
    //             return house.country === country;
    //         }
            
    //         // price is selected
    //         if(isDefault(country) && !isDefault(price) && isDefault(property)){
    //             return (housePrice >= minPrice) && (housePrice <= maxPrice);
    //         }
            
    //         // property is selected
    //         if(isDefault(country) && isDefault(price) && !isDefault(property)){
    //             return house.type === property;
    //         }
            
    //         // country & price is selected
    //         if(!isDefault(country) && !isDefault(price) && isDefault(property)){
    //             return house.country === country && (housePrice >= minPrice) && (housePrice <= maxPrice);
    //         }
            
    //         // country & property is selected
    //         if(!isDefault(country) && isDefault(price) && !isDefault(property)){
    //             return house.country === country && house.type === property;
    //         }
            
    //         // price & property is selected
    //         if(isDefault(country) && !isDefault(price) && !isDefault(property)){
    //             return (housePrice >= minPrice) && (housePrice <= maxPrice) && house.type === property;
    //         }

    //         // all are selected 
    //         if(house.country === country && housePrice >= minPrice && housePrice <= maxPrice && house.type === property){
    //             return house;
    //         }

       
                



    //     })

    //     // setHouses(filteredHouses)
    //     setTimeout(() => {
    //         filteredHouses.length>0 ? setHouses(filteredHouses) : setHouses([]);
    //         setIsLoading(false);
    //     }, 1000);
    // }
    

//revised search handler

const searchHandler = () => {
    setIsLoading(true);
  
    // Checking selection
    const isDefault = (str) => {
      return str.split(' ').includes('Select');
    };
  
    // Parse price range from the price state
    const priceRange = price.split('-').map(s => s.trim());
    const minPrice = priceRange.length > 1 ? parseInt(priceRange[0]) : 0;
    const maxPrice = priceRange.length > 1 ? parseInt(priceRange[1]) : Infinity;
  
    const filteredHouses = houses.filter(house => {
      const housePrice = parseInt(house.price);
      const matchesCountry = isDefault(country) || house.country === country;
      const matchesPrice = housePrice >= minPrice && housePrice <= maxPrice;
      const matchesPropertyType = isDefault(property) || house.type === property;
      const matchesListingType = isDefault(listingType) || house.listingType === listingType;
  
      // Return the house if it matches all the selected filters
      return matchesCountry && matchesPrice && matchesPropertyType && matchesListingType;
    });
  
    // Update the houses state with the filtered houses
    setTimeout(() => {
      filteredHouses.length > 0 ? setHouses(filteredHouses) : setHouses([]);
      setIsLoading(false);
    }, 1000);
  };
  




    return(
        <HouseContext.Provider value={{
            houses,
            country,
            setCountry,
            countries,
            price,
            setPrice,
            property,
            setProperty,
            properties,
            searchHandler,
            isLoading,
            clearFilters,
            listingType,
            setListingType
        }}>
            {children}
        </HouseContext.Provider>
    )
}

export default HouseProvider;