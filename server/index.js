const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EconestModel = require("./models/Econest");

const app = express();
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

app.use((err, req, res, next) => {
    console.error("Server error:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
