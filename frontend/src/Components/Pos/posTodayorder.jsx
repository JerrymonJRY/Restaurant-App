import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../layouts/base_url';

const PosTodayOrder =() =>{

    const [posTodayorder, setPosTodayorder] = useState([]);

 

    const totalGrandTotal = Array.isArray(posTodayorder)
    ? posTodayorder.reduce((total, order) => {
        // Ensure grandTotal is present and is a number before adding it to the total
        const orderGrandTotal = parseFloat(order.grandTotal);
        return !isNaN(orderGrandTotal) ? total + orderGrandTotal : total;
      }, 0)
    : 0;


    useEffect(() => {
        fetch(`${apiConfig.baseURL}/api/pos/gettodayOrder`)
          .then((response) => response.json())
          .then((data) => setPosTodayorder(data))
          .catch((error) => console.error(error));
      }, []);


    return (
        <div className="container">
            <div className="row">
            <table className="table table-hover">
                    
                    <thead>
                        <tr>
                            <th>SI No</th>
                            <th>Select Option</th>
                            <th>Waiter</th>
                            <th>Total</th>
                            <th>Vat Amount</th>
                            <th>Grand Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       
  {
   Array.isArray(posTodayorder) && posTodayorder.length > 0 ? ( 
   posTodayorder.map((order,key) => (
    <tr key={order._id}>
     <td>{key + 1}</td>
      <td>{order.options}</td>

      <td>{order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</td>
      <td>{order.total}</td>
      <td>{order.vatAmount}</td>
      <td>{order.grandTotal}</td>

      <td>
        <Link to={`/posorderdetails/${order._id}`} className="btn btn-primary" data-toggle="tooltip" data-placement="right" title="Print">
        <i className="mdi mdi-cloud-print-outline"></i>
        </Link>
        <button onClick={(e) => handleDelete(order._id)} className="btn btn-danger" data-toggle="tooltip" data-placement="right" title="Kitchen Order">
          <i className="mdi mdi-food-variant"></i>
        </button>
      </td>
    </tr>
  ))
  ):(
    <tr>
    <td colSpan="7">No data available</td>
  </tr>
  )}
                       
                    </tbody>
                    <tfoot>
        <tr>
          <td colSpan="4"></td>
          <td>Total Grand Total:</td>
          <td>{totalGrandTotal}</td>
        </tr>
      </tfoot>
                </table>
            </div>
        </div>
    )

}
export default PosTodayOrder;