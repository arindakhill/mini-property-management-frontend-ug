import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import {useState } from "react";
export default function UpdateOffer(){
  const token = sessionStorage.getItem('token');
    const { state } = useLocation();
    const offer = state?.offer;
    const navigate= useNavigate();
    const[offerAcceptMsg, setOfferAcceptMsg]=useState();

    
  
    const acceptOffer = (propertyId, offerId) => {

      if(offer.offerStatus==="ACCEPTED"){
        setOfferAcceptMsg("Offer alreday accepted");
        
      }
     else{
            return axios
              .put(
                `http://localhost:8080/api/v1/properties/${propertyId}/offers/${offerId}/accept`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then((response) => {
                setOfferAcceptMsg("Offer successfully accepted");
              })
              .catch((error) => {
                throw error;
              });
        }
    };

    const rejectOffer = (propertyId, offerId) => {

    if(offer.offerStatus==="REJECTED"){
        setOfferAcceptMsg("Offer has already been  rejected");
        
    }
     else{
    
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
        }
    };


    const canCancelContigency = async (propertyId, offerId) => {
      try {
         const response = await axios.get(`http://localhost:8080/api/v1/properties/${propertyId}/offers/${offerId}/can-cancel-contingent`, {
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


    const cancelContigency = (propertyId, offerId) => {




      if(canCancelContigency(offer.id,offer.property.id)== false){
        setOfferAcceptMsg("You can`t  cancel an offer not in  contigent status");
        
    }
     else{
        return axios
          .put(
            `http://localhost:8080/api/v1/properties/${propertyId}/offers/${offerId}/cancel-contingent`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            setOfferAcceptMsg("Contigency successfully cancelled");
          })
          .catch((error) => {
            throw error;
          });

        }
    };


   

      return (
        
        <div className="container mb-3">
  
          <div className="container col-sm-5">
          {offerAcceptMsg && <div className="alert alert-success">{offerAcceptMsg}</div>}
            <form>
              <div className="card card mx-auto mb-3">
              <div className="card-body">
                 <h1 className="mb-3" style={{ textAlign: 'center', fontSize:'20px'  }}>OFFRER NUMBER :{offer.id} </h1><hr/>
                    
                 <div class="d-grid gap-2">
                  <button class="btn btn-success" type="button" onClick={()=>{acceptOffer(offer.property.id,offer.id)}}>Accept offer</button>
                  <button class="btn btn-warning" type="button" onClick={()=>{rejectOffer(offer.property.id,offer.id)}}>Reject offer</button>
                  <button class="btn btn-danger" type="button" onClick={()=>{cancelContigency(offer.property.id,offer.id)}}>Cancel contigent</button>
                  <p><Link to="/offers"style={{ textAlign: 'right',color: 'blue'  }}>Back to List</Link></p>
              </div>
              
              
            </div>
          </div>
          </form>
          </div>
        </div>
        )


}