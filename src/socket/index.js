const state = {
    users: [],
    numUsers: 0,
};

const getMessages = require('./messages');

module.exports = function(socket) {

    let addedUser = false;

    socket.on('add user', (user) => {
        if (addedUser) return;
    
        // we store the username in the socket session for this client
        socket.user = user;
        state.users.push(user);
        ++state.numUsers;
        addedUser = true;
        socket.emit('login', state);
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('login', state);
    });

    socket.on('user vote', (card) => {
        state.users = state.users.map(user => {
            if (user.id === socket.user.id) {
                return {
                    ...socket.user,
                    card,
                };
            }
            return user;
        });
        socket.emit('login', state);
        socket.broadcast.emit('login', state);
    });

    socket.on('show', (userShow) => {
        state.users = state.users.map(user => {
            if (user.id === userShow.id) {
                const messages = getMessages(user.username);
                const message = messages[Math.floor(Math.random()*messages.length)];
                return {
                    ...user,
                    message,
                };
            }
            return user;
        });
        socket.emit('login', state);
        socket.broadcast.emit('login', state);
    });

    socket.on('clear', () => {
        state.users = state.users.map(user => {
            return {
                ...user,
                card: null,
                message: '',
            };
        });
        socket.emit('login', state);
        socket.broadcast.emit('login', state);
        socket.broadcast.emit('clear', {
            clear: true
        });
    });

    socket.on('disconnect', () => {
        if (addedUser) {
            --state.numUsers;

            state.users = state.users.filter(user => user.id !== socket.user.id);
            
            socket.broadcast.emit('user left', {
                user: socket.user,
                users: state.users,
                numUsers: state.numUsers
            });
        }
    });
}