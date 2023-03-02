const {body} = require('express-validator');
//middleware to validate user inputs
const isValid = (type) => {
    switch(type){
        case 'createUser':
            return [
                body('firstName','First Name is required.').exists(),
                body('lastName','Last Name is required.').exists(),
                body('email','Email is required and must be in form (xyz@zbc.com).').exists().isEmail(),
                body('password','Password is required.').exists().isLength({min:6,max:12}),
                body('cnfPassword','Password and confirm does not match.').custom((value,{req}) => {
                    if((value !== req.body.password)){
                        throw new Error('Password confirmation does not match password');
                    }
                    return true;
                }),
                body('role','Role is required and must be either Admin or User').exists().isIn(['Admin','User'])
            ];
        //Checking inputs while login
        case 'authenticateUser':
            return [
                body('email','Email is required and must be in form (xyz@zbc.com).').exists().isEmail(),
                body('password','Password is required.').exists().isLength({min:6,max:12}),
            ];
    }
}

module.exports = {isValid};