const express =require('express');
const bodyParser = require('body-parser');
const dbConnect = require('./config/dbConnect');
const app =express();
const dotenv =require('dotenv').config();
const cors =require('cors');
const morgan =require('morgan');
const cookieParser =require('cookie-parser');
//const bodyParser = require("body-parser");

//Routes

const authRouter =require('./routes/authRoutes');
const categoryRouter =require('./routes/categoryRoutes');
const ingunitRouter =require('./routes/ingredientunitRoutes');
const ingredientRouter =require('./routes/ingredientRoutes');
const vatRouter =require('./routes/vatRoutes');
const tableRouter =require('./routes/tableRoutes');
const foodcategoryRouter =require('./routes/foodcategoryRoutes');
const foodmenuRouter =require('./routes/foodmenuRoutes');
const waiterRouter =require('./routes/waiterRoutes');
const posRouter =require('./routes/posRoutes');
const customerRouter =require('./routes/customerRoutes');
const deliveryRouter =require('./routes/deliveryRoutes');
const supplierRouter =require('./routes/supplierRoutes');
const purchaseRouter =require('./routes/purchaseRoutes');
//const posRouter =require('./routes/posRoutes');

const PORT =process.env.PORT || 4000;
dbConnect();
app.use(cors());
const corsOptions = {
    origin: 'https://restaurant-app-frontend-ten.vercel.app',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  
  app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/api/user',authRouter);
app.use('/api/category',categoryRouter);
app.use('/api/ingunit',ingunitRouter);
app.use('/api/ingredient',ingredientRouter);
app.use('/api/vat',vatRouter);
app.use('/api/table',tableRouter);
app.use('/api/foodcategory',foodcategoryRouter);
app.use('/api/foodmenu',foodmenuRouter);
app.use('/api/waiter',waiterRouter);
app.use('/api/pos',posRouter);
app.use('/api/customer',customerRouter);
app.use('/api/delivery',deliveryRouter);
app.use('/api/supplier',supplierRouter);
app.use('/api/purchase',purchaseRouter);
app.use('/',(req,res) =>{
    res.send("Hellow From Server Side");
});
app.use(cookieParser());



app.listen(PORT, () => {
    console.log(`Server is running  at PORTs ${PORT}`);
  });
  
