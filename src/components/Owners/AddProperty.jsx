import { useCallback, useRef,useState } from "react";
import 'jquery'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddProperty(){
    const propertyFormRef=useRef(null);
    const[saveMsg,setSaveMsg]=useState('');
    const [image, setImagePreview] = useState(null);
    const inputRef= useRef();
    const navigate= useNavigate();
    const token = sessionStorage.getItem('token');
    const [file, setFile] = useState()
    const preImgUrl = '/src/assets/images/';

  
    const saveProperty = (event) => {
        event.preventDefault();
      
         savePropertyToDabase();
     
    };
    useEffect(() => {
   

    }, []);
    
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          setFile(e.target.files[0])
console.log(file)

          if (file && e.target.files.length>0) {
            
             setImagePreview(e.target.files[0]);
            
          }
         
        }
  
        const handleImageClick=()=>{
          
            inputRef.current.click();
console.log("ckckckckckckckckckckckc");
        }
    
        
        const saveProbToDb = (event) => {
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
            imageUrl:preImgUrl+file.name,
            constructionDate: form['constructionDate'].value,
              
          };
console.log(data)
          const formData = new FormData()
          formData.append("file", file)
    

          axios.post("http://localhost:8080/api/v1/properties/create", data, {
            
          headers: {
              Authorization: `Bearer ${token}`,
          }
           })
          .then(() => setSaveMsg('Record successfully saved')
       
            )
          .catch(() => setSaveMsg('Record fail to save'));

          axios.post("http://localhost:8080/api/files/upload", formData, {
            
          headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'multipart/form-data'
          }
           })
          .then(() => setSaveMsg('Record successfully saved')
       
            )
          .catch(() => setSaveMsg('Record fail to save'));



      
          
      };
      
    return (
      
      <div>

        <div className="container">

         
        <form ref={propertyFormRef} onSubmit={saveProbToDb }>
            <div className="card card mx-auto mb-3">
            {saveMsg && <div className="alert alert-success">{saveMsg}</div>}
            <div className="card-body">
               <h1 style={{ textAlign: 'center', fontSize:'25px' }} className="mb-3">Register New Property</h1>

                <div className="row">

                    <div className="form-group col-sm-4">
                          <label>Property name</label>
                          <input type="text" className="form-control col-sm-6 mb-3" name={"name"} label={"name"}  />
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
                                  <option>CONDO</option>
                                  <option>HOUSE</option>
                                  <option>MOBILE</option>
                              </select>
                      </div>  

                </div>
                
                <div className="row">

                    <div className="form-group col-sm-4">
                          <label>Country</label>
                          <input type="text" className="form-control col-sm-6 mb-3" name={"country"} label={"country"} />
                      </div>
                    
                      <div className="form-group col-sm-4">
                            <label>Address line 1 </label>
                            <input type="text" className="form-control col-sm-6 mb-3" name={"address1"} />
                        </div>

                      <div className="form-group col-sm-4">
                        <label>Address ine 2:</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"address2"} />
                    </div>

              </div>

              <div className="row ">

               <div className="form-group col-sm-4">
                        <label>City:</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"city"} />
                    </div>

                <div className="form-group col-sm-4">
                    <label>State:</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name={"state"} label={"state"} />
                </div>

                  <div className="form-group col-sm-4">
                      <label>Postal code</label>
                      <input type="text" className="form-control col-sm-6 mb-3" name={"pcode"} />
                  </div>

              </div>

              <div className="row">

              <div className="form-group col-sm-4">
                      <label>Price</label>
                      <input type="text" className="form-control col-sm-6 mb-3" name={"price"} label={"price"} />
                  </div>

                  <div className="form-group col-sm-4">
                        <label>Number of Bath rooms</label>
                        <input type="text" className="form-control  mb-3" name={"noofbathrooms"} />
                    </div>

                    <div className="form-group col-sm-4">
                        <label>Number of Bed rooms</label>
                        <input type="text" className="form-control mb-3" name={"noofbedrooms"} />
                    </div>

              </div>

              <div className="row">
                  <div className="form-group col-sm-4">
                        <label>Year of construction</label>
                        <input type="date" className="form-control  mb-3" name={"constructionDate"} label={"constructionDate"} />
                    </div>
                  
                  <div className="form-group col-sm-4">
                    <label htmlFor="fileInput">Choose file:</label>
                    <input type="file" className="form-control-file" id="fileInput" onChange={handleImageChange} ref={inputRef}/>
                </div>
              

                  <div  className="form-group col-sm-4 mb-3"  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <label>Image uploads here</label>
                    {image? <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: 'auto%',height:'100px'  }}  className="propImg"/>:<img />}
                        
                  </div>

             </div>
             <div class="row">

                 <div className="form-group col-sm-12 mb-3">
                    <label>Description</label>
                    <textarea className="form-control" id="description"  name={"description"} label={"description"} rows="3"></textarea>
                  </div>

             </div>

        
            <div className="form-group d-flex">
            <div className='me-2'>
                <button type="submit" className="btn btn-success btn-flat"  >Add Property </button>
            </div>
            </div>
            </div>
        </div>
        </form>
        </div>
      </div>
      )
   }