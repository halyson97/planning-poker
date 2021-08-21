import React, { ReactElement } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import { Card } from '../../interfaces/cards';
import { User } from '../../interfaces/user';

import AddUser from './AddUser';
import Cards from './Cards';
import ListUsers from './ListUsers';
import { defaultCards } from './cards';

const socket = io('http://localhost:8000');

const Home: React.FC = (): ReactElement => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();

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

    socket.on('user left', (teste) => {
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
      {/* Users: {users.map((item) => `${item.username} || `)} */}

      <ListUsers users={users} />
      <Cards cards={cards} onClick={handleClickCard} />
    </div>
  );
};

export default Home;
