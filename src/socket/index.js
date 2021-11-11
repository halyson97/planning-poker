const uuid = require('uuid');

const state = {
    users: [],
    rooms: {},
    messages: [],
    numUsers: 0,
};

let timeoutClearRooms;

const getMessages = require('./messages');


module.exports = function(socket, io) {

    const schedulerCloseEmptyRooms = () => {
        clearTimeout(timeoutClearRooms);
        setTimeout(() => {
            const rooms = Object.keys(state.rooms);
            for (let i = 0; i < rooms.length; i++) {
                const room = rooms[i];
                if (state.rooms[room].length === 0) {
                    delete state.rooms[room];
                }
            }
        }, 300000);

    };

    const disconnect = () => {
        const room = state.rooms[socket.roomId];
        if (room) {
            room.users = room.users.filter(socketUser => socketUser.user.id !== socket.user.id);
            for (let user of room.users) {
                user.emit('user-left', room.users.map(socketUser => socketUser.user));
            }
        }

        schedulerCloseEmptyRooms();
    };

    let addedUser = false;

    socket.on('create-room', (user) => {
        const roomId = uuid.v4();
        state.rooms[roomId] = {
            id: roomId,
            users: [],
            messages: [],
            admin: user,
            isPlayer: true,
        };
        socket.emit('room-created', roomId);
    });

    socket.on('join-room', ({roomId, user}) => {
        if (addedUser) return;
        socket.user = user;
        socket.roomId = roomId;
        const room = state.rooms[roomId];
        if (room) {
            room.users.push(socket);
            for (let user of room.users) {
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });

    socket.on('disconnect', disconnect);

    socket.on('user-left', disconnect);

    socket.on('change-is-player', (isPlayer) => {
        const room = state.rooms[socket.roomId];
        if (room) {
            room.users = room.users.map(socketUser => {
                if (socketUser.user.id === socket.user.id) {
                    socketUser.user.isPlayer = isPlayer;
                    return socketUser;
                }
                return socketUser;
            })
            for (let user of room.users) {
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });

    socket.on('user-vote', ({ roomId, value }) => {
        const room = state.rooms[roomId];
        if (room) {
            room.users = room.users.map(socketUser => {
                if (socketUser.user.id === socket.user.id) {
                    socketUser.user.card = value;
                    return socketUser;
                }
                return socketUser;
            })
            for (let user of room.users) {
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });

    socket.on('clear', ({ roomId }) => {
        const room = state.rooms[roomId];
        if (room) {
            room.users = room.users.map(socketUser => {
                socketUser.user.card = null;
                socketUser.user.message = '';
                return socketUser;
            })
            for (let user of room.users) {
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                user.emit('clear');
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });

    socket.on('show', ({ roomId, user }) => {
        const room = state.rooms[roomId];
        if (room) {
            room.users = room.users.map(socketUser => {
                if (socketUser.user.id === socket.user.id) {
                    const messages = getMessages(user.username);
                    const message = messages[Math.floor(Math.random()*messages.length)];
                    socketUser.user.message = message;
                    return socketUser;
                }
                return socketUser;
            })
            for (let user of room.users) {
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                user.emit('show');
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });

    socket.on('send-message', ({ roomId, message }) =>{
        const room = state.rooms[roomId];
        if (room) {
            room.messages.push({
                user: socket.user.username,
                text: message,
                id: socket.user.id,
                date: new Date(),
            });
            for (let user of room.users) {
                user.emit('messages', room.messages);
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });
}