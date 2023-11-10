import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';
import apiConfig from '../layouts/base_url';

const PosNewOrder = () => {


  const navigate = useNavigate();
  const [tabEnabled, setTabEnabled] = useState({
    dineIn: false,
    takeaway: false,
    delivery: false
  });
  const [enableDinein, setEnableDinein] = useState(false);
  // const [isEnableTable, setEnableTable] = useState(true);
  // const [isEnableTakeway,setEnableTakeway] =useState(true);
  // const [isEnableDelivery,setEnableDelivery] =useState(true);
  //Value Declare
  const [waiter, setWaiter] = useState([]);
  const [selectWaiter, setSelectWaiter] = useState();
  const [table, setTable] = useState([]);
  const [selectTable, setSelectTable] = useState();
  const [foodCategory, setFoodcategory] = useState([]);
  const distinctCategories = [...new Set(foodCategory.map(item => item.foodcategory.foodcategoryname))];
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [vatAmount, setTotalVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [options, setOptions] = useState('');
  const [showCustomerTab, setShowCustomerTab] = useState(false);
  const [showFoodMenuTab, setShowFoodMenuTab] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState();
  const [placeorder, setPlaceOrder] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const [showTable, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

const handleSearch = (e) => {
  setSearchTerm(e.target.value);
};

console.info({table})
  const handleDinein = (e) => {

    setTabEnabled({
      dineIn: true,
      takeaway: false,
      delivery: false
    })
    setOptions("Dine In")
    setEnableDinein(true);

  };

  const handleWaiter = (details) => {

    // setEnableDinein(true);
    // setSelectWaiter(e.target.value);
    // if(selectWaiter)
    // {
    //     setTabEnabled(false);
    //      if (!isTabEnabled) {
    //      handleDinein();
    //      }
    // }
    // else{

    // }
    setSelectWaiter(details);
    setTabEnabled({
      dineIn: true,
      takeaway: true,
      delivery: true
    })

  };

  console.log("selectWaiter is not empty:", selectWaiter);


  // const handleTable = (e) => {
  //   setEnableTable(false);
  // }

  const handleTakeway = (e) => {
    // setEnableTakeway(false);
    setTabEnabled({
      dineIn: false,
      delivery: false,
      takeaway: true
    })
    setOptions("Take Away")
    setShowFoodMenuTab(true);
  }

  const handleDelivery = (e) => {
    setTabEnabled({
      dineIn: false,
      delivery: true,
      takeaway: false
    })
    setOptions("Delivery")
    setShowCustomerTab(true);
  }

  const handleCustomer = (e) => {

  }

  const handleMenu = (e) => {

  }


console.info({customers})
  //Get The Waiter data
  useEffect(() => {

    axios.get(`${apiConfig.baseURL}/api/pos/posWaiter`)
      .then((response) => {
        setWaiter(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {

    axios.get(`${apiConfig.baseURL}/api/pos/posTable`)
      .then((response) => {
        setTable(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

      axios.get(`${apiConfig.baseURL}/api/pos/posCustomer`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {

    axios.get(`${apiConfig.baseURL}/api/pos/posfood`)
      .then((response) => {
        setFoodcategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addProductToCart = async (menu) => {

    let findProductInCart = cart.find(i => {
      return i._id === menu._id
    });
    console.info({ findProductInCart })
    let newCart = [];
    if (findProductInCart) {
      let newItem;

      cart.forEach(cartItem => {
        if (cartItem._id === menu._id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            // totalAmount: cartItem.salesprice * (cartItem.quantity + 1),
            // vatAmount:(cartItem.salesprice * (cartItem.quantity + 1) * cartItem.vat.percentage) / 100,


          }
          //console.log(vatAmount);
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
          // console.log(cartItem);
        }
      });
      console.info({ newCart })
      setCart(newCart);
      const toastOptions = {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause on hover
      };
      <ToastContainer />
      // toast(`Added ${menu.foodmenuname} to the cart`, toastOptions);
      //  toast(`Added ${newItem.foodmenuname} to cart`,toastOptions)

    } else {
      let addingProduct = {
        ...menu,
        'quantity': 1,
        'totalAmount': menu.salesprice,
      }
      setCart([...cart, addingProduct]);
      const toastOptions = {
        position: 'top-right',
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false, // Show a progress bar
        closeOnClick: true, // Close the toast when clicked
        pauseOnHover: true, // Pause on hover
      };

      //toast(`Added ${newItem.foodmenuname} to the cart`, toastOptions);
      <ToastContainer />
    }


  }

  const removeProduct = async (menu) => {
    const newCart = cart.filter(cartItem => cartItem._id !== menu._id);
    setCart(newCart);
  }

  useEffect(() => {
    let newTotalAmount = 0;
    let newVatAmount = 0;

    cart.forEach(icart => {

      newTotalAmount = newTotalAmount + icart.quantity * parseInt(icart.totalAmount);
      newVatAmount = parseInt(icart.vat.percentage) != 0 ? newVatAmount + icart.quantity * parseInt(icart.salesprice) * (parseInt(icart.vat.percentage) / 100) : newVatAmount;
    })

    console.log({ newVatAmount });
    setTotalAmount(newTotalAmount);
    setTotalVat(newVatAmount.toFixed(2));
    setGrandTotal((newTotalAmount + newVatAmount).toFixed())
  }, [cart])

  const handleIncrement = (prod) => {
    const { _id, salesprice } = prod
    console.log({ cart, prod })
    console.log({ prodId: prod["_id"] });
    let addQuantity = cart.map(item => {
      if (item["_id"] == prod["_id"]) {
        console.log(({ item }));
        item.quantity = item.quantity + 1;
        return item;
      }
      return item;
    })
    console.log({ addQuantity });
    console.log({ totalAmount });
    // setTotalAmount(parseInt(totalAmount) + parseInt(salesprice))
    setCart(addQuantity)
  }

  //console.log({totalAmount});

  const handleDecrement = (prod) => {
    const { _id, salesprice } = prod
    console.log({ cart, prod })
    console.log({ prodId: prod["_id"] });
    let addQuantity = cart.map(item => {
      if (item["_id"] == _id) {
        console.log(({ item }));
        item.quantity = item.quantity > 1 ? item.quantity - 1 : 1;
        return item;
      }
      return item;
    })
    console.log({ addQuantity });
    // setTotalAmount(parseInt(totalAmount) - parseInt(salesprice))
    setCart(addQuantity)
  }

  // const handlePlaceorder =(event) =>{
  //   event.preventDefault();
  //   if (cart.length < 1) {
  //     alert("cart is empty")
  //   }
  //   else if(!options)
  //   {
  //     alert("Please select options");
  //   }
  // }
  const handlePlaceorder = (event) => {
    event.preventDefault();
    if(!selectWaiter)
    {
      Swal.fire({
        icon: 'error',
        title: 'Waiter is Empty',
        text: 'Please add items to your cart before placing an order.',
      });
    }
    else if (cart.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Cart is empty',
        text: 'Please add items to your cart before placing an order.',
      });
    } else if (!options) {
      Swal.fire({
        icon: 'error',
        title: 'Options not selected',
        text: 'Please select options before placing an order.',
      });
    } else {
      setPlaceOrder({
        option: options,
        waiter: selectWaiter,
        customer: selectCustomer,
        table: selectTable,
        cart: cart,
        total: totalAmount,
        vat: vatAmount,
        grandTotal: grandTotal 
      })

      var posData = new FormData();
     // posData.append("customers",selectCustomer._id);
     if (selectCustomer && selectCustomer._id) {
      posData.append("customers", selectCustomer._id);
  }
      posData.append("options",options);
      posData.append("grandTotal",grandTotal);
 
      for (let i = 0; i < cart.length; i++) {
       posData.append(
         `cart[${i}].foodmenuId`,
        cart[i]._id
       );
       posData.append(
        `cart[${i}].foodmenuname`,
       cart[i].foodmenuname
      );
       posData.append(
         `cart[${i}].salesprice`,
         cart[i].salesprice
       );
       posData.append(
         `cart[${i}].quantity`,
         cart[i].quantity
       );
     
    
     }
 

      posData.append("vatAmount",vatAmount);
      posData.append("total",totalAmount);
     posData.append("foodoption",options);
    //  posData.append("tableId",selectTable._id);
    //  posData.append("waiterId",selectWaiter._id);
    if (selectTable && selectTable._id) {
      posData.append("tableId", selectTable._id);
  }
  
  if (selectWaiter && selectWaiter._id) {
      posData.append("waiterId", selectWaiter._id);
  }
     //console.log(posData);
     
   
       const config = {
         headers: {
           'Content-Type': 'application/json',
         }
       };
   
        axios
       .post(`${apiConfig.baseURL}/api/pos/createpos`, posData, config)
      
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
              console.log(posData);
              openPrintModal(res.data);
            } else {
              navigate('/posorder');
            }
          });
        })
        .catch(err => console.log(err));
    }
  };

  // function openPrintModal(orderData) {
  //   $('#print-modal').modal('show');

    
  //   const modalBody = document.getElementById('modal-body');
  
   
  //   const table = document.createElement('table');
  //   table.classList.add('table'); 

  
 
  //   const tableBody = document.createElement('tbody');

    
   
    
  //   for (const key in orderData) {
  //     if (Object.hasOwnProperty.call(orderData, key)) {
  //       const row = tableBody.insertRow();
  //       const cell1 = row.insertCell(0);
  //       const cell2 = row.insertCell(1);
  //       cell1.textContent = key;
  //       cell2.textContent = orderData[key];
  //     }
  //   }
  
   
  //   table.appendChild(tableBody);
  
  
  //   modalBody.appendChild(table);
  // }

  function openPrintModal(data) {
    // Create a modal dialog or use a library like Swal
    Swal.fire({
      title: 'Order Details',
      html: getFormattedOrderDetails(data), // Call a function to format the data
      icon: 'success',
      confirmButtonText: 'OK',
    });
  }

  function getFormattedOrderDetails(data) {
    // Create an HTML structure to display the order details
    let formattedDetails = '<div>';
    formattedDetails += `<p><strong>Order Number:</strong> ${data.ordernumber}</p>`;
    formattedDetails += `<p><strong>Customer:</strong> ${data.customers}</p>`;
    formattedDetails += `<p><strong>Options:</strong> ${data.options}</p>`;
    
    
    // Loop through cart items
    formattedDetails += '<p><strong>Cart:</strong></p>';
    formattedDetails += `<table className="table table-bordered">`;
    formattedDetails += `<thead>`;
    formattedDetails += `<tr>`;
    formattedDetails += `<th>Item</th>`;
    formattedDetails += `<th>Food Menu Name</th>`;
    formattedDetails += `<th>Sales Price</th>`;
    formattedDetails += `<th>Quantity</th>`;
    formattedDetails += `</tr>`;
    formattedDetails += `<tbody>`;

    data.cart.forEach((item, index) => {
      formattedDetails += `<tr>`;
      formattedDetails += `<td>${index + 1}</td>`;
    
      formattedDetails += `<td>${item.foodmenuname}</td>`;
      formattedDetails += `<td>${item.salesprice}</td>`;
      formattedDetails += `<td>${item.quantity}</td>`;
      formattedDetails += `</tr>`;
    });
    formattedDetails += `</tbody>`;
    formattedDetails += `</table>`;
    
    formattedDetails += `<p><strong>VAT Amount:</strong> ${data.vatAmount}</p>`;
    formattedDetails += `<p><strong>Total Amount:</strong> ${data.total}</p>`;
    formattedDetails += `<p><strong>Grand Total:</strong> ${data.grandTotal}</p>`;

    
    if (data.tableId) {
      formattedDetails += `<p><strong>Table ID:</strong> ${data.tableId}</p>`;
    }
    
    if (data.waiterId) {
      formattedDetails += `<p><strong>Waiter ID:</strong> ${data.waiterId}</p>`;
    }
    
    formattedDetails += '</div>';
    
    return formattedDetails;
  }


  const handleHold =(event) =>
  {
    event.preventDefault();
    if (cart.length < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Cart is empty',
        text: 'Please add items to your cart before placing an order.',
      });
    } else if (!options) {
      Swal.fire({
        icon: 'error',
        title: 'Options not selected',
        text: 'Please select options before placing an order.',
      });
    } else {
      setPlaceOrder({
        option: options,
        waiter: selectWaiter,
        customer: selectCustomer,
        table: selectTable,
        cart: cart,
        total: totalAmount,
        vat: vatAmount,
        grandTotal: grandTotal 
      })

      var posData = new FormData();
     // posData.append("customers",selectCustomer._id);
     if (selectCustomer && selectCustomer._id) {
      posData.append("customers", selectCustomer._id);
  }
      posData.append("options",options);
      posData.append("grandTotal",grandTotal);
 
      for (let i = 0; i < cart.length; i++) {
       posData.append(
         `cart[${i}].foodmenuId`,
        cart[i]._id
       );
       posData.append(
         `cart[${i}].salesprice`,
         cart[i].salesprice
       );
       posData.append(
         `cart[${i}].quantity`,
         cart[i].quantity
       );
     
    
     }
 

      posData.append("vatAmount",vatAmount);
      posData.append("total",totalAmount);
     posData.append("foodoption",options);
    //  posData.append("tableId",selectTable._id);
    //  posData.append("waiterId",selectWaiter._id);
    if (selectTable && selectTable._id) {
      posData.append("tableId", selectTable._id);
  }
  
  if (selectWaiter && selectWaiter._id) {
      posData.append("waiterId", selectWaiter._id);
  }
     //console.log(posData);
     
   
       const config = {
         headers: {
           'Content-Type': 'application/json',
         }
       };
   
        axios
       .post(`${apiConfig.baseURL}/api/pos/createHold`, posData, config)
        // .then(res => {
        //    console.log(res);
        //    navigate('/posorder');
        //  })
        //  .catch(err => console.log(err));
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
              openPrintModal(res.data);
            } else {
              navigate('/posorder');
            }
          });
        })
        .catch(err => console.log(err));
    }
  }




 
  
  
  
  
  

  const handleCloseTable = () => {
    setShowModal(false);
  };

  console.info({ placeorder })
  return (
    <div className="row">
      <div className="col-sm-5 col-lg-4">
        <div className="wraper shdw">

          <div className="table-responsive vh-70">
            <table className="table">
              <thead>
                <tr className="thead-light">
                  <th scope="col">No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">U.Price</th>
                  <th scope="col">Qty</th>

                  <th scope="col">Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart ? cart.map((cartProduct, key) => <tr key={key}>
                  {/* <td>{cartProduct._id}</td> */}
                  <td>{key + 1}</td>
                  <td>{cartProduct.foodmenuname}</td>
                  <td>{cartProduct.salesprice}</td>
                  <td><button className='btn btn-danger btn-sm cartminus' onClick={() => handleDecrement(cartProduct)}>-</button><input type="text" style={{ width: '20px' }} value={cartProduct.quantity} /><button className='btn btn-success btn-sm cartplus' onClick={() => handleIncrement(cartProduct)}>+</button></td>

                  <td>{cartProduct.totalAmount}</td>
                  <td>
                    <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)}>x</button>
                  </td>

                </tr>)

                  : 'No Item in Cart'}


              </tbody>
            </table>
          </div>

          <div className="table-responsive">
            <table className="table">
              <tr>
                <td>Total </td>
                <th className="text-right">${totalAmount}</th>
              </tr>
              <tr>
                <td >Discount  </td>
                <th className="text-right"></th>
              </tr>
              <tr>
                <td>VAT </td>
                <th className="text-right">${vatAmount}</th>
              </tr>
              <tr>
                <th>Grand Total   </th>
                <th className="text-right">{grandTotal}</th>
              </tr>
              <tr>
                <td>

                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" className="custom-control-input" id="defaultInline1" name="inlineDefaultRadiosExample" />
                    <label className="custom-control-label" htmlFor="defaultInline1">Cash</label>
                  </div>


                  <div className="custom-control custom-radio custom-control-inline">
                    <input type="radio" className="custom-control-input" id="defaultInline2" name="inlineDefaultRadiosExample" />
                    <label className="custom-control-label" htmlFor="defaultInline2">Card</label>
                  </div>
                </td>
                <th ></th>
              </tr>
            </table>
          </div>

          <div className="row">
            <div className="col-lg-6"><button type="button" className="btn btn-danger w-100 mb-2 p-2">Cancel</button></div>
            <div className="col-lg-6 pl-0"><button type="button" onClick={handlePlaceorder} className="btn btn-warning w-100 mb-2 p-2">Place Order</button></div>
            <div className="col-lg-6"><button type="button" onClick={handleHold} className="btn btn-danger w-100 mb-2 p-2">Hold</button></div>
            <div className="col-lg-6 pl-0"><button type="button" className="btn btn-success w-100 mb-2 p-2">Quick Pay</button></div>
          </div>
        </div>
      </div>
      <div className="col-sm-7 col-lg-8">
        <div className="tbl-h">
          <ul className="nav nav-tabs nav-justified" role="tablist">
            <li className="nav-item ">
              {/* <a className="nav-link  active" onClick={handleWaiter} data-toggle="tab" href="#waiter" role="tab" aria-controls="kiwi2" aria-selected="false">Waiter</a> */}
              <a className="nav-link  active"
                onClick={() => {
                  setSelectWaiter("")
                  setSelectCustomer("")
                  setSelectTable("")
                  setOptions("")
                  setTabEnabled({
                    dineIn: false,
                    takeaway: false,
                    delivery: false
                  })
                  setEnableDinein(false)
                  setShowCustomerTab(false)
                  setShowFoodMenuTab(false)
                }}
                data-toggle="tab" href="#waiter" role="tab" aria-controls="kiwi2" aria-selected="false">Waiter</a>
            </li>

            {
              tabEnabled.dineIn && <li className="nav-item">
                <a className="nav-link " onClick={handleDinein} data-toggle="tab" href="#dinein" role="tab" aria-controls="duck2" aria-selected="true">Dine In</a>
              </li>
            }
            {
              enableDinein && <li className="nav-item">
                <a className="nav-link " data-toggle="tab" href="#table" role="tab" aria-controls="duck2" aria-selected="true">Table</a>
              </li>
            }
            {
              tabEnabled.delivery && <li className="nav-item">
                <a className="nav-link " onClick={handleDelivery} data-toggle="tab" href="#dinein" role="tab" aria-controls="duck2" aria-selected="true">Delivery</a>
              </li>
            }

            {
              showCustomerTab && <li className="nav-item">
                <a className="nav-link " onClick={handleCustomer} data-toggle="tab" href="#customer" role="tab" aria-controls="duck2" aria-selected="true">Customer</a>
              </li>
            }
            {
              tabEnabled.takeaway && <li className="nav-item">
                <a className="nav-link " onClick={handleTakeway} data-toggle="tab" href="#dinein" role="tab" aria-controls="duck2" aria-selected="true">Take Away</a>
              </li>
            }
            {
              showFoodMenuTab && <li className="nav-item">
              <a className="nav-link "  onClick={handleMenu}  data-toggle="tab" href="#foodmenu" role="tab" aria-controls="duck2" aria-selected="true">Food Menu</a>
          </li>
            }
          </ul>
        </div>
        <div className="tab-content mt-3">
          <div className="tab-pane active" id="waiter" role="tabpanel" aria-labelledby="duck-tab">

            {/* { */}
              {/* showWaiters && */}
              <div className="row">
                {
                waiter.map((wait, index) => (
                    <div className="col-sm-3 col-md-3">
                      {/* <div className="menu-box" onClick={() => handleWaiter(wait)}> */}
                      <div
            className={`menu-box ${wait === selectWaiter ? 'selectable' : 'read-only'}`}
            onClick={() => handleWaiter(wait)}
          >
                        <h6>{wait.waitername}</h6>
                      </div>
                    </div>
                  ))}
              </div>
            {/* } */}
          </div>
          <div className="tab-pane " id="table" role="tabpanel" aria-labelledby="duck-tab">
            <div className="row">
              {
                table.map((tables, index) => (
                  <div className="col-sm-3 col-md-3">
                    <div className="menu-box" onClick={(e) => {
                      setSelectTable(tables)
                      setShowFoodMenuTab(true)
                    }}>

                      <h6>{tables.tablename}</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="tab-pane " id="customer" role="tabpanel" aria-labelledby="duck-tab">
            <div className="row">
              {
                customers.map((customer, index) => (
                  <div className="col-sm-3 col-md-3">
                    <div className="menu-box" onClick={(e) => {
                      setSelectCustomer(customer)
                      setShowFoodMenuTab(true)
                    }}>

                      <h6>{customer.customername}</h6>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="tab-pane " id="foodmenu" role="tabpanel" aria-labelledby="duck-tab">
            <div className="tbl-h">
              <div className="form-group">
              <input
               type="text"
                placeholder="Search foodmenu..."
               value={searchTerm}
              onChange={handleSearch}
              className="form-control"
              />
              </div>
              <ul className="nav nav-pills flex-columns shdw-lft " id="myTab" role="tablist">
                {distinctCategories.map((category, index) => (
                  <li className="nav-item">
                    <a
                      key={index}
                      className={`nav-item nav-link ${index === activeTab ? 'active' : ''}`}
                      onClick={() => setActiveTab(index)}
                    >
                      {category}
                    </a>
                  </li>
                ))}



              </ul>
            </div>
            <div className="tab-content p-3" id="myTabContents">

              {isLoading ? 'Loading' : <div className="row">

                {foodCategory.length > 0 &&
                  foodCategory
                    .filter(item => item.foodcategory.foodcategoryname === distinctCategories[activeTab]
                      &&
                      item.foodmenuname.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                    .map((menu, index) => (
                      <div className="col-sm-3 col-sm-3" key={index}>
                        <div className="menu-box" onClick={() => addProductToCart(menu)}>

                          <div className="menu-div">
                            {/* <img src={`/uploads/${menu.photo}`} className=" foodimg" /> */}
                            <h6 className="mt-2">{menu.foodmenuname}</h6>
                            <p>Price: {menu.salesprice}</p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>}
            </div>
          </div>


        </div>
      </div>

      <div class="modal" id="print-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Order Details</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body" id="modal-body">
     
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="print-button">Print</button>
      </div>
    </div>
  </div>
</div>
    </div>
  )


}

export default PosNewOrder;