const { register, login, setProfilePicture, getAllUsers } = require('../Controllers/usersController');

const router = require('express').Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setprofilepicture/:id', setProfilePicture);

router.get('/allusers/:id', getAllUsers)
module.exports = router;