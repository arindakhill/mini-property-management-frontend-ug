import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5'
import { getPropertiesApi } from "../../Api/Api";
import  {jwtDecode} from "jwt-decode";
import axios from "axios";

export default function PropertyList(){
    const token = sessionStorage.getItem('token');
    const navigate=useNavigate();
    
  

    const [selectedProperty, setSelectedProperty] = useState([]);
    const [propertyList, setpropertyList] = useState([]);
    const[deletMsg,setDeleteMsg]=useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
      useEffect(()=>{
        const dataTable = $('#tblProperties').DataTable(); 
       
       getallPropertiesby();
      } ,[],isLoading);

      
    
      const getallPropertiesby = () => {
        return axios.get(`http://localhost:8080/api/v1/properties/owner-properties`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          const propertyData = response.data;
          setpropertyList(propertyData);
          setIsLoading(false);
        })
        .catch(error => {
          throw error;
        });
      };

      if (isLoading) {
        return <div>Loading...</div>;
      }
   
   
  
       const   goToPropertyDetailPage=(propId)=>{
        const selectedProp= propertyList.find((prop)=>prop.id===propId);
         setSelectedProperty(selectedProp)
         navigate('/property-detail',{ state: { prop: selectedProp } });

      }
   
      const   goToPropertyEditPage=(propId)=>{
        const selectedProp= propertyList.find((prop)=>prop.id===propId);
        setSelectedProperty(selectedProp)
         navigate('/update-property',{ state: { prop: selectedProp } });

      }
   

         
    

    return (
      
    <div className="container"> 

            <h3 style={{ textAlign: 'center', fontSize:'25px' }} >List of  Properties</h3><hr />
        
            <div className="table-responsive ">
            <table className="table" id="tblProperties">
            
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Property name</th>
             
        
                <th scope="col">ListingType</th>
                <th scope="col">PropertyType</th>
                <th scope="col"></th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {
                Array.isArray(propertyList) &&propertyList.map(
                row=>(
                    <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
               
                 
                    <td>{row.listingType}</td>
                    <td>{row.propertyType}</td>
                    <td><button type="button" className="btn btn-success btn-flat"onClick={()=>goToPropertyDetailPage(row.id)} >Details...</button></td>   
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