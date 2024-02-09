import React from "react";
import { useAuth } from "../../context/AuthContext";

import { Link } from "react-router-dom";

export default function HeaderComponent(){
  const {user} = useAuth();
  const isUserAdmin = user && user.role === "ADMIN";


    return (
      
      <header className="header"> 
         <div className="container">
          
         <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "black"}}>
          <Link className="navbar-brand" to="/mainpage">Dashboard</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
             

{isUserAdmin && (
              <li className="nav-item">
                <Link className="nav-link" to="/owners">Owners</Link> 
              </li>
)}
{isUserAdmin && (
              <li className="nav-item">
              <Link className="nav-link" to="/view-all-customers">Customers</Link> 
            </li>
)
}


              <li className="nav-item">
                <Link className="nav-link" to="/add-property">Add property</Link> 
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/properties">Properties</Link> 
              </li>
              <li className="nav-item active"> 
                 <Link className="nav-link" to="/offers">Offers</Link>
              </li>

            </ul>
  
        </div>
        
       
        </nav>
        </div>    
      </header>
      )
   }