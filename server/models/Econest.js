// Importing the mongoose library, which is used for MongoDB object modeling designed to work in an asynchronous environment.
const mongoose = require('mongoose')

// Creating a new mongoose schema called 'EconestSchema'.
// This schema defines the structure of documents (or records) in the MongoDB collection.
const EconestSchema = new mongoose.Schema({
    // Defining a field called 'name' of type String.
    name: String,
    // Defining a field called 'email' of type String.
    email: String,
    // Defining a field called 'password' of type String.
    password: String
})

// Creating a mongoose model named 'EconestModel'.
// This model represents a collection in the MongoDB database.
// The first argument ("customers") is the name of the MongoDB collection where documents based on this schema will be stored.
// The second argument (EconestSchema) is the schema that defines the structure of the documents.
const EconestModel = mongoose.model("customers", EconestSchema)

// Exporting the 'EconestModel' so that it can be imported and used in other parts of the application.
module.exports = EconestModel
