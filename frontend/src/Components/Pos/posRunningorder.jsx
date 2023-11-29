import React from "react";
import { useState,useEffect,useRef } from "react";
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import Swal from 'sweetalert2';
import ReactToPrint   from "react-to-print";
import apiConfig from '../layouts/base_url';
const PosRunningOrder = ()=>{


    const [posRunningorder, setPosRunningorder] = useState([]);
    const [data, setData] = useState(null);
    const [kotdata,setkotData] =useState(null);
    const [splitdata,setSplitData] =useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showkotModal,setShowKotModal] =useState(false);
    const [showSplitModal,setShowSplitModal] =useState(false);
    const [payments,setPays] =useState();
 const [searchTerm, setSearchTerm] = useState('');
   const [refresh, setRefresh] = useState(false);
   const [checkedOrders, setCheckedOrders] = useState([]);
   const [mergdata,setMergedata] =useState(null);
   const [mergeModal,setMergeModal] =useState(false);


  
    const handlePays = (event) => {
      setPays(event.target.value);
      
    //  alert({svat});
     }


      const componentRef = useRef();

      const kotModalRef = useRef();
    
      const handlePrint = () => {
        if (kotModalRef.current) {
          // Use ReactToPrint to handle the print action for the KOT modal
          kotModalRef.current.handlePrint();
        }
      }
    useEffect(() => {
      fetch(`${apiConfig.baseURL}/api/pos/getrunningorder`)
        .then((response) => response.json())
        .then((data) => setPosRunningorder(data))
        .catch((error) => console.error(error));
    }, [refresh]);

    const filteredOrders = posRunningorder.filter((order) => {
      const searchTermLower = searchTerm.toLowerCase();
      const orderNumberIncludes = order.ordernumber.toLowerCase().includes(searchTermLower);
      const tableNameIncludes = order.table && order.table.tablename.toLowerCase().includes(searchTermLower);
      const waiterNameIncludes = order.waiter.waitername.toLowerCase().includes(searchTermLower);
    
      return orderNumberIncludes || (tableNameIncludes && waiterNameIncludes);
    });
    const handleComplete =(id) =>{
        console.log(id);
        axios.get(`${apiConfig.baseURL}/api/pos/getcomplete/${id}`)
        .then((response) => {
            setData(response.data);
            console.log(response.data);
            setShowModal(true);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });

    }

    const closeModal = () => {
        setShowModal(false);
        
      };


      const payment  = [
        { value: 'Cash', label: 'Cash' },
        { value: 'Card', label: 'Card' },
       
      ];

const handleMakePayment =(id) =>
{
  
  var formData = new FormData();
  formData.append("paymentType", payments);
  //formData.append("foodmenuname", foodmenuname);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  };
  const url = `${apiConfig.baseURL}/api/pos/updatePayment/${id}`;

  axios.put(url,formData, config)
  .then(res => {
    Swal.fire({
      title: 'Success!',
      text: 'Do you want to print the order?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes, print',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // Open your print modal here
        console.log(res);
      setRefresh((prevRefresh) => !prevRefresh);
       // openPrintModal(res.data);
      } else {
        navigate('/posorder');
      }
    });
  })
  .catch(err => console.log(err));
}
  
const handlekot =(id) =>
{

  const url = `${apiConfig.baseURL}/api/pos/getKot/${id}`;
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


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlesplit =(id)=>
  {
    const url = `${apiConfig.baseURL}/api/pos/getsplit/${id}`;
    axios.get(url)
    .then((response) => {
      setSplitData(response.data);
      console.log(response.data);
      setShowSplitModal(true);
    })
    
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
  
  }

  const totalGrandTotal = Array.isArray(splitdata)
  ? splitdata.reduce((total, order) => {
      // Sum up the quantities of each cartItem in the order
      const orderTotal = order.cart.reduce((orderTotal, cartItem) => {
        const itemQuantity = parseFloat(cartItem.quantity);
        return !isNaN(itemQuantity) ? orderTotal + itemQuantity : orderTotal;
      }, 0);

      return total + orderTotal;
    }, 0)
  : 0;

  const totalGrandTotals = Array.isArray(splitdata)
  ? splitdata.reduce((total, order) => {
      // Sum up the quantities of each cartItem in the order
      const orderTotal = order.cart.reduce((orderTotal, cartItem) => {
        const itemQuantity = parseFloat(cartItem.quantity);
        return !isNaN(itemQuantity) ? orderTotal + itemQuantity : orderTotal;
      }, 0);

      return total + orderTotal;
    }, 0)
  : 0;
  const optionValues = Array.from({ length: totalGrandTotals - 1 }, (_, index) => index + 2);

  const [selectedSplitValue, setSelectedSplitValue] = useState('');
  const [textInputs, setTextInputs] = useState([]);
  const [foodtextInputs, setfoodTextInputs] = useState([]);

  const handleSplitChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setSelectedSplitValue(value);

    // Create an array with 'value' number of elements
   const newInputs = Array.from({ length: value }, (_, index) => index + 1);
  setTextInputs(newInputs);
  //setfoodTextInputs(Array(value).fill(0));
  };

 const handleQuantityDecrease = (orderIndex, cartItemIndex, event) => {
  
  if (selectedSplitValue > 0) {

    const updatedSplitData = [...splitdata];
    const order = updatedSplitData[orderIndex];
    const cartItem = order.cart[cartItemIndex];

    
    cartItem.quantity = Math.max(0, cartItem.quantity - 1);

    
    setSplitData(updatedSplitData);

   
    const updatedTextInputs = [...textInputs];
    updatedTextInputs[cartItemIndex] = Math.max(0, updatedTextInputs[cartItemIndex] - 1);
    setTextInputs(updatedTextInputs);

  
    const updatedFoodTextInputs = [...foodtextInputs];
    updatedFoodTextInputs[cartItemIndex] = Math.max(0, updatedFoodTextInputs[cartItemIndex] - 1);
    setfoodTextInputs(updatedFoodTextInputs);
  }
}




  const handleCheckboxChange = (orderId) => {
    setCheckedOrders((prevCheckedOrders) => {
      if (prevCheckedOrders.includes(orderId)) {
        return prevCheckedOrders.filter((id) => id !== orderId);
      } else {
        return [...prevCheckedOrders, orderId];
      }
    });
  };

  const handleMergeRequest = async () => {

    try {
      const response = await axios.post(`${apiConfig.baseURL}/api/pos/getmerge/`, {
         ids:checkedOrders
      });
      setMergedata(response.data);
      setMergeModal(true);
     // console.log(mergdata);

     
    //  const { price, ordernumber } = response.data;
      // setModalContent(`Order Number: ${ordernumber}, Price: ${price}`);
      // setShowModal(true);
    } catch (error) {
     
      console.error('Error:', error);
    }
  }

 
    return(
        <>
        <div className="container">

      
        <div className="row">

       <div className="col-md-10">
        <div className="form-group">
        <input
          type="text"
          placeholder="Search by OrderID"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control"
        />
        </div>
       </div>
       <div className="col-md-2">
       <a class="btn btn-outline-primary" onClick={handleMergeRequest}>Merge</a>
       </div>
        
     
        {
                filteredOrders.map((order) => (
            <div className="col-md-3">
                <div className="menu-boxs">
                <div className="menu-div">
                <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input text-right"
                  id={`checkbox-${order._id}`}
                  onChange={() => handleCheckboxChange(order._id)}
                  checked={checkedOrders.includes(order._id)}
                />
    
  </div>

 
                  <h5 className="text-center"><span>{order.ordernumber}</span></h5>
               
                  <h6 className="text-center">Table:{order.table  ?order.table.tablename :'No Table'}</h6>
                  <h6 className="text-center">Table:{order.waiter.waitername}</h6>
                  <h6 className="text-center">Runningorder</h6>

                  <div class="row">
        
         <div className="d-inline mx-auto ">

             <a class="btn btn-outline-primary" onClick={(e) => handleComplete(order._id)} href="#">Payment</a>
             <a class="btn btn-outline-primary" onClick={(e) => handlekot(order._id)} href="#">KOT</a>
             <a class="btn btn-outline-primary" href="#">Edit</a>
             <a class="btn btn-outline-primary" onClick={(e) => handlesplit(order._id)} href="#">Split</a>
    
         </div>
    </div>
                </div>
                </div>
            </div>

))
}
        
        </div>
 {/* Modal */}
 <div>
 <div className={`modal ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Details</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {/* Display the data here */}
              
              { data ? (
data.map((order) => (
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
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.salesprice}</td>
                 
                  {/* Render other cart item details here */}
                </tr>
              ))}
                
                </tbody>
                </table>
                <h6>Total :{order.total}</h6>
                <h6>Vat Amount :{order.vatAmount}</h6>
                <h6>Grand Total :{order.grandTotal}</h6>

                <div className="form-group row">
                        <label for="exampleInputUsername2" className="col-sm-3 col-form-label">Select Payment</label>
                        <div className="col-sm-9">
                        <select className="form-control" onChange={handlePays}  value={payments}>
                          <option>Select Payment</option>
                          {payment.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
                        </select>
                        
                        </div>
                      </div>

                <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary" onClick={(e) => handleMakePayment(order._id)}>Pay Now</button> 
              <button type="button" className="btn btn-outline-secondary" onClick={() => setShowModal(false)}>Close</button>
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
      <div className={`modal-backdrop ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}></div>
    </div>

    {/* Setkot Table */}
    <div>
   
 <div className={`modal ${showkotModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showkotModal ? 'block' : 'none' }} ref={kotModalRef}>
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
                  <td>{cartItem.quantity}</td>
                  <td>{cartItem.salesprice}</td>
                
                  {/* Render other cart item details here */}
                </tr>
              ))}
                
                </tbody>
                </table>
                <h6 className="text-right">Total :{order.total}</h6>
                <h6 className="text-right">Vat Amount :{order.vatAmount}</h6>
                <h6 className="text-right">Grand Total :{order.grandTotal}</h6>

           

                <div className="modal-footer">
                {/* <button type="button" onClick={handlePrint}  className="btn btn-outline-primary" >Print</button>  */}
            <ReactToPrint
        trigger={() => <button onClick={handlePrint}>Print KOT</button>}
        content={() => kotModalRef.current}
      />
            
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

    {/* Split Modal */}
    <div>
   
   <div className={`modal ${showSplitModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showSplitModal ? 'block' : 'none' }} ref={kotModalRef}>
   <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Split Order</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Display the data here */}
                <div className="row">
                <div className="col-md-4">
                {Array.isArray(splitdata) && splitdata.length > 0 ? (
  splitdata.map((order,orderIndex) => (

    
                 <div key={order.id}>
       
                  <table className="table   table-bordered">
                  <thead>
                  <tr>
                      <th>Si No</th>
                      <th>Food Name</th>
                     
                   
                      </tr>
                  </thead>
                  <tbody>
                   
                    {order.cart.map((cartItem,cartItemIndex) => (
                  <tr key={cartItem.foodmenuId}>
                    <td>{cartItemIndex + 1}</td>
                    <td onClick={(event) => handleQuantityDecrease(orderIndex, cartItemIndex,event)}>
                      {cartItem.menuItemDetails.foodmenuname} - ({cartItem.quantity})</td>
                    

                  
                    {/* Render other cart item details here */}
                  </tr>
                ))}
                  
                  </tbody>
                  </table>
                 
  
             
  
               </div>
             
                ))
                ):(
                  <p>No data</p>
                )
              }
                </div>
                <div className="col-md-8">
                  <label htmlFor="">Select Number of Order</label>
                <select className="form-control" onChange={handleSplitChange} value={selectedSplitValue}>
                <option>Select Method</option>
            {optionValues.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <div className="row">
          {textInputs.map((index) => (
            
               <div className="col-md-6">
                  <div key={index}>
                    <div className="card">
                      <div className="card-header">

                      </div>
                      <div className="card-body">
                          <table className="table table-bordered">
                            <thead>
                              <th>Si No</th>
                              <th>Food Name</th>
                              <th>Quantity</th>
                            </thead>
                            <tbody>
                  {foodtextInputs.map((value, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>Food Item</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>

                          </table>
                      </div>
                    </div>
                 </div>
               </div>

          
      
      ))}
        </div>
                </div>
                </div>
    


              </div>

              <div className="modal-footer">
             
             <button type="button" className="btn btn-outline-secondary" onClick={() => setShowSplitModal(false)}>Close</button>
           </div>
           
            </div>
          </div>
        </div>
        <div className={`modal-backdrop ${showSplitModal ? 'show' : ''}`} style={{ display: showSplitModal ? 'block' : 'none' }}></div>
        
        
      </div>

      {/* Merge Modal */}

      <div>
   
   <div className={`modal ${mergeModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: mergeModal ? 'block' : 'none' }} ref={kotModalRef}>
   <div className="modal-dialog modal-lg" role="document"  style={{ maxWidth: '1200px' }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Merge Orders</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                  <table className="table table-bordered">
                      <thead>
                        <th>Si No</th>
                        <th>Order Number</th>
                        <th> Amount</th>
                        <th>Vat</th>
                        <th>Grand Total</th>
                      </thead>
                      <tbody>
                      { mergdata ? (
mergdata.map((order,key) => (
  <tr key={order._id}>
        <td>{key + 1}</td>
        <td>{order.ordernumber}</td>
        <td>{order.total}</td>
        <td>{order.vatAmount}</td>
        <td>{order.grandTotal}</td>
    </tr>
           
              ))
              ):(
                <p>No data dddd</p>
               
              )
            }
                      </tbody>
                  </table>
              </div>
  
             
           
            </div>
          </div>
        </div>
        <div className={`modal-backdrop ${mergeModal ? 'show' : ''}`} style={{ display: mergeModal ? 'block' : 'none' }}></div>
        
        
      </div>
    </div>
        </>
    );
}

export default PosRunningOrder;