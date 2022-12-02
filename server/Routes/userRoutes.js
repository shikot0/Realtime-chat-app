const { register, login, getAllUsers } = require('../Controllers/usersController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);

router.get('/allusers/:id', getAllUsers)
module.exports = router;