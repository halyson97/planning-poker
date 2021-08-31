let users = [];
let numUsers = 0;

const messages = require('./messages');

module.exports = function(socket) {

    let addedUser = false;

    socket.on('add user', (user) => {
        if (addedUser) return;
    
        // we store the username in the socket session for this client
        socket.user = user;
        users.push(user);
        ++numUsers;
        addedUser = true;
        socket.emit('login', {
            numUsers: numUsers,
            users,
        });
        // echo globally (all clients) that a person has connected
        socket.broadcast.emit('login', {
            numUsers: numUsers,
            users,
        });
    });

    socket.on('user vote', (userVote) => {
        users = users.map(user => {
            if (user.id === userVote.id) {
                return userVote;
            }
            return user;
        });
        socket.emit('login', {
            numUsers: numUsers,
            users,
        });
        socket.broadcast.emit('login', {
            numUsers: numUsers,
            users,
        });
    });

    socket.on('show', (userShow) => {
        socket.emit('show');
        socket.broadcast.emit('show');

        const message = messages[Math.floor(Math.random()*messages.length)];

        users = users.map(user => {
            if (user.id === userShow.id) {
                return {
                    ...user,
                    message,
                };
            }
            return user;
        });
        socket.emit('login', {
            numUsers: numUsers,
            users,
        });
        socket.broadcast.emit('login', {
            numUsers: numUsers,
            users,
        });
    });

    socket.on('clear', () => {
        users = users.map(user => {
            return {
                ...user,
                card: null,
                message: '',
            };
        });
        socket.emit('login', {
            numUsers: numUsers,
            users,
        });
        socket.broadcast.emit('login', {
            numUsers: numUsers,
            users,
        });
        socket.broadcast.emit('clear', {
            clear: true
        });
    });

    socket.on('disconnect', () => {
        if (addedUser) {
            --numUsers;

            users = users.filter(user => user.id !== socket.user.id);
            
            socket.broadcast.emit('user left', {
                user: socket.user,
                numUsers: numUsers
            });
        }
    });
}