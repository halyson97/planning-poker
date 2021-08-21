import React, { ReactElement } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { Card } from '../../interfaces/cards';
import { User } from '../../interfaces/user';

import AddUser from './AddUser';
import Cards from './Cards';
import ListUsers from './ListUsers';
import { defaultCards } from './cards';
import Buttons from './Buttons';

import config from '../../config/config';

const socket = io(config.urlServer);

const Home: React.FC = (): ReactElement => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();
  const [show, setShow] = React.useState(false);

  const [cards, setCards] = React.useState<Card[]>(defaultCards);

  const handleJoin = (name: string): void => {
    const newUser: User = {
      username: name,
      id: uuid(),
    };
    localStorage.setItem('username', name);
    socket.emit('add user', newUser);
    setUser(newUser);
  };

  const handleClickCard = (card: Card) => {
    const newCards = cards.map((item) => {
      // eslint-disable-next-line no-param-reassign
      item.selected = card.value === item.value;
      return item;
    });

    if (user) {
      const newUser: User = {
        ...user,
        card: card.value,
      };
      socket.emit('user vote', newUser);
      setUser(newUser);
    }

    setCards(newCards);
  };

  const handleShow = () => socket.emit('show');

  const handleClear = () => {
    socket.emit('clear');
    const newCards = cards.map((item) => {
      // eslint-disable-next-line no-param-reassign
      item.selected = false;
      return item;
    });
    setCards(newCards);
    setShow(false);
  };

  React.useEffect(() => {
    const username = localStorage.getItem('username');

    if (username || user) {
      const newUser: User = {
        username: username || user?.username || '',
        id: user?.id || uuid(),
      };
      socket.emit('add user', newUser);
      setUser(newUser);
    }

    socket.on('show', () => {
      setShow(true);
    });

    socket.on('user left', (teste) => {
      setUsers(users.filter((user: User) => user.id !== teste.user.id));
    });

    socket.on('login', (teste) => {
      setUsers(teste.users);
    });
  }, [users]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
      }}
    >
      {!user && <AddUser onSubmit={handleJoin} />}
      {/* Users: {users.map((item) => `${item.username} || `)} */}

      <ListUsers users={users} show={show} />
      <Buttons handleShow={handleShow} handleClear={handleClear} />
      <Cards cards={cards} onClick={handleClickCard} />
    </div>
  );
};

export default Home;
