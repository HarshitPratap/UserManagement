//importing required library
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Users = require("./API/Users");
const Authenticate = require('./API/Auth');


//creating server instance
const app = express();

//making connection
mongoose.connect(process.env.URI);

//request from form
app.use(express.urlencoded({extended:true}));

//for reuest as json
app.use(express.json());

//creating endpoints
app.use("/api/user",Users);
app.use("/api/auth",Authenticate)

//invoking server at port 5000
app.listen(process.env.PORT, () => {
    console.log("Server is up and running at "+ process.env.PORT);
});