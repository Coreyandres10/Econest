const mongoose=require('mongoose')

const stockSchema=mongoose.Schema({
    stock_symbol:{
        type:String,
        required:true
    },
    buy_price:{
        type:Number,
        required:true
    },
    shares:{
        type:String,
        required:true
    }
})

const stockmodel=mongoose.model('stock',stockSchema)
module.exports=stockmodel