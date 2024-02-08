import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import $ from 'jquery'
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5'
export default function Owners(){

    const navigate=useNavigate();
    const[ownerArrist,setownerArrist]= useState([]);
    const[deletMsg,setDeleteMsg]=useState(null);
    const ownersList = [
        {
          id:"1",
          firstName: "John",
          lastName: "Smith",
          email: "john.smith@email.com",
          username: "johnsmith123",
          status: "active"
        },
        {
          id:"2",
          firstName: "Emily",
          lastName: "Johnson",
          email: "emily.j@email.com",
          username: "emily.johnson",
          status: "pending"
        },
        {
          id:"3",
          firstName: "Michael",
          lastName: "Davis",
          email: "michael.davis@email.com",
          username: "mikedavis45",
          status: "pending"
        },
        {
          id:"4",
          firstName: "Sarah",
          lastName: "Brown",
          email: "sarah.brown@email.com",
          username: "sarahb",
          status: "active"
        },
        {
          id:"5",
          firstName: "Kevin",
          lastName: "Miller",
          email: "kevin.m@email.com",
          username: "kevinm123",
          status: "active"
        }
      ];

     useEffect(()=>{
        ()=>showAllOwners(),[]
        const dataTable = $('#tblowners').DataTable();  
     });
      
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

              const selectedOwner = ownersList.find(owner => owner.id === oid);
              setownerArrist(oid);
               
              navigate(`/owner-detail/${oid}`,{ state: { owner: selectedOwner } });
            
          
            };
         
    

    return (
      
        <div className="container"> 

       <h1 style={{ textAlign: 'center', fontSize:'25px' }}>List of  owners</h1><hr />
        {deletMsg && <div className="alert alert-warning">{deletMsg}</div>}
      <div class="table-responsive">
       <table className="table" id="tblowners">
     
       <thead>
         <tr>
           <th scope="col">ID</th>
           <th scope="col">Firstname</th>
           <th scope="col">Lastname</th>
           <th scope="col">Email</th>
           <th scope="col">Username</th>
           <th scope="col">Status</th>
           <th scope="col"></th>
           <th scope="col"></th>
           <th scope="col"></th>
         </tr>
       </thead>
       <tbody>
         {
         ownersList.map(
           row=>(
             <tr key={row.id}>
               <td>{row.id}</td>
               <td>{row.firstName}</td>
               <td>{row.lastName}</td>
               <td>{row.email}</td>
               <td>{row.username}</td>
               <td>{row.status}</td>
               <td><button type="button" className="btn btn-success btn-flat" >Activate</button></td>
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