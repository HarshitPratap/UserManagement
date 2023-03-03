const router = require('express').Router();

const {isValid} = require('../middlewares/validateInput')
const {validateToken} = require('../middlewares/validateToken')

const {createUser,viewUsers,viewUser,viewUsersFields,updateUser} = require('../Controllers/UserControllers');


router.post('/createUser',
    isValid('createUser'),
    validateToken,
    createUser
);

router.get('/viewUsers',
    validateToken,
    viewUsers
);

router.get('/viewUser/:id',
    validateToken,
    viewUser
);

router.get('/viewUsers/:fields',
    validateToken,
    viewUsersFields
);

router.put('/:id',
    validateToken,
    updateUser
);

module.exports = router;

