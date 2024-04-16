const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path=require('path')
const fs=require('fs')
const csvmulter=require('./util/csv_handler')
const expensemodel=require('./models/Expense')
const EconestModel = require("./models/Econest");
const incomemodel=require('./models/Income')
const csv=require('csvtojson')
const stockmodel=require('./models/stock')
const app = express();
const transactionmodel=require('./models/Transaction')
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/Econest");

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    EconestModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.status(200).json({ status: "success", message: "Login successful" });
                } else {
                    res.status(401).json({ status: "error", message: "Incorrect password" });
                }
            } else {
                res.status(404).json({ status: "error", message: "User not found" });
            }
        })
        .catch(err => {
            console.error("Login error:", err);
            res.status(500).json({ status: "error", message: "An error occurred while logging in" });
        });
});

app.post('/register', (req, res) => {
    EconestModel.create(req.body)
        .then(customers => res.status(201).json(customers))
        .catch(err => res.status(500).json({ status: "error", message: err.message }));
});
app.post('/uploadcsv', csvmulter.single("file"), async (req, res) => {
    try {
        const dirpath = path.join(__dirname, 'public', 'csv'); 

      
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, { recursive: true });
        }

        const csvData = req.file.buffer.toString(); 
        const destinationFilePath = path.join(dirpath, req.file.originalname);

        fs.writeFileSync(destinationFilePath, csvData);
csv().fromFile(destinationFilePath).then(async(response)=>{
  response.map(async(val,i)=>{
    const transactionDetail = val['Transaction Detail'];
    const date=val.Date
    const amount=val.Amount;
    const balance=val.Balance;
    const reoccuring=val.Reoccuring
    const type=val.type
if(transactionDetail && date && amount && balance && reoccuring && type){
    console.log(type)
    console.log(balance)
    console.log(amount)
await transactionmodel.create({
    Date:date,
    Transaction_Detail:transactionDetail,
    Amount:amount,
    Balance:balance,
    Reoccuring:reoccuring,
    type:type
})
}
  })
  
})
      return  res.status(200).json({
            message: "File uploaded successfully"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Server error. Please try again later."
        });
    }
});

app.get('/get-transaction',async(req,res)=>{
    try{
let response=await transactionmodel.find({})
return res.status(200).json({
    response
})

    }catch(error){
        res.status(500).json({
            error: "Server error. Please try again later."
        });
    }
})

app.post('/insert-stock',async(req,res)=>{
    let { stock_symbol,buy_price,shares}=req.body;
    try{
        let response=await stockmodel.create({
stock_symbol,
buy_price,
shares

        })
        return res.status(200).json({
            response
        })
    }catch(e){
        console.log(e.message)
        return res.status(40).json(
          {
            error:"Server error please try later"
          }
        )
    }
})

app.post('/insert-expense',async(req,res)=>{

    try{
let {amount,source,category}=req.body;
await transactionmodel.create({
  type:category,
  Amount:amount,
  Transaction_Detail:source+' ',
})
return res.status(200).json({
    message:"sucess"
})
    }catch(e){
        console.log(e.message)
        return res.status(40).json(
          {
            error:"Server error please try later"
          }
        )
    }
})





app.post('/insert-income',async(req,res)=>{
console.log("HI")
    try{
let {amount,source,category}=req.body;
await transactionmodel.create({
    type:category,
    Amount:amount,
    Transaction_Detail:source+' ',
  })
return res.status(200).json({
    message:"sucess"
})
    }catch(e){
        console.log(e.message)
        return res.status(40).json(
          {
            error:"Server error please try later"
          }
        )
    }
})


app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
