
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import axios from "axios";
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5'
export default function PropertyOffers(){
    const navigate=useNavigate();
    const [offerList, setOffer] = useState([]);
    const[deletMsg,setDeleteMsg]=useState(null);
    const token = sessionStorage.getItem('token');
    useEffect(()=>{

        $('#tbloffers').DataTable();
        getAllProperiesOffers();

     },[]);

    
     const getAllProperiesOffers = async () => {
      try {
         const response = await axios.get(`http://localhost:8080/api/v1/properties/offers-by-owner`, {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         });
         const propertyData = response.data;
         setOffer(propertyData);
       } catch (error) {
         throw error;
       }
    };

   
   
    const   goToPropertyUpdateOffer=(oId)=>{
         const selectedOffer= offerList.find((offer)=>offer.id===oId);
         setOffer(selectedOffer)
         navigate('/update-offer',{ state: { offer: selectedOffer } });

       


      }

   
    

    return (
      
    <div className="container"> 

            <h2 style={{ textAlign: 'center', fontSize:'25px' }}>List of offers</h2><hr />
        
            <div class="table-responsive">
            <table className="table" id="tbloffers">
            
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">PropertyName</th>
                <th scope="col">Address</th>
                <th scope="col">Customer Firstname</th>
                <th scope="col">Customer Lastname</th>
                <th scope="col">Offer type</th>
                <th scope="col">Amount</th>
                <th scope="col">OrderDate</th>
                <th scope="col">Status</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                offerList.map(
                row=>(
                    <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.property.name}</td>
                    <td>{row.property.address.line1}</td>
                    <td>{row.customer.user.firstname}</td>
                    <td>{row.customer.user.lastname}</td>
                    <td>{row.offerType}</td>
                    <td>{row.offerAmount}</td>
                    <td>{row.offerDate}</td>
                    <td>{row.offerStatus}</td>
                   
                    <td><button type="button" className="btn btn-warning btn-flat"onClick={()=>goToPropertyUpdateOffer(row.id)} >Update status</button></td>         
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