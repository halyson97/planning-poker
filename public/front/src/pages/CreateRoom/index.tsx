import React, { ReactElement } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';

import config from '../../config/config';
import { User } from '../../interfaces/user';

import AddRoom from './AddRoom';

const socket = io(config.urlServer);

const CreateRoom: React.FC = (): ReactElement => {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const userSaved = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null;

    const userLogged = userSaved || user;

    if (userLogged) {
      setUser(userLogged);
    }

    socket.on('room-created', (roomId) => {
      window.location.hash = `#/rooms/${roomId}`;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (name: string, isPlayer: boolean) => {
    const newUser: User = {
      username: name,
      isPlayer,
      id: uuid(),
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    socket.emit('create-room', newUser);
  };

  return (
    <div>
      <AddRoom user={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateRoom;
