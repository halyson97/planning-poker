const uuid = require('uuid');

const state = {
    users: [],
    rooms: {},
    messages: [],
    numUsers: 0,
};

let timeoutClearRooms;

const getMessages = require('./messages');


const homeController = function(socket, io) {
    console.log('homeController');

    socket.on('create-room', (user) => {
        console.log('create-room', user);
        const roomId = uuid.v4();
        state.rooms[roomId] = {
            id: roomId,
            users: [],
            messages: [],
        };
        console.log('room-created', roomId);
        socket.emit('room-created', roomId);
    });
}

const roomController = function(socket, io) {
    console.log('aquiiiiiiiiiii');

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
        }, 30000);

    };

    const disconnect = () => {
        console.log('disconnect')
        const room = state.rooms[socket.roomId];
        if (room) {
            room.users = room.users.filter(socketUser => socketUser.user.id !== socket.user.id);
            for (let user of room.users) {
                console.log('user-left', room.users.map(socketUser => socketUser.user));
                user.emit('user-left', room.users.map(socketUser => socketUser.user));
            }
        }

        schedulerCloseEmptyRooms();
    };

    socket.on('join-room', ({roomId, user}) => {
        console.log('join-room', roomId, user); 
        socket.user = user;
        socket.roomId = roomId;
        const room = state.rooms[roomId];
        if (room) {
            room.users.push(socket);
            for (let user of room.users) {
                console.log('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
            }
        } else {
            console.log('room-not-found'); 
            socket.emit('room-not-found'); 
        }
    });

    socket.on('disconnect', disconnect);

    socket.on('user-left', disconnect);

    socket.on('change-is-player', (isPlayer) => {
        console.log('change-is-player', isPlayer);
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
                console.log('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
            }
        } else {
            console.log('room-not-found'); 
            socket.emit('room-not-found'); 
        }
    });

    socket.on('user-vote', ({ roomId, value }) => {
        console.log('user-vote', roomId, value);
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
                console.log('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
            }
        } else {
            console.log('room-not-found');
            socket.emit('room-not-found'); 
        }
    });

    socket.on('clear', ({ roomId }) => {
        console.log('clear', roomId);
        const room = state.rooms[roomId];
        if (room) {
            room.users = room.users.map(socketUser => {
                socketUser.user.card = null;
                socketUser.user.message = '';
                return socketUser;
            })
            for (let user of room.users) {
                console.log('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                console.log('clear');
                user.emit('clear');
            }
        } else {
            console.log('room-not-found'); 
            socket.emit('room-not-found'); 
        }
    });

    socket.on('show', ({ roomId, user }) => {
        console.log('show', roomId, user);
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
                console.log('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                console.log('show');
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                });
                user.emit('show');
            }
        } else {
            console.log('room-not-found');
            socket.emit('room-not-found'); 
        }
    });

    socket.on('send-message', ({ roomId, message }) =>{
        console.log('send-message', roomId, message);
        const room = state.rooms[roomId];
        if (room) {
            room.messages.push({
                user: socket.user.username,
                text: message,
                id: socket.user.id,
                date: new Date(),
            });
            for (let user of room.users) {
                console.log('messages', room.messages);
                user.emit('messages', room.messages);
            }
        } else {
            console.log('room-not-found');
            socket.emit('room-not-found'); 
        }
    });
}

module.exports = {
    homeController,
    roomController,
};
