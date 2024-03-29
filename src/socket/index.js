const uuid = require('uuid');

const TYPE_GAME = {
    default: 'DEFAULT',
    fibonacci: 'FIBONACCI',
};

const state = {
    users: [],
    rooms: {},
    messages: [],
    numUsers: 0,
};

let timeoutClearRooms;

const getMessages = require('./messages');

const roomControler = function(socket, io){

    const schedulerCloseEmptyRooms = () => {
        clearTimeout(timeoutClearRooms);
        setTimeout(() => {
            const rooms = Object.keys(state.rooms);
            for (let i = 0; i < rooms.length; i++) {
                const room = rooms[i];
                if (state.rooms[room].users.length === 0) {
                    delete state.rooms[room];
                }
            }
            socket.broadcast.emit('rooms', getRooms());
        }, 30000);

    };

    const disconnect = () => {
        const room = state.rooms[socket.roomId];
        if (room) {
            room.users = room.users.filter(socketUser => socketUser.user.id !== socket.user.id);
            for (let user of room.users) {
                user.emit('user-left', room.users.map(socketUser => socketUser.user));
            }
            socket.broadcast.emit('rooms', getRooms());
        }

        schedulerCloseEmptyRooms();
    };

    const generateCode = (lenght) => {
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        for (let i = 0; i < lenght; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    };

    const getRooms = () => {
        const rooms = Object.keys(state.rooms).map(id => {
            const item = state.rooms[id];
            return {
                id: item.id,
                code: item.code,
                users: item.users.length,
                typeGame: item.typeGame,
            }
        });

        return rooms;
    }

    socket.on('create-room', ({ typeGame }) => {
        const roomId = uuid.v4();
        state.rooms[roomId] = {
            id: roomId,
            code: generateCode(6),
            users: [],
            messages: [],
            isPlayer: true,
            typeGame: typeGame || TYPE_GAME.default,
        };
        socket.emit('room-created', roomId);
        socket.broadcast.emit('rooms', getRooms());
    });

    socket.on('verify-connect', ({ id }) => {
        for(const user of state.users){
            if(user.id === id){
                user.emit('is-disconnected');
            }
        }

        state.users = state.users.filter(user => user.id !== id);

        socket.id = id;
        state.users.push(socket);
        socket.emit('is-connected');
    })

    socket.on('on-disconnect', (id) => {
        state.users = state.users.filter(user => user.id !== id);
        socket.broadcast.emit('rooms', getRooms());
    });

    socket.on('get-rooms', () => {
        socket.emit('rooms', getRooms());
    });   

    socket.on('join-room', ({roomId, user}) => {
        socket.user = user;
        socket.roomId = roomId;
        const room = state.rooms[roomId];
        if (room) {
            room.users.push(socket);
            for (let user of room.users) {
                user.emit('user-joined', {
                    users: room.users.map(socketUser => socketUser.user),
                    messages: room.messages,
                    roomCode: room.code,
                    typeGame: room.typeGame,
                });
            }
        } else {
            socket.emit('room-not-found'); 
        }
        socket.broadcast.emit('rooms', getRooms());
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
                    roomCode: room.code,
                    typeGame: room.typeGame,
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
                    roomCode: room.code,
                    typeGame: room.typeGame,
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
                    roomCode: room.code,
                    typeGame: room.typeGame,
                });
                user.emit('clear', { typeGame: room.typeGame });
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
                    roomCode: room.code,
                    typeGame: room.typeGame,
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
                color: socket.user.color,
                date: new Date(),
                type: 'message',
            });
            for (let user of room.users) {
                user.emit('messages', room.messages);
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });

    socket.on('change-type-game', ({ roomId, user, typeGame }) => {

        const typeGameTranslate = (type) => {
            const options = {
                [TYPE_GAME.default]: 'Tradicional',
                [TYPE_GAME.fibonacci]: 'Fibonacci',
            };
            return options[type];
        };
        const room = state.rooms[roomId];
        if (room) {
            room.typeGame = typeGame;
            room.messages.push({
                text: `${user.username.split(' ')[0]} alterou para o modo ${typeGameTranslate(typeGame)}`,
                color: user.color,
                date: new Date(),
                type: 'action',
            });
            for (let userRoom of room.users) {
                userRoom.emit('change-type-game', typeGame);
                userRoom.emit('messages', room.messages);
            }
        } else {
            socket.emit('room-not-found'); 
        }
    });
}

const codeController = function(socket, io){

    socket.on('find-room', ({ code }) =>{
        const rooms = Object.keys(state.rooms);
        const room = rooms.find(roomId => state.rooms[roomId].code === code);
        if (room) {
            socket.emit('room-found', room);
        } else {
            socket.emit('room-not-found');
        }
    });
}

module.exports = {
    roomControler,
    codeController,
}
