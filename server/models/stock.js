// Importing the mongoose library, which is used for MongoDB object modeling designed to work in an asynchronous environment.
const mongoose = require('mongoose')

// Creating a new mongoose schema called 'stockSchema'.
// This schema defines the structure of documents (or records) in the MongoDB collection for stocks.
const stockSchema = mongoose.Schema({
    // Defining a field called 'stock_symbol' of type String.
    // It's marked as required, meaning it must be provided when creating a new document.
    stock_symbol: {
        type: String,
        required: true
    },
    // Defining a field called 'buy_price' of type Number.
    // It's marked as required, meaning it must be provided when creating a new document.
    buy_price: {
        type: Number,
        required: true
    },
    // Defining a field called 'buy_date' of type Date.
    // It's marked as required, meaning it must be provided when creating a new document.
    buy_date: {
        type: Date,
        required: true
    },
    // Defining a field called 'shares' of type Number.
    // It's marked as required, meaning it must be provided when creating a new document.
    shares: {
        type: Number,
        required: true
    }
})

// Creating a mongoose model named 'stockmodel'.
// This model represents a collection in the MongoDB database for stocks.
// The first argument ("stock") is the name of the MongoDB collection where documents based on this schema will be stored.
// The second argument (stockSchema) is the schema that defines the structure of the documents.
const stockmodel = mongoose.model('stock', stockSchema)

// Exporting the 'stockmodel' so that it can be imported and used in other parts of the application.
module.exports = stockmodel
