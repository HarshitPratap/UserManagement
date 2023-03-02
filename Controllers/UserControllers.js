const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

const createUser = async (req,res) => {
    try {
        //checking for validation failed
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors : errors.array()});
            return;
        }
        const {firstName,middleName,lastName,email,password,role,department} = req.body;
        //checking user can't create Admin
        if (role === 'Admin' && req.payload.role === 'User') {
            res.status(400).json({
                status:false,
                message:"You are signedIn as user and you don't have permission to create admin."
            });
            return;    
        }
        //checking is user exist with this email or not
        const isUser = await User.findOne({email});
        if (isUser) {
            res.status(400).json({
                status:false,
                message:"User already exist with email."
            });
            return;      
        }
        //creating hashed password
        const hashedPassword = await bcrypt.hash(password,10);
        //creating user
        const user = await User.create({
            firstName,
            middleName,
            lastName,
            email,
            password:hashedPassword,
            role,
            department
        });
        //checking user created or not
        if(user)
            res.status(200).json({
                status:true,
                user
            });
        else
            res.status(400).json({
                status:false,
                message:"Something went wrong."
            });  
    } catch (error) {
        console.log(error);
    }
}

module.exports = {createUser};