import React from "react";
import { useState,useEffect } from "react";
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { redirect, useNavigate,Link } from "react-router-dom";
import PosTable from "./posTable";
import PosRunningOrder from "./posRunningorder";
import Swal from 'sweetalert2';
import PosNewOrder from "./posNeworder";
import PosHoldingOrder from "./posHoldingorder";
import PosTodayOrder from "./posTodayorder";


const Pos =() =>{

    const showSweetAlert = () => {
        Swal.fire({
          title: 'Hello, SweetAlert2!',
          text: 'This is a SweetAlert2 popup in a React component.',
          icon: 'success',
        });
      };

      
    return (
     
            <div className="container-fluid">
                    <div className="division">
                    <div className="row">
                        <div className="col-md-2">
                        <div className="w-100 d-inline-block text-center pb-4"><img src="assets/images/pos/vertics-logo.png" className="img-fluid" /> </div>
                        </div>
                        <div className="col-md-10 main-content">
                        <div className="">
                    <ul className="nav nav-tabs nav-justified" role="tablist">
                    <li className="nav-item ">
                            <a className="nav-link  active" data-toggle="tab" href="#neworder" role="tab" aria-controls="kiwi2" aria-selected="false">New Order</a>
                        </li>    
                        <li className="nav-item">
                            <a className="nav-link " data-toggle="tab" href="#runningorder" role="tab" aria-controls="duck2" aria-selected="true">Running Order</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#holdingorder" role="tab" aria-controls="chicken2" aria-selected="false">Holding Order</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#todayorder" role="tab" aria-controls="kiwi2" aria-selected="false">Today Order</a>
                        </li>
                     
                        <li className="nav-item">
                        <a href="#"><img src="assets/images/pos/login.png" /></a>
                        </li>
                                       
                    </ul>
                </div>
                        </div>
                 
                     
                    </div>
               </div>
               <div className="row">
                     <div className="tab-content mt-3">
                          <div className="tab-pane active" id="neworder" role="tabpanel" aria-labelledby="duck-tab">
                               <PosNewOrder />

                            </div>

                            <div className="tab-pane " id="runningorder" role="tabpanel" aria-labelledby="duck-tab">
                            <PosRunningOrder />

                            </div>

                            <div className="tab-pane " id="holdingorder" role="tabpanel" aria-labelledby="duck-tab">
                                <PosHoldingOrder />

                            </div>

                            
                            <div className="tab-pane " id="todayorder" role="tabpanel" aria-labelledby="duck-tab">
                           <PosTodayOrder />

                            </div>

                    </div>
               </div>
            </div>
   
    )


}

export default Pos;