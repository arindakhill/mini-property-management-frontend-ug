import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import { useAuth } from './AuthContext';




//import { housesData } from '../data';



export const HouseContext = createContext('');

const HouseProvider = ({children}) =>{
    const { user } = useAuth();

    const toast = useToast();
//state to store all properties
    const [houses, setHouses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [country, setCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [price, setPrice] = useState('');
    const [property, setProperty] = useState('');
    const [properties, setProperties] = useState([]);
    const [listingType,setListingType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [minBedRooms, setMinBedRooms] = useState('');
    const [maxBedRooms, setMaxBedRooms] = useState('');
    const [minBathRooms, setMinBathRooms] = useState('');
    const [maxBathRooms, setMaxBathRooms] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);



//Function to fetch all properties from backend
    const fetchProperties = async () => {
        

        setIsLoading(true);
        let query = `?page=0&size=9`;


// Append query parameters if they exist
if (minPrice) query += `&minPrice=${minPrice}`;
if (maxPrice) query += `&maxPrice=${maxPrice}`;
if (listingType) query += `&listingType=${listingType}`;
if (minBedRooms) query += `&minBedRooms=${minBedRooms}`;
if (maxBedRooms) query += `&maxBedRooms=${maxBedRooms}`;
if (minBathRooms) query += `&minBathRooms=${minBathRooms}`;
if (maxBathRooms) query += `&maxBathRooms=${maxBathRooms}`;
if (propertyType) query += `&propertyType=${propertyType}`;
if (city) query += `&city=${city}`;
if (state) query += `&state=${state}`;
if(page) query += `&page=${page}`;
if(size) query += `&size=${size}`;



        try {
            const response = await axios.get(`http://localhost:8080/api/v1/properties${query}`)
            setHouses(response.data.content);
            console.log(response.data.content);



            const allCountries = houses.map(house=>{
                console.log('counrtry',house.address.country);
                return house.address.country;
                
            });

            const uniqueCountries = [...new Set(allCountries)];
            setCountries(uniqueCountries);
    
            //console.log('unique countries', uniqueCountries);


            
            
        }catch (error) {
            console.error('Error fetching properties:', error);
            // Handle error, e.g., show a notification using a toast
            toast({
                title: 'Error fetching properties',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            
          // setHouses([]);
            
        }finally {
            setIsLoading(false);
        }
       
    };

    useEffect(() => {
        fetchProperties();
    }, [minPrice, maxPrice, listingType, minBedRooms, maxBedRooms, minBathRooms, maxBathRooms, propertyType, city, state, page, size]);

    //fetch all property types
    // useEffect(() => {
    //     const allCountries = houses.map(house => house.address.country);
    //     const uniqueCountries = [...new Set(allCountries)];
    //     setCountries(uniqueCountries);
      
    //     const allPropertyTypes = houses.map(house => house.propertyType);
    //     const uniquePropertyTypes = [...new Set(allPropertyTypes)];
    //     setProperties(uniquePropertyTypes);
    //   }, [houses]); // This effect depends on 'houses' and will run after 'houses' is updated.
      







    
   
    
  

        //Clear Filters
        const clearFilters = () => {
            setCountry('');
            setPrice('');
            setProperty('');
            setListingType('');
            setMinBathRooms('');
            setMaxBathRooms('');
            setMinBedRooms('');
            setMaxBedRooms('');
            setMinPrice('');
            setMaxPrice('');
            setPropertyType('');
            setCity('');
            setState('');
            setPage(0);
            setSize(9);

        
                fetchProperties();
          
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

// Revised search handler no longer needed. just keeping it here for reference
//   const searchHandler = () => {
//     setIsLoading(true);

//     // Checking selection
//     const isDefault = (str) => str === '' || str.includes('Select');
//     const priceRange = price.split('-').map(s => parseInt(s.trim()));
//     const minPrice = priceRange[0] || 0;
//     const maxPrice = priceRange[1] || Infinity;

//     const filteredHouses = houses.filter(house => {
//       const housePrice = parseInt(house.price);
//       const matchesCountry = isDefault(country) || house.address.country === country;
//       const matchesPrice = housePrice >= minPrice && housePrice <= maxPrice;
//       const matchesPropertyType = isDefault(property) || house.propertyType === property;
//       const matchesListingType = isDefault(listingType) || house.listingType === listingType;

//       return matchesCountry && matchesPrice && matchesPropertyType && matchesListingType;
//     });

//     // Ensure filteredHouses is used to update the UI
//     setTimeout(() => {
//       setHouses(filteredHouses);
//       setIsLoading(false);
//     }, 500); // Short delay to simulate asynchronous data fetching
//   };
  




    return(
        <HouseContext.Provider value={{
            houses,
            isLoading,
            fetchProperties,
            setMinPrice,
            setMaxPrice,
            setMinBathRooms,
            setMaxBathRooms,
            setMinBedRooms,
            setMaxBedRooms,
            setPropertyType,
            setCity,
            setState,
            setPage,
            setSize,
            country,
            setCountry,
            countries,
            price,
            setPrice,
            property,
            propertyType,
            setProperty,
            properties,
           
         
            clearFilters,
            listingType,
            setListingType
        }}>
            {children}
        </HouseContext.Provider>
    )
}

export default HouseProvider;