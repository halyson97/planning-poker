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
import Header from './Header';
import Timer from './Timer';

import config from '../../config/config';
import ListNoUsers from './ListNoUsers';
import Chat from './Chat';

const socket = io(config.urlServer);

const Home: React.FC = (): ReactElement => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [user, setUser] = React.useState<User>();
  const [show, setShow] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [openChat, setOpenChat] = React.useState(false);
  const [notificationChat, setNotificationChat] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  const [cards, setCards] = React.useState<Card[]>(defaultCards);

  const handleJoin = (name: string, isPlayer: boolean): void => {
    const newUser: User = {
      username: name,
      isPlayer,
      id: uuid(),
    };
    localStorage.setItem('username', name);
    localStorage.setItem('isPlayer', isPlayer ? 'true' : 'false');
    socket.emit('add user', newUser);
    setUser(newUser);
  };

  const handleClickCard = (card: Card) => {
    const newCards = cards.map((item) => ({
      ...item,
      selected: card.value === item.value,
    }));

    setCards(newCards);
    socket.emit('user vote', card.value);
  };

  const handleShow = () => {
    if (!show) {
      socket.emit('show', user);
    }
  };

  const handleClear = () => {
    socket.emit('clear');
  };

  const handleChangeIsPlayer = (value: boolean) => {
    socket.emit('changeIsPlayer', value);
    localStorage.setItem('isPlayer', value ? 'true' : 'false');
  };

  const filterUsers = (users: User[], isPlayer = true): User[] => {
    return users.filter((user) => user.isPlayer === isPlayer);
  };

  React.useEffect(() => {
    const username = localStorage.getItem('username');
    const isPlayer = localStorage.getItem('isPlayer') === 'true';

    if (username && !user) {
      const newUser: User = {
        username: username || '',
        isPlayer,
        id: uuid(),
        card: undefined,
      };
      setUser(newUser);
      socket.emit('add user', newUser);
    }

    if (user) {
      const newUser = users.find((item) => item.id === user.id);
      setUser(newUser);
      socket.emit('add user', newUser);
    }

    socket.on('show', () => {
      setShowTimer(true);
    });

    socket.on('clear', () => {
      setShow(false);
      setShowTimer(false);
      const newCards = cards.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      setCards(newCards);
    });

    socket.on('user left', (teste) => {
      setUsers(teste.users);
    });

    socket.on('messages', (messages) => {
      setMessages(messages);
      setNotificationChat(true);
    });

    socket.on('login', (teste) => {
      setUsers(teste.users);
      setMessages(teste.messages);
      const newUser = teste.users.find((item: User) => item.id === user?.id);
      if (newUser) {
        setUser(newUser);
      }
    });
  }, [users]);

  const handleOpenChat = () => {
    setOpenChat(!openChat);
    setNotificationChat(false);
  };

  const handleSubmitChat = (message: string): void => {
    socket.emit('send message', message);
  };

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '100vh',
          userSelect: 'none',
          position: 'relative',
        }}
      >
        {!user && <AddUser onSubmit={handleJoin} />}
        <Header checked={!!user?.isPlayer} onChange={handleChangeIsPlayer} />

        {filterUsers(users, false).length > 0 && (
          <ListNoUsers users={filterUsers(users, false)} />
        )}

        <ListUsers users={filterUsers(users)} show={show} />
        <div>
          <div
            style={{
              height: 45,
            }}
          >
            {showTimer && (
              <Timer
                callback={() => {
                  setShow(true);
                  setShowTimer(false);
                }}
              />
            )}
          </div>
          {Boolean(filterUsers(users).length) && (
            <Buttons
              handleShow={handleShow}
              handleClear={handleClear}
              disabled={!user?.isPlayer}
            />
          )}
        </div>
        {!!user?.isPlayer && <Cards cards={cards} onClick={handleClickCard} />}
      </div>
      <Chat
        open={openChat}
        handleOpen={handleOpenChat}
        onSubmit={handleSubmitChat}
        messages={messages}
        notification={notificationChat}
      />
    </div>
  );
};

export default Home;
