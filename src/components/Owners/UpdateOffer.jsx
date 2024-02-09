import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

export default function UpdateOffer(){
  const token = sessionStorage.getItem('token');
    const { state } = useLocation();
    const offer = state?.offer;
    const navigate= useNavigate();


    const acceptOffer = (propertyId,offerId) => {
      return axios.put(`http://localhost:8080/api/v1/properties/${propertyId}/offers/${offerId}/accept`, {
       // localhost:8080/api/v1/properties/2/offers/3/accept
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
    
        setOfferAcceptMsg("Offer successfully  accepted");
      })
      .catch(error => {
        throw error;
      });
    };

    function backToList(){
  
      navigate('/offers');

    }
      return (
        
        <div className="container mb-3">
  
          <div className="container col-sm-5">
  
            <form>
              <div className="card card mx-auto mb-3">
              <div className="card-body">
                 <h1 className="mb-3" style={{ textAlign: 'center', fontSize:'20px'  }}>OFFRER NUMBER :{offer.id} </h1><hr/>
                    
                 <div class="d-grid gap-2">
                  <button class="btn btn-success" type="button" onClick={()=>{acceptOffer(offer.property.id,offer.id)}}>Accept offer</button>
                  <button class="btn btn-warning" type="button">Reject offer</button>
                  <button class="btn btn-danger" type="button">Cancel contigent</button>
                  <p><Link to="/offers"style={{ textAlign: 'right',color: 'blue'  }}>Back to List</Link></p>
              </div>
              
              
            </div>
          </div>
          </form>
          </div>
        </div>
        )


}