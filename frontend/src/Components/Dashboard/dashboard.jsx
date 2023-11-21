import React from 'react'
import { useState,useEffect } from 'react'
import Header from '../layouts/Header';
import Sidebar from '../layouts/Sidebar';
import Footer from '../layouts/Footer';
import axios from 'axios'
import { redirect, useNavigate,useParams } from "react-router-dom";
import apiConfig from '../layouts/base_url';
const Dashboard =() =>{

    const [suc,setSuc] =useState()
   
    useEffect(() =>{

        axios.get(`${apiConfig.baseURL}/api/user/dashboard`)
        .then(result => {
            if(result.data)
            {
                  
            }

        })
        .catch(err =>console.log(err))
        
    },[])

    return (
        <div className="container-scroller">
        <Header />
        <div className="container-fluid page-body-wrapper">
            <Sidebar />
            <div className="main-panel">
                  <div className="content-wrapper">
                        <h1>Dashboard</h1>
                    </div>
                    <Footer />
            </div>
        </div>
    </div>
    )
}

export default Dashboard;