// Importing the mongoose library.
const mongoose = require('mongoose');

// Destructuring assignment to extract 'Schema' from 'mongoose'.
const { Schema } = mongoose;

// Extracting 'SchemaTypes' from 'mongoose.Schema.Types'.
var SchemaTypes = mongoose.Schema.Types;

// Creating a new mongoose schema called 'stockClosePriceSchema'.
const stockClosePriceSchema = new mongoose.Schema({
    // Defining a field called 'stock_symbol' of type String.
    // It's marked as required, meaning it must be provided when creating a new document.
    stock_symbol: { 
        type: String, 
        required: true 
    },
    // Defining a field called 'buy_price' of type Number.
    // It's marked as required, meaning it must be provided when creating a new document.
    buy_price:{
        type:Number,
        required:true
    },
    // Defining a field called 'buy_date' of type Date.
    // It's marked as required, meaning it must be provided when creating a new document.
    buy_date:{
        type:Date,
        required:true
    },
    // Defining a field called 'shares' of type Number.
    // It's marked as required, meaning it must be provided when creating a new document.
    shares:{
        type:Number,
        required:true
    },
    // Defining a field called 'previousClose' of type Number.
    // It's marked as required, meaning it must be provided when creating a new document.
    previousClose: { 
        type: Number, 
        required: true 
    },
});

// Creating a mongoose model named 'stockClosePricemodel'.
// This model represents a collection in the MongoDB database for stock close prices.
// The first argument ("stockClosePrice") is the name of the MongoDB collection where documents based on this schema will be stored.
// The second argument (stockClosePriceSchema) is the schema that defines the structure of the documents.
const stockClosePricemodel = mongoose.model('stockClosePrice', stockClosePriceSchema);

// Exporting the 'stockClosePricemodel' so that it can be imported and used in other parts of the application.
module.exports = stockClosePricemodel;
