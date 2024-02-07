import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function UpdateOffer(){

    const { state } = useLocation();
    //const offer = state?.offer;
    const navigate= useNavigate();
  
    function backToList(){
  
      navigate('/offers');
    }
      return (
        
        <div className="container mb-3">
  
          <div className="container col-sm-5">
  
            <form>
              <div className="card card mx-auto mb-3">
              <div className="card-body">
                 <h1 className="mb-3">Update offer page </h1><hr/>
                

                 <div class="d-grid gap-2">
                  <button class="btn btn-success" type="button">Accept offer</button>
                  <button class="btn btn-danger" type="button">Cancel contigent</button>
              </div>
              
              
            </div>
          </div>
          </form>
          </div>
        </div>
        )


}