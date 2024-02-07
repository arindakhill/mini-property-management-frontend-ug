import { useLocation, useNavigate } from "react-router-dom";

export default function PropertyDetail(){
  const { state } = useLocation();
  const prop = state?.prop;
  const navigate= useNavigate();

  function backToList(){

    navigate('/properties');
  }
    return (
      
      <div>

        <div className="container col-sm-7">

          <form>
            <div className="card card mx-auto mb-3">
            <div className="card-body">
               <h1 className="mx-auto">Proprty Details page</h1><hr/>

                    <p><strong>ID:</strong> {prop.id}</p>
                    <p><strong>Category:</strong> {prop.category}</p>
                    <p><strong>Type:</strong> {prop.type}</p>
                    <p><strong>Country:</strong> {prop.country}</p>
                    <p><strong>Address Line 1:</strong> {prop.address}</p>
                    <p><strong>State:</strong> {prop.state}</p>
                    <p><strong>City:</strong> {prop.city}</p>
                    <p><strong>Postal Code:</strong> {prop.postalCode}</p>
                    <p><strong>Amount:</strong> {prop.amount}</p>
                    <p><strong>Description:</strong> {prop.description}</p>
                    <p><strong>Bathrooms Number:</strong> {prop.bathroomsNumber}</p>
                    <p><strong>Bedrooms Number:</strong> {prop.bedroomsNumber}</p>

                
            <div className="form-group d-flex">
            <div className='me-2'>
                <button type="submit" className="btn btn-success btn-flat" onClick={backToList} >  Back to list </button>
            </div>
            </div>
            </div>
        </div>
        </form>
        </div>
      </div>
      )
   }