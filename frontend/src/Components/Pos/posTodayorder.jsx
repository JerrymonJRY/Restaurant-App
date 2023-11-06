import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';

const PosTodayOrder =() =>{

    const [posTodayorder, setPosTodayorder] = useState([]);

    const totalGrandTotal = posTodayorder.reduce((total, order) => total + order.grandTotal, 0);

    useEffect(() => {
        fetch('http://localhost:5000/api/pos/gettodayOrder')
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
                       
                        {posTodayorder.map((order,key) => (
    <tr key={order._id}>
     <td>{key + 1}</td>
      <td>{order.options}</td>

      <td>{order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</td>
      <td>{order.total}</td>
      <td>{order.vatAmount}</td>
      <td>{order.grandTotal}</td>

      <td>
        <Link to={`/posorderdetails/${order._id}`} className="btn btn-primary">
          Print
        </Link>
        <button onClick={(e) => handleDelete(order._id)} className="btn btn-danger">
          KOT
        </button>
      </td>
    </tr>
  ))}
                       
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