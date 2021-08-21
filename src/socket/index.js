let users = [];
let numUsers = 0;

module.exports = function(socket) {
    console.log('a user connected');

    let addedUser = false;

    socket.on('add user', (user) => {
        if (addedUser) return;

        console.log('add user')
    
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