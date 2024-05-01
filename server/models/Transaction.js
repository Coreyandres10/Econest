// Importing the mongoose library.
const mongoose = require('mongoose');

// Destructuring assignment to extract 'Schema' from 'mongoose'.
const { Schema } = mongoose;

// Extracting 'SchemaTypes' from 'mongoose.Schema.Types'.
var SchemaTypes = mongoose.Schema.Types;

// Creating a new mongoose schema called 'transactionSchema'.
const transactionSchema = mongoose.Schema({
    // Defining a field called 'Date' of type String.
    Date:{
        type:String
    },
    // Defining a field called 'Transaction_Detail' of type String.
    Transaction_Detail:{
        type:String
    },
    // Defining a field called 'Amount' of type Number.
    Amount:{
        type:Number
    },
    // Defining a field called 'Balance' of type Number.
    Balance:{
        type:Number
    },
    // Defining a field called 'Reoccuring' of type String.
    Reoccuring:{
        type:String
    },
    // Defining a field called 'type' of type String.
    // Note: 'type' is a reserved keyword in JavaScript, it's better to avoid using it as a field name.
    type:{
        type:String
    }
});

// Creating a mongoose model named 'transactionmodel'.
// This model represents a collection in the MongoDB database for transactions.
// The first argument ("transaction") is the name of the MongoDB collection where documents based on this schema will be stored.
// The second argument (transactionSchema) is the schema that defines the structure of the documents.
const transactionmodel = mongoose.model('transaction', transactionSchema);

// Exporting the 'transactionmodel' so that it can be imported and used in other parts of the application.
module.exports = transactionmodel;
