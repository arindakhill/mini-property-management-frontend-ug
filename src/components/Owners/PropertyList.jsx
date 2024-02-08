import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5'
import { getPropertiesApi } from "../../Api/Api";
export default function PropertyList(){
    
    const navigate=useNavigate();
    const [selectedProperty, setSelectedProperty] = useState([]);
    const [propertyList, setpropertyList] = useState([]);
    const[deletMsg,setDeleteMsg]=useState(null);
    const properties = [
        {

            id:1,
            category: 'For rent',
            type: 'Apartment',
            country: 'USA',
            sddress: '123 Main St',
            state: 'New York',
            city: 'New York City',
            PostalCode: '10001',
            amount: '$1500',
            description: 'Cozy apartment with great view',
            bathroomsNumber: 2,
            bedroomsNumber: 1,
            ownerId:1
        },
        {
            id:2,
            category: 'For Sale',
            type: 'Condominium',
            country: 'Canada',
            cddress: '456 Maple Ave',
            state: 'Ontario',
            city: 'Toronto',
            costalCode: 'M5V 3M3',
            amount: '$300000',
            description: 'Spacious condo with modern amenities',
            bathroomsNumber: 1,
            dedroomsNumber: 2,
            ownerId:2
        },
        {
            id:3,
            category: 'For rent',
            type: 'House',
            country: 'UK',
            address: '789 Elm St',
            state: 'London',
            postalCode: 'SW1A 1AA',
            amount: '£2000',
            description: 'Charming house in central London',
            bathroomsNumber: 3,
            bedroomsNumber: 4,
            ownerId:2
        },
       
    ];
      useEffect(()=>{
        const dataTable = $('#tblProperties').DataTable(); 
        getAllProperties(); 
      } );
   
      const getAllProperties=()=>{
        getPropertiesApi().then(response=>{
            propertyList(response.data);  
        })
        
        .catch(error=>console.log(error))
    }
  
       const   goToPropertyDetailPage=(propId)=>{
        const selectedProp= properties.find((prop)=>prop.id===propId);
         setSelectedProperty(selectedProp)
         navigate('/property-detail',{ state: { prop: selectedProp } });

      }
   
      const   goToPropertyEditPage=(propId)=>{
        const selectedProp= properties.find((prop)=>prop.id===propId);
        setSelectedProperty(selectedProp)
         navigate('/update-property',{ state: { prop: selectedProp } });

      }
   

         
    

    return (
      
    <div className="container"> 

            <h3 style={{ textAlign: 'center', fontSize:'25px' }} >List of  Properties</h3><hr />
        
            <div class="table-responsive ">
            <table className="table" id="tblProperties">
            
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Owner Firstname</th>
                <th scope="col">Owner Lastname</th>
                <th scope="col">ListingType</th>
                <th scope="col">PropertyType</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                propertyList.map(
                row=>(
                    <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.firstname}</td>
                    <td>{row.lastname}</td>
                    <td>{row.listing_type}</td>
                    <td>{row.property_type}</td>
                    <td><button type="button" className="btn btn-success btn-flat"onClick={()=>goToPropertyDetailPage(row.id)} >Details</button></td>   
                    <td><button type="button" className="btn btn-warning btn-flat"onClick={()=>goToPropertyEditPage(row.id)} >Update</button></td>         
                    </tr>
                )
                )
            }
       </tbody>
     </table>          
    </div>
    </div>
     
      


      )
   }