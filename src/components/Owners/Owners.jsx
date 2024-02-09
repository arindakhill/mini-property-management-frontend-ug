import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import $ from 'jquery'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5'
import axios from "axios";
export default function Owners(){
   const token = sessionStorage.getItem('token');
    const navigate=useNavigate();
    const[ownerList,setownerList]= useState([]);
    const[deletMsg,setDeleteMsg]=useState(null);
    
   
     useEffect(()=>{
        getAllOwners();
        const dataTable = $('#tblowners').DataTable();  
       
     },[]);
     const getAllOwners = () => {
      
      return axios.get('http://localhost:8080/api/v1/owners/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          const ownerData = response.data;
          setownerList(ownerData);
          console.log(ownerData);
          
        })
        .catch(error => {
          throw error;
        });
      };
   
      
      /*function showAllOwners(){
              getAllOwnersApi()
            .then(
              response=>{
                setownerArrist(response.data)
              }
              )
              .catch(error=>console.log(error))
      
        }
      
          function deleteUser(id){
      
          deleteUserApi(id)
                 .then(()=>{
                  setDeleteMsg(`Record with id ${id} sucessfully deleted`);
                  showAllUsers(); 
                          }
                      )
          }
            
      
            function updateUser(id){
      
              navigate(`/updateactivity/${id}`);
            }
      
            function addNewUser(){
      
              navigate('/newuser');
      
            }*/
            const showOwnerDetails= (oid)=>{

              const selectedOwner = ownerList.find(owner => owner.id === oid);
              setownerList(oid);
               
              navigate(`/owner-detail/${oid}`,{ state: { owner: selectedOwner } });
            
          
            };
            const approveOwnerByAdmin = (propertyId, offerId) => {

              

                  return axios
                    .put(
                      `http://localhost:8080/api/v1/properties/${propertyId}/offers/${offerId}/reject`,
                      {},
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    )
                    .then((response) => {
                      setOfferAcceptMsg("Offer successfully rejected");
                    })
                    .catch((error) => {
                      throw error;
                    });
                  
              };
          
          
    

    return (
      
        <div className="container"> 

       <h1 style={{ textAlign: 'center', fontSize:'25px' }}>List of  owners</h1><hr />
        {deletMsg && <div className="alert alert-warning">{deletMsg}</div>}
      <div className="table-responsive">
       <table className="table" id="tblowners">
     
       <thead>
         <tr>
           <th scope="col">ID</th>
           <th scope="col">Firstname</th>
           <th scope="col">Lastname</th>
           <th scope="col">Email</th>
           <th scope="col">Status</th>
           <th scope="col"></th>
           <th scope="col"></th>
           <th scope="col"></th>
         </tr>
       </thead>
       <tbody>
         {
         ownerList.map(
           row=>(
             <tr key={row.id}>
               <td>{row.id}</td>
               <td>{row.user.firstname}</td>
               <td>{row.user.lastname}</td>
               <td>{row.user.email}</td>
               <td>{row.enabled}</td>
               <td><button type="button" className="btn btn-success btn-flat" >Approve</button></td>
               <td><button type="button" className="btn btn-warning">Deactivate</button></td>
               <td><button type="button" className="btn btn-warning" onClick={()=>showOwnerDetails(row.id)}>Details</button></td>
               
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