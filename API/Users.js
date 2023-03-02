const router = require('express').Router();

const {isValid} = require('../middlewares/validateInput')
const {validateToken} = require('../middlewares/validateToken')

const {createUser} = require('../Controllers/UserControllers');


router.post('/createUser',
    isValid('createUser'),
    validateToken,
    createUser
);

module.exports = router;

