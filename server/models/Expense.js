const mongoose=require('mongoose')

const expenseSchema=mongoose.Schema({
    amount:{
        type:Number,
        required:['Please also give amount',true]
    },

    source:{
        type:String,
        required:['Please add source',true]
    },
    category:{
        type:String,
        required:['Please add category']
    }
})

const expensemodel=mongoose.model('expense',expenseSchema)
module.exports=expensemodel