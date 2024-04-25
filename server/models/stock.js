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
    buy_date:{
        type:Date,
        required:true
    },
    shares:{
        type:Number,
        required:true
    }
})

const stockmodel=mongoose.model('stock',stockSchema)
module.exports=stockmodel