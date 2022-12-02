const { register, login, profilePhoto, getAllUsers } = require('../Controllers/usersController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/profilephoto', profilePhoto);

router.get('/allusers/:id', getAllUsers)
module.exports = router;