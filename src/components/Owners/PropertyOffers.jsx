
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

    
     const getAllProperiesOffers = () => {
      return axios.get(`http://localhost:8080/api/v1/properties/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const propertyData = response.data;
        setpropertyList(propertyData);
      })
      .catch(error => {
        throw error;
      });
    };

   
   
    const   goToPropertyUpdateOffer=(oId)=>{
        const selectedOffer= propertyPayment.find((offer)=>offer.id===oId);
         setSelectedProperty(selectedOffer)
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
                <th scope="col">Owner Firstname</th>
                <th scope="col">Owner Lastname</th>
                <th scope="col">Category</th>
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
                    <td>{row.propertyName}</td>
                    <td>{row.address}</td>
                    <td>{row.ownerFirstName}</td>
                    <td>{row.ownerLastName}</td>
                    <td>{row.category}</td>
                    <td>{row.amount}</td>
                    <td>{row.orderDate}</td>
                    <td>{row.status}</td>
                   
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