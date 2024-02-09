
import { useRef,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
export default function UpdateProperty(){
    const { state } = useLocation();
    const prop = state?.prop;
    const navigate= useNavigate();
    const inputRef= useRef();
    const propertyFormRef=useRef();
    const[updateMsg,setUpdateMsg]=useState('');
    const [image, setImagePreview] = useState(null);
    const token = sessionStorage.getItem('token');



    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(e.target.files[0])

        if (file && e.target.files.length>0) {
          
           setImagePreview(e.target.files[0]);
          
        }
       
      }

      const handleImageClick=()=>{
        
          inputRef.current.click();
      }

      const updatePropertyInDb = (id) => {
       /* updateProperty();
        axios
        .put(
          `http://localhost:8080/api/v1/properties/update/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setUpdateMsg("Property successfully updated");
        })
        .catch((error) => {
          throw error;
        });*/

        alert(id);
        
        
    };

    const updateProperty = (event) => {
        event.preventDefault();


        const form = propertyFormRef.current;
        const  address1={
         
          line1:form['address1'].value,
          line2:form['address2'].value,
          city :form['city'].value,
          state:form['state'].value,
          postalCode : form['pcode'].value, 
          country:form['country'].value, 
          }
        const data = {
          name:form['name'].value,
          description :form['description'].value,
          price :form['price'].value,
          status:"AVAILABLE",
          listingType:form['type'].value,
          propertyType:form['category'].value,
          bathRooms :form['noofbathrooms'].value, 
          bedRooms :form['noofbedrooms'].value, 
            
          address:address1,
          imageUrl:file.name,
          constructionDate: form['constructionDate'].value,
            
        };
        const formData = new FormData()
        formData.append("file", file)
    

        function show(){
            alert('cliecked');
        }
   
    }

    return(
     <div>
        <form ref={propertyFormRef} >
            <div className="card card mx-auto">
            {updateMsg && <div className="alert alert-warning">{updateMsg}</div>}
            <div className="card-body">
            <h1 style={{ textAlign: 'center', fontSize:'20px' }} className="mb-3">Update  Property page</h1>

            <div className="row">

                <div className="form-group col-sm-4">
                    <label>Property name</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name={"name"} label={"name"}  value={prop.name}/>
                </div>

                <div className="form-group  col-sm-4 mb-3">
                <label>Listing type:</label>
                        <select className="form-control" name={"type"} label ={"type"}>
                            <option>RENT</option>
                            <option>SALE</option>
                        </select>
                </div>

                <div className="form-group col-sm-4">
                <label>Property type:</label>
                        <select className="form-control" name={"category"} label={"category"}>
                            <option>APARTMENT</option>
                            <option>CONDOMINIUM</option>
                        </select>
                </div>  

                </div>
              <div className="row">

                    <div className="form-group col-sm-4">
                          <label>Country</label>
                          <input type="text" className="form-control col-sm-6 mb-3" name={"country"} label={"country"} value={prop.address.country}/>
                      </div>
                    
                      <div className="form-group col-sm-4">
                            <label>Address line 1 </label>
                            <input type="text" className="form-control col-sm-6 mb-3" name={"address1"}  value={prop.address.line1}/>
                        </div>

                      <div className="form-group col-sm-4">
                        <label>Address ine 2:</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"address2"} value={prop.address.line2} />
                    </div>

              </div>

              <div className="row ">

                <div className="form-group col-sm-4">
                            <label>City:</label>
                            <input type="text" className="form-control col-sm-6 mb-3" name={"city"} value={prop.address.city}   />
                        </div>

                    <div className="form-group col-sm-4">
                        <label>State:</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"state"} label={"state"} value={prop.address.state}  />
                    </div>

                    <div className="form-group col-sm-4">
                        <label>Postal code</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"pcode"} value={prop.address.postalCode} />
                    </div>

            </div>

            <div className="row">

                <div className="form-group col-sm-4">
                        <label>Price</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"price"} label={"price"} value={prop.price} />
                    </div>

                    <div className="form-group col-sm-4">
                        <label>Number of Bath rooms</label>
                        <input type="text" className="form-control  mb-3" name={"noofbathrooms"} value={prop.bathRooms}  />
                    </div>

                    <div className="form-group col-sm-4">
                        <label>Number of Bed rooms</label>
                        <input type="text" className="form-control mb-3" name={"noofbedrooms"} value={prop.bedRooms} />
                    </div>

                </div>
                <div className="row">
                  <div className="form-group col-sm-4">
                        <label>Year of construction</label>
                        <input type="date" className="form-control  mb-3" name={"constructionDate"} label={"constructionDate"} />
                    </div>
                  
                  <div className="form-group col-sm-4">
                    <label htmlFor="fileInput">Choose file:</label>
                    <input type="file" className="form-control-file" id="fileInput"  onClick={handleImageChange} ref={inputRef}/>
                </div>
              
                <div  className="form-group col-sm-4 mb-3"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <label>Image uploads here</label>
                  {image? <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: 'auto%',height:'100px'  }}  className="propImg"/>:<img />}
                        
                  </div>

             </div>
              
                <div class="row">
                    <div className="form-group col-sm-12 mb-3">
                    <label>Description</label>
                    <textarea className="form-control" id="description"  name={"description"} label={"description"} rows="3" value={prop.description} ></textarea>
                    </div>
                </div>

        
            <div className="form-group d-flex">
            <div className='me-2'>
                <button type="submit" className="btn btn-success btn-flat"  onClick={()=>show()}>Update Property </button>
            </div>
            </div>
            </div>
        </div>
        </form>
        </div>


    )
}