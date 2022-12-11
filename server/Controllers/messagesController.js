// const Messages = require('../Model/messageModel')
const Messages = require('../Model/messageModel')
module.exports.addMessage = async (req, res, next) => {
    try {
        const {from, to, message} = req.body;
        const data = await Messages.create({
            message: {
                text: message,
            },
            sender: from,
            users: [from, to]
        })
        if(data) {
            return res.json({msg: 'Message added successfully'})
        }else {
            return res.json({msg: 'Message could not be sent'})
        }
    } catch (err) {
        next(err)
    }
};


module.exports.getAllMessages = async (req, res, next) => {
    try {
        const {from: sender, to} = req.body;
        const messages = await Messages.find({
            users: {
                $all: [sender.toString(),to.toString()],
            },
        }).sort({updatedAt: 1});
        
        const projectedMessages = messages.map(msg => {
            return {
                fromSelf: msg.sender.toString() === sender,
                message: msg.message.text,
                time: msg.createdAt
            };
        });

        return res.json(projectedMessages);
    } catch (err) {
        next(err);
    }
}