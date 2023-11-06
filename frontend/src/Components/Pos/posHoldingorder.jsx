import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';


const PosHoldingOrder =() =>
{

    const [posHoldingorder, setPosHoldingorder] = useState([]);
    const [kotdata,setkotData] =useState(null);
    const [showkotModal,setShowKotModal] =useState(false);
    useEffect(() => {
        fetch('http://localhost:5000/api/pos/gethold')
          .then((response) => response.json())
          .then((data) => setPosHoldingorder(data))
          .catch((error) => console.error(error));
      }, []);


      const handlekot =(id) =>
{

  const url = "http://localhost:5000/api/pos/getKot/"+id;
  axios.get(url)
  .then((response) => {
    setkotData(response.data);
    console.log(response.data);
    setShowKotModal(true);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

}
  
    return(
        <>
               <div className="row">
        {
                posHoldingorder.map((order) => (
            <div className="col-md-3">
                <div className="card">
                  <h5 className="text-center">OrderID:<span>{order.ordernumber}</span></h5>
               
                  <h6 className="text-center">Table:{order.table  ?order.table.tablename :'No Table'}</h6>
                  <h6 className="text-center">Table:{order.waiter.waitername}</h6>
                  <h6 className="text-center">Runningorder</h6>

                  <div class="row">
        
         <div className="d-inline mx-auto">

            
             <a class="btn btn-outline-primary" onClick={(e) => handlekot(order._id)} href="#">KOT</a>
             <a class="btn btn-outline-primary" href="#">Edit</a>
   
         </div>
    </div>
                </div>
            </div>

))
}
        
        </div>


         {/* Setkot Table */}
    <div>
 <div className={`modal ${showkotModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showkotModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">KOT</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Display the data here */}
              
              { kotdata ? (
kotdata.map((order) => (
               <div key={order.id}>
               <h5>Order Number: {order.ordernumber}</h5>
               <h6>Options: {order.options}</h6>
               <h6>Customer Name:{order.customerDetails ? order.customerDetails.customername : 'N/A'}</h6>
      <h6>Table:{order.tableDetails ? order.tableDetails.tablename : 'N/A'}</h6>
      <h6>Waiter {order.waiterDetails ? order.waiterDetails.waitername : 'N/A'}</h6>
                <table className="table   table-bordered">
                <thead>
                <tr>
                    <th>Si No</th>
                    <th>Food Name</th>
                    <th>Quanity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                 
                  {order.cart.map((cartItem,key) => (
                <tr key={cartItem.foodmenuId}>
                  <td>{key + 1}</td>
                  <td>{cartItem.menuItemDetails.foodmenuname}</td>
                 
                  <td>{cartItem.salesprice}</td>
                  <td>{cartItem.quantity}</td>
                  {/* Render other cart item details here */}
                </tr>
              ))}
                
                </tbody>
                </table>
                <h6 className="text-right">Total :{order.total}</h6>
                <h6 className="text-right">Vat Amount :{order.vatAmount}</h6>
                <h6 className="text-right">Grand Total :{order.grandTotal}</h6>

           

                <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary" >Print</button> 
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowKotModal(false)}>Close</button>
            </div>
   
             </div>
           
              ))
              ):(
                <p>No data</p>
              )
            }
            </div>
         
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showkotModal ? 'show' : ''}`} style={{ display: showkotModal ? 'block' : 'none' }}></div>
    </div>
        </>
    );
}

export default PosHoldingOrder;