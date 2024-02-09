import { useLocation, useNavigate } from "react-router-dom";

export default function PropertyDetail(){
  const { state } = useLocation();
  const prop = state?.prop;
  const token = sessionStorage.getItem('token');
  const navigate= useNavigate();


  console.log(prop);
  function backToList(){

    navigate('/properties');
  }
    return (
      
      <div>

        <div className="container col-sm-7">

          <form>
            <div className="card card mx-auto mb-3">

            <div className="card-body">
            <h1 className="mx-auto" style={{ textAlign:'center' }} >Proprty Details page</h1><hr/>
              <div style={{  fontSize:'15px',marginLeft: '250px' }}>

                    <p><strong>ID:</strong> {prop.id}</p>
                    <p><strong>Name:</strong> {prop.name}</p>
                    <p><strong>Description:</strong> {prop.description}</p>
                    <p><strong>Price:</strong> {prop.price}</p>
                    <p><strong>Staus:</strong> {prop.status}</p>
                    <p><strong>Listing type:</strong> {prop.listingType}</p>
                    <p><strong>Property type:</strong> {prop.state}</p>
                    <p><strong>Number of bathroms:</strong> {prop.bathRooms}</p>
                    <p><strong>Number of bedrooms:</strong> {prop.bedRooms}</p>
                    <p><strong>Address line1:</strong> {prop.address.line1}</p>
                    <p><strong>Address line2:</strong> {prop.address.line2}</p>
                    <p><strong>City:</strong> {prop.address.city}</p>
                    <p><strong>Postal code:</strong> {prop.address.postalCode}</p>
                    <p><strong>State:</strong> {prop.address.state}</p>
                    <p><strong>Country:</strong> {prop.address.country}</p>
                </div>
            <div className="form-group d-flex" >
            <div className='me-2' >
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