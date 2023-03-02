const router = require('express').Router();
const {isValid} = require('../middlewares/validateInput')
const {authenticateUser} = require('../Controllers/AuthController');


router.post('/login',
    isValid('authenticateUser'),
    authenticateUser
);

module.exports = router;

