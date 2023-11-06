import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";


const ViewCategory =() =>{

    const [data , setData] =useState([]);
    const navigate = useNavigate();

    $(document).ready(function () {
      $('#myTable').DataTable();
   });
   
    useEffect( ()=>{

    

        axios.get('http://localhost:5000/api/category/allcategory')
        .then(res =>setData(res.data))
        .catch(err =>console.log(err));
       

    },[])

    const handleDelete =(id) =>
    {
        const confirm =window.confirm('Are You Delete');
        if(confirm)
        {
            axios.delete('http://localhost:5000/api/category/deletecategory/'+ id)
            .then(res =>{

               
                //navigate('/viewfoodcategory');
                console.log(res);
                window.location.reload();
            }).catch(err =>console.log(err));
        }
    }

    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
                  <div className="content-wrapper">
                  <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Food Category List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addingredientfoodcategory" className="btn btn-success">Add +</Link>
                </div><br />
                  
                <table id="myTable" className="table table-striped table-bordered" >
                      <thead>
                        <tr>
                          <th>Category Name</th>
                          <th>Description</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((d,i) =>(

                            <tr key={i}>
                                <td>
                                    {d.categoryname}
                                </td>
                                <td>
                                    {d.description}
                                </td>
                               
                                <td>
                                    <Link to={`/editingrdientfoodcategory/${d._id}`} className="btn btn-primary">Edit</Link>
                                    <button onClick={  (e)=>handleDelete(d._id)} className="btn btn-danger">Delete</button>
                                </td>

                            </tr>

                        ))
                    }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
                    </div>
                    <Footer />
            </div>
        </div>
    </div>
    );
}

export default ViewCategory;