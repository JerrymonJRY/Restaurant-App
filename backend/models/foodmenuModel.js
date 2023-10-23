const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var foodmenuSchema = new mongoose.Schema({
    foodmenuname:{
        type:String,
      
        index:true,

       
    },
    foodcategoryId:{
    
            type:String,
            ref: "Foodcategory",
          
    
    },

foodingredientId: [String],
   
    salesprice:{
        type:String,
      
    },
    vatId:{
        type: String,
        ref: "Vat",
    },
    description:
    {
        type:String,
        
    },
    vegitem:{
        type:String,
    },
    beverage:{
        type:String,
    },
    bar:{
        type:String,
    },
    photo:{
        type:String,
       
    }
    
});

//Export the model
module.exports = mongoose.model('Foodmenu', foodmenuSchema);