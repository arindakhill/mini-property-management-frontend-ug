import { useCallback, useRef,useState } from "react";

export default function AddProperty(){
    const propertyFormRef=useRef();
    const[saveMsg,setSaveMsg]=useState('');
    const [image, setImagePreview] = useState(null);
    const inputRef= useRef();
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
    
       /* savePropertyToDbApi(values)
        .then(() => setSaveMsg('Record successfully updated')
     
          )
       .catch(() => setSaveMsg('Record fail to update'));*/
    };
    
    
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file && e.target.files.length>0) {
            
             setImagePreview(e.target.files[0]);
            
          }
         
        }
  
        const handleImageClick=()=>{
          
            inputRef.current.click();
        }
    
        const saveImageToFolder = (event) => {
          fs.writeFile(`../Owners/images/${files.target.files[0].name}.png`, files.target.files[0], function (err) {
          if (err) throw err;
    
            }); 
         }
      
    return (
      
      <div>

        <div className="container">

          <form ref={propertyFormRef} onSubmit={updateProperty}>
            <div className="card card mx-auto">
            {saveMsg && <div className="alert alert-warning">{saveMsg}</div>}
            <div className="card-body">
               <h1>Register New Property</h1>
                <div className="row">
                    <div className="form-group  col-sm-6 mb-3">
                    <label>List type:</label>
                            <select class="form-control" name="type">
                                <option>For rent</option>
                                <option>For Sale</option>
                            </select>
                    </div>

                    <div className="form-group col-sm-6">
                    <label>Property type:</label>
                            <select className="form-control" name="category">
                                <option>Apartment</option>
                                <option>Condominium</option>
                            </select>
                    </div>
                </div>
                
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label>Country</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name="Country" />
                    </div>
                    
                        <div className="form-group col-sm-6">
                        <label>Address </label>
                        <input type="text" className="form-control col-sm-6 mb-3" name="address" />
                    </div>
              </div>

              <div className="row ">

                <div className="form-group col-sm-6">
                    <label>State:</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="state" />
                </div>

                <div className="form-group col-sm-6">
                    <label>City:</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="city" />
                </div>

              </div>

              <div className="row">
          
                <div className="form-group col-sm-6">
                    <label>Postal code</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="postalcode" />
                </div>

                <div className="form-group col-sm-6">
                    <label>Amount</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name="amount" />
                </div>
              </div>

              <div className="row">

              <div className="form-group col-sm-6">
                    <label>Number of Bath rooms</label>
                    <input type="text" className="form-control  mb-3" name="noofbathrooms" />
                </div>

                <div className="form-group col-sm-6">
                    <label>Number of Bed rooms</label>
                    <input type="text" className="form-control mb-3" name="nofobedrooms" />
                </div>

              </div>


              <div className="row">
             
                <div className="form-group col-sm-6">
                    <label>Year</label>
                    <input type="text" className="form-control  mb-3" name="year" />
                </div>
                <div class="form-group col-sm-6" >
                    <label for="fileInput">Choose file:</label>
                    <input type="file" class="form-control-file" id="fileInput" onChange={handleImageChange} ref={inputRef}/>
                </div>
              </div>

              <div className="row">
            
                <div className="form-group col-sm-6 mb-3">
                <label>Description</label>
                <textarea class="form-control" id="description"  name="description"  rows="3"></textarea>
              </div>

              <div  className="form-group col-sm-6 mb-3"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <label>Image uploads here</label>
                {image? <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: 'auto%',height:'100px'  }} />:<img src="../Owners/images/file-upload.jpg"/>}
                    
              </div>

             </div>

        
            <div className="form-group d-flex">
            <div className='me-2'>
                <button type="submit" className="btn btn-success btn-flat" onClick={saveImageToFolder} >Add Property </button>
            </div>
            </div>
            </div>
        </div>
        </form>
        </div>
      </div>
      )
   }