const mongoose=require('mongoose')


const incomeSchema=mongoose.Schema({
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

const incomeemodel=mongoose.model('income',incomeSchema)
module.exports=incomeemodel