const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["Admin","User"]
    },
    department:String,
},
{
    timestamps:true
});

module.exports = mongoose.model("Users",User);