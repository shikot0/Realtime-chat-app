const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/messageRoutes');
const socket = require('socket.io');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)
 
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log(`DB is running at ${process.env.MONGO_URL}`)
}).catch(err => {
    console.log(`There was an error, details: ${err}`)
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

const io = socket(server, {
    cors: {
        origin: 'http://localhost:3000',
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on('connection', socket => {
    global.chatSocket = socket;
    socket.on('add-user', userId => {
        onlineUsers.set(userId, socket.id)
    });

    socket.on('send-msg', data => {
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-receive', data.message)
        }
    })
})