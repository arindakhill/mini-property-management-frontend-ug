
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import $ from 'jquery'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5'
export default function PropertyOffers(){
    const navigate=useNavigate();
    const [selectedProperty, setSelectedProperty] = useState([]);
    const[deletMsg,setDeleteMsg]=useState(null);
    const propertyPayment = [
        {
            id: 1,
            propertyName: 'Cozy Apartment',
            address: '123 Main St, New York City, USA',
            ownerFirstName: 'John',
            ownerLastName: 'Doe',
            amount: '$1500',
            orderDate: '2024-02-06',
            status: 'available',
            category:'rent'
        },
        {
            id: 2,
            propertyName: 'Luxury Condo',
            address: '456 Maple Ave, Toronto, Canada',
            ownerFirstName: 'Jane',
            ownerLastName: 'Smith',
            amount: '$300000',
            orderDate: '2024-02-05',
            status: 'pending',
            category:'sale'
        },
        {
            id: 3,
            propertyName: 'Charming House',
            address: '789 Elm St, London, UK',
            ownerFirstName: 'James',
            ownerLastName: 'Brown',
            amount: '£2000',
            orderDate: '2024-02-04',
            status: 'contigent',
            category:'rent'
        },
        {
            id: 4,
            propertyName: 'Modern Townhouse',
            address: '567 Oak St, Los Angeles, USA',
            ownerFirstName: 'Jessica',
            ownerLastName: 'Johnson',
            amount: '$500000',
            orderDate: '2024-02-03',
            status: 'available',
            category:'sale'
        }
        
    ];

      useEffect(()=>{

         $('#tbloffers').DataTable();

      });

   
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
                propertyPayment.map(
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