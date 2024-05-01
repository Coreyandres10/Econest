// Importing the multer library, which is used for handling multipart/form-data.
const multer = require('multer');

// Creating a memory storage engine for multer.
// This stores the uploaded file in memory as a Buffer object.
const memoryStorage = multer.memoryStorage();

// Defining a function called 'filefilter' to filter uploaded files.
// This function is used to filter out non-CSV files.
const filefilter = (req, file, cb) => {
    // Logging the uploaded file details to the console.
    console.log(file);
    
    // Checking if the uploaded file has a .csv extension.
    if (file.originalname.endsWith('.csv')) {
        // If it's a CSV file, accept it by calling the callback with no error and 'true'.
        cb(null, true);
    } else {
        // If it's not a CSV file, reject it by calling the callback with an error and 'false'.
        cb({
            message: "File uploaded is not a csv file"
        }, false);
    }
}

// Creating a multer middleware called 'csvmulter'.
// This middleware handles file uploads, using the memory storage engine and the file filter function.
const csvmulter = multer({
    storage: memoryStorage,
    fileFilter: filefilter
});

// Exporting the 'csvmulter' middleware so that it can be used in other parts of the application.
module.exports = csvmulter;
