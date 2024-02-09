import { useLocation, useNavigate } from "react-router-dom";

export default function OwnerDetails(){
  const { state } = useLocation();
  const owner = state?.owner;
  const navigate= useNavigate();

  function backToList(){

    navigate('/owners');
  }
    return (
      
      <div>

        <div className="container">

          <form>
            <div className="card card mx-auto mb-3">
            <div className="card-body">
               <h1>Owner Details page</h1>
               <div className="form-group">
                <label>Owner Id:</label>
                    <input type="text" className="form-control col-sm-6" name="id" value={owner.id} readOnly/>
                </div>
                <div className="form-group">
                <label>First Name:</label>
                    <input type="text" className="form-control col-sm-6" name="firstname" value={owner?.user.firstname} readOnly/>
                </div>
                <div className="form-group">
                <label>Last name:</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="lastname" value={owner.user.lastname}  readOnly/>
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="email"  value={owner.user.email} readOnly/>
              </div>
              <div className="form-group mb-3">
                <label>Status:</label>
                    <input type="text" className="form-control col-sm-6" name="status" value={owner.isenabled} readOnly/>
                </div>
            <div className="form-group d-flex">
            <div className='me-2'>
                <button type="submit" className="btn btn-success btn-flat" onClick={backToList} >  Back to owners page </button>
            </div>
            </div>
            </div>
        </div>
        </form>
        </div>
      </div>
      )
   }