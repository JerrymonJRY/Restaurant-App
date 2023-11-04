import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';

const ViewVat =() =>{


  const [data , setData] =useState([]);
  const navigate = useNavigate();
  useEffect( ()=>{

      axios.get('http://localhost:5000/api/vat/allvat')
      .then(res =>setData(res.data))
      .catch(err =>console.log(err));

      $(document).ready(function () {
        $("#example_table").DataTable();
      });

  },[])

  // const handleDelete =(id) =>
  // {
  //     const confirm =window.confirm('Are You Delete');
  //     if(confirm)
  //     {
  //         axios.delete('http://localhost:5000/api/vat/deleteVat/'+id)
  //         .then(res =>{

             
  //             navigate('/viewfoodcategory');
  //             console.log(res);
  //         }).catch(err =>console.log(err));
  //     }
  // }

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this item.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete('http://localhost:5000/api/vat/deleteVat/' + id)
          .then((res) => {
            // Handle success
            navigate('/viewVat');
            console.log(res);
          })
          .catch((err) => {
            // Handle error
            console.log(err);
          });
      }
    });
  };
  

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
                    <h4 className="card-title">Vat List</h4>
                    <div className="d-flex justify-content-end">
                    <Link to="/addVat" className="btn btn-success">Add +</Link>
                </div>
                  
                    <table className="table table-hover"  id="example_table" style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <th>Vat Name</th>
                          <th>Percentage</th>
                        <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((d,i) =>(

                            <tr key={i}>
                                <td>
                                    {d.vatname}
                                </td>
                                <td>
                                    {d.percentage}
                                </td>
                               
                                <td>
                                <Link to={`/editVat/${d._id}`} className="btn btn-primary">Edit</Link>
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
export default ViewVat;