import React from "react";
import { useState } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate } from "react-router-dom";


const AddCategory =() =>{

    const [values,setValues] = useState({

        categoryname :'',
        description:'',
       

    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleSubmit =(event) =>{

      const validationErrors = validateForm(values);



        event.preventDefault();
        if (Object.keys(validationErrors).length === 0) {
        axios.post('http://localhost:5000/api/category/createcategory',values)
        .then(res =>{

            console.log(res);
            navigate('/viewingredientfoodcategory');
        })
        .catch(err =>console.log(err));
      }
      else {
        // Set validation errors
        setErrors(validationErrors);
      }
    }


    const validateForm = (data) => {
      let errors = {};
  
      if (!data.categoryname) {
        errors.categoryname = "Category Name is required";
      }
  
     
      return errors;
    };
    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Food Category </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Food Category</li>
                </ol>
              </nav>
            </div>
            <div className="row">
       
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  
                    <form className="forms-sample" onSubmit={handleSubmit}>
                        <div className="row">
                          
                            <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Food Category</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="categoryname" id="exampleInputUsername2" onChange={e =>setValues({...values, categoryname: e.target.value})} placeholder="Food Description" />
                          {errors.categoryname && <span className="error">{errors.categoryname}</span>}
                        </div>
                      
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Food Description</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="description" id="exampleInputUsername2" onChange={e =>setValues({...values, description: e.target.value})} placeholder="Food Category" />
                        </div>
                      </div>
                      
                    
                           
                      
                        </div>
                   
                      <button type="submit" className="btn btn-gradient-primary me-2">Submit</button>
                     
                    </form>
                  </div>
                </div>
              </div>
 
   

      
            </div>
          </div>
                    <Footer />
            </div>
        </div>
    </div>
    )
}

export default AddCategory;