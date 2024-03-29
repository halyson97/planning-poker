import React, { ReactElement } from 'react';
import { Manager } from 'socket.io-client';
import { v4 as uuid } from 'uuid';

import config from '../../config/config';
import { User } from '../../interfaces/user';
import { getRandomColor } from '../../utils/colors';
import { CardOption } from '../Room/ListUsers/cards';

import AddRoom from './AddRoom';

const manager = new Manager(config.urlServer);
const socket = manager.socket('/room');

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

  const handleSubmit = (
    name: string,
    isPlayer: boolean,
    cardSelected: CardOption
  ) => {
    const typeGame = localStorage.getItem('typeGame');
    const newUser: User = {
      username: name,
      isPlayer,
      cardSelected,
      color: getRandomColor(),
      id: uuid(),
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    socket.emit('create-room', { newUser, typeGame });
  };

  return (
    <div>
      <AddRoom user={user} onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateRoom;
