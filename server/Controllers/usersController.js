const User = require('../Model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username});
        const emailCheck = await User.findOne({email})
        if(usernameCheck) {
            return res.json({msg: 'Username is already in use', status: false});
        }
        if(emailCheck) {
            return res.json({msg: 'Email is already in use', status: false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({status: true, user})
    } catch(err) {
        next(err)
    } 
} 


module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user) { 
            // console.log('failure') 
            return res.json({msg: 'Incorrect username or password', status: false});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.json({msg: 'Incorrect username or password', status: false});
        }
        delete user.password;

        return res.json({status: true, user})
    } catch(err) {
        next(err)
    }
}  

module.exports.profilePhoto = async (req, res, next) => {
    
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username", 
            "avatarImage",
            "_id",
        ])
        // console.log('test') 
        if(users) {
            return res.json(users);
        }else {
            return res.json('There are no others online')
        }
    }
    catch(err) {
        next(err)
    }
}