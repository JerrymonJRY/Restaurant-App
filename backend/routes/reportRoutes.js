const express =require('express');
const router =express.Router();

const {deliveryReport} =require('../controller/reportController');


router:get('/deliveryreport',deliveryReport);


module.exports =router;