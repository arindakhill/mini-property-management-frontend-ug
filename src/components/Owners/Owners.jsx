import { useState } from "react";


export default function Owners(){
  const newArrPosts=[];
 // const[]
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
          password: "SecureP@ss!",
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

     /* useEffect(
        ()=>showAllUsers(),[]
      )
      
        function showAllUsers(){
              getAllOwnersApi()
            .then(
              response=>{
                setActivity(response.data)
                console.log("data-->"+response.data)
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
            const showOwnerDetails= (postId)=>{

              const selectedPost = arrPost.find(post => post.id === postId);
              setProductId(postId);
               
              navigate(`/post-detail/${postId}`,{ state: { post: selectedPost } });
              
            };
         
    

    return (
      
        <div className="container"> 

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New message</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Recipient:</label>
                    
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Message:</label>
                        <textarea class="form-control" id="message-text"></textarea>
                    </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Send message</button>
                </div>
                </div>
            </div>
            </div>

        <h3>List owners</h3><hr />
        {deletMsg && <div className="alert alert-warning">{deletMsg}</div>}
       <table className="table">
     
       <thead>
         <tr>
           <th scope="col">ID</th>
           <th scope="col">First name</th>
           <th scope="col">Last name</th>
           <th scope="col">Email</th>
           <th scope="col">Username</th>
           <th scope="col">Status</th>
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
               <td><button type="button" className="btn btn-warning">Update</button></td>
               <td><button type="button" className="btn btn-danger" data-toggle="modal" data-target="#exampleModal">Delete</button></td>
               
             </tr>
           )
          )
       }
       </tbody>
     </table>          
    </div>

     
      


      )
   }