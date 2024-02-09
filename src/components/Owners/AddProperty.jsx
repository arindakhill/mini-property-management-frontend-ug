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

  
    const saveProperty = (event) => {
        event.preventDefault();
      
        /*const type = propertyFormRef.current.type.value;
        const category = propertyFormRef.current.category.value;
        const country = propertyFormRef.current.country.value;
        const address1 = propertyFormRef.current.address1.value;
        const address2 = propertyFormRef.current.address2.value;
        const state = propertyFormRef.current.state.value;
        const city = propertyFormRef.current.city.value;
        const pcode = propertyFormRef.current.postalcode.value;
        const price = propertyFormRef.current.price.value;
        const noofbedrooms = propertyFormRef.current.nofobedrooms.value;
        const noofbathrooms = propertyFormRef.current.noofbathrooms.value;
        const year = propertyFormRef.current.year.value;
        //const addressObj={address1,address2,city,pcode,state,country};
        const propertyData = {type, category,price,noofbedrooms,noofbathrooms,description};*/
         savePropertyToDabase()
    
       /* savePropertyToDbApi(values)
        .then(() => setSaveMsg('Record successfully updated')
     
          )
       .catch(() => setSaveMsg('Record fail to update'));*/
    };
    useEffect(() => {
    //  $(datePickerRef.current).datepicker();

    }, []);
    
        const handleImageChange = (e) => {
          const file = e.target.files[0];
          setFile(event.target.files[0])

          if (file && e.target.files.length>0) {
            
             setImagePreview(e.target.files[0]);
            
          }
         
        }
  
        const handleImageClick=()=>{
          
            inputRef.current.click();
        }
    
        /*const saveImageToFolder = (event) => {
          fs.writeFile(`../Owners/images/${files.target.files[0].name}.png`, files.target.files[0], function (err) {
          if (err) throw err;
    
            }); 
         }*/

         /*const savePropertyToDabase = () => {

        
          return axios.post("http://localhost:8080/api/v1/properties/create", propertyData, {
            
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setSaveMsg('Property successfully updated')
                navigate('/add-property');
            })
        };*/

        const savePostToDb = (event) => {
          event.preventDefault();
    
          /*const type = propertyFormRef.current.type.value;
          const category = propertyFormRef.current.category.value;
          const country = propertyFormRef.current.country.value;*/

          const form = propertyFormRef.current;
          const data = {
              listingType:form['type'].value,
              propertyType:form['category'].value,
              
             /* address:{
              country:form['country'].value,
              line1:form['address1'].value,
              line2:form['address2'].value,
              state:form['state'].value,
              city :form['city'].value,
              postalCode : form['pcode'].value,  
              },
              address:address,*/
             
              price :form['price'].value,
              bedRooms :form['noofbedrooms'].value,
              bathRooms :form['noofbathrooms'].value,
              description :form['description'].value,
              constructionDate: form['constructionDate'].value,
              imageUrl:file.name
          };
          const formData = new FormData()
          formData.append("file", file)
    
          //const values = {type, category, country };
          axios.post("http://localhost:8080/api/files/upload", formData, {
            
          headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'multipart/form-data'
          }
           })
          .then(() => setSaveMsg('Record successfully saved')
       
            )
          .catch(() => setSaveMsg('Record fail to save'));


      
          return axios.post("http://localhost:8080/api/v1/properties/create", data, {
            
          headers: {
              Authorization: `Bearer ${token}`
              //'Content-Type': 'multipart/form-data'
          }
           })
          .then(() => setSaveMsg('Record successfully saved')
       
            )
          .catch(() => setSaveMsg('Record fail to save'));
      };
      
    return (
      
      <div>

        <div className="container">

          <form ref={propertyFormRef} onSubmit={savePostToDb} >
            <div className="card card mx-auto mb-3">
            {saveMsg && <div className="alert alert-warning">{saveMsg}</div>}
            <div className="card-body">
               <h1 style={{ textAlign: 'center', fontSize:'25px' }} className="mb-3">Register New Property</h1>

                <div className="row">

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

                      <div className="form-group col-sm-4">
                          <label>Country</label>
                          <input type="text" className="form-control col-sm-6 mb-3" name={"country"} label={"country"} />
                      </div>

                </div>
                
                <div className="row">
                  
                    
                      <div className="form-group col-sm-4">
                            <label>Address line 1 </label>
                            <input type="text" className="form-control col-sm-6 mb-3" name={"address1"} />
                        </div>

                      <div className="form-group col-sm-4">
                        <label>Address ine 2:</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"address2"} />
                    </div>

                    <div className="form-group col-sm-4">
                        <label>City:</label>
                        <input type="text" className="form-control col-sm-6 mb-3" name={"city"} />
                    </div>

              </div>

              <div className="row ">


                <div className="form-group col-sm-4">
                    <label>State:</label>
                    <input type="text" className="form-control col-sm-6 mb-3" name={"state"} label={"state"} />
                </div>

                  <div className="form-group col-sm-4">
                      <label>Postal code</label>
                      <input type="text" className="form-control col-sm-6 mb-3" name={"pcode"} />
                  </div>

                  <div className="form-group col-sm-4">
                      <label>Price</label>
                      <input type="text" className="form-control col-sm-6 mb-3" name={"price"} label={"price"} />
                  </div>

              </div>

              <div className="row">

                  <div className="form-group col-sm-4">
                        <label>Number of Bath rooms</label>
                        <input type="text" className="form-control  mb-3" name={"noofbathrooms"} />
                    </div>

                    <div className="form-group col-sm-4">
                        <label>Number of Bed rooms</label>
                        <input type="text" className="form-control mb-3" name={"noofbedrooms"} />
                    </div>
                    <div className="form-group col-sm-4">
                        <label>Year of construction</label>
                        <input type="date" className="form-control  mb-3" name={"constructionDate"} label={"constructionDate"} />
                    </div>

              </div>

              <div className="row">
              <div className="form-group col-sm-4 mb-3">
                <label>Description</label>
                <textarea className="form-control" id="description"  name={"description"} label={"description"} rows="3"></textarea>
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