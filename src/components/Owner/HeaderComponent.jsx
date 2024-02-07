

import { Link } from "react-router-dom";

export default function HeaderComponent(){


    return (
      
      <header className="header"> 
         <div className="container">
          
         <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{backgroundColor: "black"}}>
          <Link className="navbar-brand" to="/mainpage">Owner Dashboard</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active"> 
                 <Link className="nav-link" to="/new-owner">New owner</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/owners">Owner List</Link> 
              </li>
            </ul>
        </div>
        
       
       
  
        </nav>
        </div>    
      </header>
      )
   }