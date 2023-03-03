const router = require('express').Router();

const {isValid} = require('../middlewares/validateInput')
const {validateToken} = require('../middlewares/validateToken')

const {createUser,viewUsers,viewUsersFields} = require('../Controllers/UserControllers');


router.post('/createUser',
    isValid('createUser'),
    validateToken,
    createUser
);

router.get('/viewUsers',
    validateToken,
    viewUsers
);

router.get('/viewUsers/:fields',
    validateToken,
    viewUsersFields
);

module.exports = router;

