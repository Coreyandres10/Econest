const mongoose = require('mongoose');
const { Schema } = mongoose;
var SchemaTypes = mongoose.Schema.Types;

const stockClosePriceSchema = new mongoose.Schema({
stock_symbol: { 
    type: String, 
    required: true 
},
buy_price:{
    type:Number,
    required:true
},
buy_date:{
    type:Date,
    required:true
},
shares:{
    type:Number,
    required:true
},
previousClose: { 
    type: Number, 
    required: true 
},
});

const stockClosePricemodel = mongoose.model('stockClosePrice', stockClosePriceSchema);
module.exports=stockClosePricemodel