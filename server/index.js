// Importing necessary modules and libraries
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const fs = require('fs');
const csvmulter = require('./util/csv_handler'); // Importing multer middleware for handling CSV file uploads
const EconestModel = require("./models/Econest");
const csv = require('csvtojson');
const stockmodel = require('./models/stock');
const app = express();
const transactionmodel = require('./models/Transaction');
const stockClosePriceModel = require('./models/stockcloseprice');

// Middleware setup
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/Econest");

// CSV Upload endpoint
app.post('/uploadcsv', csvmulter.single("file"), async (req, res) => {
    try {
        // Directory path for saving uploaded CSV files
        const dirpath = path.join(__dirname, 'public', 'csv');

        // Creating directory if not exists
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, { recursive: true });
        }

        // Extracting CSV data from request buffer
        const csvData = req.file.buffer.toString();
        const destinationFilePath = path.join(dirpath, req.file.originalname);

        // Writing CSV data to file
        fs.writeFileSync(destinationFilePath, csvData);

        // Converting CSV data to JSON and saving to MongoDB
        csv().fromFile(destinationFilePath).then(async (response) => {
            response.map(async (val, i) => {
                // Extracting CSV data fields
                const transactionDetail = val['Transaction Detail'];
                const date = val.Date;
                const amount = val.Amount;
                const balance = val.Balance;
                const reoccuring = val.Reoccuring;
                const type = val.type;

                // Checking if all required fields are present
                if (transactionDetail && date && amount && balance && reoccuring && type) {
                    await transactionmodel.create({
                        Date: date,
                        Transaction_Detail: transactionDetail,
                        Amount: amount,
                        Balance: balance,
                        Reoccuring: reoccuring,
                        type: type
                    });
                }
            });
        });

        // Sending success response
        return res.status(200).json({ message: "File uploaded successfully" });
    } catch (error) {
        console.error(error.message);
        // Sending error response
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// GET DATA endpoints
// Endpoint to get transaction data
app.get('/get-transaction', async (req, res) => {
    try {
        // Fetching transaction data from MongoDB
        let response = await transactionmodel.find({});
        // Sending response
        return res.status(200).json({ response });
    } catch (error) {
        // Handling errors
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// Endpoint to get stock data
app.get('/get-stocks', async (req, res) => {
    try {
        // Fetching stock data from MongoDB
        let response = await stockmodel.find({});
        // Sending response
        return res.status(200).json({ response });
    } catch (error) {
        // Handling errors
        res.status(500).json({ error: "Server error. Please try again later." });
    }
});

// Endpoint to get stock close prices
app.get('/get-stock-close-prices', async (req, res) => {
    try {
        // Fetching stock close prices data from MongoDB
        const stockClosePrices = await stockClosePriceModel.find();
        // Sending response
        return res.status(200).json(stockClosePrices);
    } catch (error) {
        // Handling errors
        console.error("Error fetching stock close prices:", error); // Log error
        return res.status(500).json({ error: 'Server error. Please try again later.' });
    }
});

// INCOME endpoints
// Endpoint to insert income
app.post('/insert-income', async (req, res) => {
    try {
        // Extracting data from request body
        let { amount, source, category } = req.body;
        // Creating new income transaction
        await transactionmodel.create({
            type: category,
            Amount: amount,
            Transaction_Detail: source + ' ',
        });
        // Sending success response
        return res.status(200).json({ message: "success" });
    } catch (e) {
        console.log(e.message);
        // Sending error response
        return res.status(500).json({ error: "Server error please try later" });
    }
});
// ...other INCOME endpoints...

// EXPENSES endpoints
// ...EXPENSES endpoints...

// STOCK endpoints
// Endpoint to insert stock
app.post('/insert-stock', async (req, res) => {
    try {
        // Extracting data from request body
        let { stock_symbol, buy_price, buy_date, shares } = req.body;
        // Creating new stock entry
        let response = await stockmodel.create({
            stock_symbol,
            buy_price,
            buy_date,
            shares
        });
        // Sending success response
        return res.status(200).json({ response });
    } catch (e) {
        console.log(e.message);
        // Sending error response
        return res.status(500).json({ error: "Server error please try later" });
    }
});
// ...other STOCK endpoints...

// Testing connection middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
});

// Start server
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

