const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const authenticateUser = async (req,res) => {
    try {
        //checking for validation failed
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(422).json({errors : errors.array()});
            return;
        }
        //checking is user exist with this email or not
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            res.status(401).json({
                status:false,
                message:"User doesn't exits."
            });
            return; 
        }
        //comparing passwords
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            res.status(401).json({
                status:false,
                message:"Password incorrect."
            });
            return;
        }
        //creating payload for tokens
        const payload = {
            id:user._id,
            email:user.email,
            role:user.role
        }
        //creating and sending tokens
        const token = jwt.sign(payload,process.env.SECRET,{expiresIn:"1d"});
        res.status(200).json({
            status:true,
            token:`Bearer ${token}`
        });   
    } catch (error) {
        console.log(error);
    }
}

module.exports = { authenticateUser }