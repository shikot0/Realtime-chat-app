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

module.exports.setProfilePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: id})
        const {data, mimetype} = req.files.fileupload;
        user.profilePicture.Data = data;
        user.profilePicture.ContentType = mimetype;
        user.isProfilePictureSet = true; 

        await user.save();
        return res.json({status: true, user})
    } catch(err) {
        next(err)
    }
}

module.exports.getProfilePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({_id: id}); 
        res.type('Content-Type', user.profilePicture.ContentType)
        return res.status(200).send(user.profilePicture.Data)
    } catch(err) {
        next(err)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "email",
            "username", 
            "_id",
        ])
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