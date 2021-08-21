import React, { ReactElement } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';

import AddUser from './AddUser';

const socket = io('http://localhost:8000');

interface User {
  username: string;
  id: string;
}

const Home: React.FC = (): ReactElement => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();

  const handleJoin = (name: string): void => {
    console.log('submit user');
    console.log(name);
    const newUser: User = {
      username: name,
      id: uuid(),
    };
    localStorage.setItem('username', name);
    socket.emit('add user', newUser);
    setUser(newUser);
  };

  React.useEffect(() => {
    console.log('Home');

    const username = localStorage.getItem('username');

    if (username) {
      const newUser: User = {
        username,
        id: uuid(),
      };
      socket.emit('add user', newUser);
      setUser(newUser);
    }

    socket.on('user joined', (param) => {
      console.log('user join', param);
    });

    socket.on('user left', (teste) => {
      console.log('user left', teste);
      setUsers(users.filter((user: User) => user.id !== teste.user.id));
    });

    socket.on('login', (teste) => {
      console.log('login', teste);
      setUsers(teste.users);
    });
  }, [users]);

  return (
    <div>
      {!user && <AddUser onSubmit={handleJoin} />}
      Users: {users.map((item) => `${item.username} || `)}
    </div>
  );
};

export default Home;
