const mongoose=require('mongoose')
const { Schema } = mongoose;
var SchemaTypes = mongoose.Schema.Types;

const transactionSchema=mongoose.Schema({
    Date:{
        type:String
    },
    Transaction_Detail:{
        type:String
    },
    Amount:{
        type:Number
    },
    Balance:{
        type:Number
    },
    Reoccuring:{
        type:String
    },
    type:{
        type:String
    }
})

const transactionmodel=mongoose.model('transaction',transactionSchema)

module.exports=transactionmodel
