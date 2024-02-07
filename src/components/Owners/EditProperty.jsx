
import { useRef,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
export default function UpdateProperty(){
    const { state } = useLocation();
    const prop = state?.prop;
    const navigate= useNavigate();
    const propertyFormRef=useRef();
    const[updateMsg,setUpdateMsg]=useState('');
    const updateProperty = (event) => {
        event.preventDfault();
  
        const type = propertyFormRef.current.type.value;
        const category = propertyFormRef.current.category.value;
        const country = propertyFormRef.current.country.value;
        const address = propertyFormRef.current.address.value;
        const state = propertyFormRef.current.state.value;
        const city = propertyFormRef.current.content.value;
        const pcode = propertyFormRef.current.postalcode.value;
        const amount = propertyFormRef.current.amount.value;
        const noofbedrooms = propertyFormRef.current.nofobedrooms.value;
        const noofbathrooms = propertyFormRef.current.noofbathrooms.value;
        const year = propertyFormRef.current.year.value;
        const description = propertyFormRef.current.description.value;
        const values = {type, category, country,address, state,city,pcode,amount,noofbedrooms,noofbathrooms,year,description};
    
       /* updatePropertyApi(values,id)
        .then(() => setUpdateMsg('Record successfully saved')
     
          )
       .catch(() => setUpdateMsg('Record fail to save'));*/
    };

    return(
     <div>
        <form ref={propertyFormRef} onSubmit={updateProperty}>
            <div className="card card mx-auto">
            {updateMsg && <div className="alert alert-warning">{updateMsg}</div>}
            <div className="card-body">
               <h1>New Property</h1>
               <div className="row">
            
                <div className="form-group col-sm-12 mb-3">
                <label>Id</label>
                <input type="text" className="form-control col-sm-6 mb-3" name="id" value={prop.id} />
              </div>

             </div>
                <div className="row">
                    <div className="form-group  col-sm-6 mb-3">
                    <label>Category:</label>
                            <select class="form-control" name="type">
                                <option>For rent</option>
                                <option>For Sale</option>
                            </select>
                    </div>

                    <div className="form-group col-sm-6">
                    <label>Type:</label>
                            <select className="form-control" name="category">
                                <option>Apartment</option>
                                <option>Condominium</option>
                            </select>
                    </div>
                </div>
                
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label>Country</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name="Country" value={prop.country} />
                    </div>
                    
                        <div className="form-group col-sm-6">
                        <label>Address </label>
                        <input type="text" className="form-control col-sm-6 mb-3" name="address" value={prop.address} />
                    </div>
              </div>

              <div className="row ">

                <div className="form-group col-sm-6">
                    <label>State:</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="state" value={prop.state}/>
                </div>

                <div className="form-group col-sm-6">
                    <label>City:</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="city"  value={prop.city}/>
                </div>

              </div>

              <div className="row">
          
                <div className="form-group col-sm-6">
                    <label>Postal code</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="postalcode"  value={prop.postalcode}/>
                </div>

                <div className="form-group col-sm-6">
                    <label>Amount</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="amount" value={prop.amount} />
                </div>
              </div>

              <div className="row">

              <div className="form-group col-sm-6">
                    <label>Number of Bath rooms</label>
                    <input type="text" className="form-control  mb-3" name="noofbathrooms"  value={prop.bathroomsNumber}/>
                </div>

                <div className="form-group col-sm-6">
                    <label>Number of Bed rooms</label>
                    <input type="text" className="form-control mb-3" name="nofobedrooms" value={prop.BedroomsNumber} />
                </div>

              </div>


              <div className="row">
             
                <div className="form-group col-sm-6">
                    <label>Year</label>
                    <input type="text" className="form-control  mb-3" name="year" />
                </div>
                <div class="form-group col-sm-6">
                    <label for="fileInput">Choose file:</label>
                    <input type="file" class="form-control-file" id="fileInput"/>
                </div>
              </div>

              <div className="row">
            
                <div className="form-group col-sm-12 mb-3">
                <label>Description</label>
                <textarea class="form-control" id="description"  name="description"  rows="3" value={prop.description}></textarea>
              </div>

             </div>

        
            <div className="form-group d-flex">
            <div className='me-2'>
                <button type="submit" className="btn btn-success btn-flat" >Update Property </button>
            </div>
            </div>
            </div>
        </div>
        </form>
        </div>


    )
}