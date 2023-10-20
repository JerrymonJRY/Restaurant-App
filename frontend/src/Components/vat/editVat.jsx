import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,useParams } from "react-router-dom";

const EditVat =() =>{

    const {id} =useParams()
    const [vatname,setVatName] =useState()
    const [percentage,setPercentage] =useState()

  
    const navigate = useNavigate();

    useEffect( ()=>{

        axios.get('http://localhost:5000/api/vat/getvat/'+id)
        .then(res => { console.log(res)
            setVatName(res.data.vatname)
            setPercentage(res.data.percentage)
        
    })
        .catch(err =>console.log(err));

    },[])


    const handleSubmit =(event) =>{

        event.preventDefault();
        axios.put('http://localhost:5000/api/vat/updateVat/'+id,{vatname,percentage})
        .then(res =>{

            console.log(res);
            navigate('/viewVat');
        })
        .catch(err =>console.log(err));
    }

   
    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
            <div className="content-wrapper">
            <div className="page-header">
              <h3 className="page-title"> Add Vat </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><a href="#">Food</a></li>
                  <li className="breadcrumb-item active" aria-current="page">Add Vat</li>
                </ol>
              </nav>
            </div>
            <div className="row">
       
              <div className="col-md-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                  
                    <form className="forms-sample" onSubmit={handleSubmit} >
                        <div className="row">
                          
                            <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Vat Name</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="vatname" id="exampleInputUsername2" value={vatname} onChange={(e)=>setVatName(e.target.value)} placeholder="Food Description" />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="exampleInputUsername2" className="col-sm-3 col-form-label">Percentage</label>
                        <div className="col-sm-9">
                          <input type="text" className="form-control" name="percentage" id="exampleInputUsername2" value={percentage} onChange={(e)=>setPercentage(e.target.value)} placeholder="Food Category" />
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

export default EditVat;