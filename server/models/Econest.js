const mongoose = require('mongoose')

const EconestSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const EconestModel = mongoose.model("customers", EconestSchema)
module.exports = EconestModel