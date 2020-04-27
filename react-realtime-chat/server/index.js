const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        if(error) return callback(error);

        // For the user who has newly joined the chat room
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        
        // For all the other users who are already in that room
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});

        socket.join(user.room);

        // After joining, the user should know who all are there in that chat room
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        callback();
    })

    // When a user sends a message in the chat room.
    socket.on('sendMessage', (message, callback) => {
        console.log('socket id', socket.id);
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        callback();
    })
    
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.`});
        }
    })
})


app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));