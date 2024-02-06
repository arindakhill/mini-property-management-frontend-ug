export default function UpdateDeleteOwner(){

    return (
      
      <div>

        <div className="container">

          <form>
            <div className="card card mx-auto">
            <div className="card-body">
               <h1>owner Details page</h1>

                <div className="form-group">
                <label>First Name:</label>
                    <input type="text" className="form-control col-sm-6" name="firstname"/>
                </div>
                <div className="form-group">
                <label>Last name:</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="lastname" />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="email" />
              </div>
              <div className="form-group">
                <label>Username:</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="username" />
              </div>
          
              <div className="form-group">
                <label>Password:</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="password" />
              </div>
              <div className="form-group">
                <label>Comfirm Password:</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="pcomfrimPaaaword" />
              </div>
        
        
            <div className="form-group d-flex">
            <div className='me-2'>
                <button type="submit" className="btn btn-success btn-flat" >Update </button>
            </div>
            </div>
            </div>
        </div>
        </form>
        </div>
      </div>
      )
   }