import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';

import config from '../../config/config';
import { User } from '../../interfaces/user';
import { Card } from '../../interfaces/cards';

import AddUser from './AddUser';
import ListNoUsers from './ListNoUsers';
import Header from './Header';
import ListUsers from './ListUsers';
import Cards from './Cards';

import { defaultCards } from './cards';
import Timer from './Timer';
import Buttons from './Buttons';
import RoomNotFound from './RoomNotFound';
import Chat from './Chat';
import Results from './Results';

const socket = io(config.urlServer);

const Room: React.FC = (): ReactElement => {
  const [user, setUser] = React.useState<User>();
  const [users, setUsers] = React.useState<User[]>([]);
  const { roomId } = useParams<{ roomId: string }>();

  const [cards, setCards] = React.useState<Card[]>(defaultCards);

  const [show, setShow] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [roomNotFound, setRoomNotFound] = React.useState(false);

  const [openChat, setOpenChat] = React.useState(false);
  const [notificationChat, setNotificationChat] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  const handleJoin = (name: string, isPlayer: boolean): void => {
    const newUser: User = {
      username: name,
      isPlayer,
      id: uuid(),
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    socket.emit('join-room', { roomId, user: newUser });
    setUser(newUser);
  };

  const filterUsers = (users: User[], isPlayer = true): User[] => {
    return users.filter((user) => user.isPlayer === isPlayer);
  };

  const handleChangeIsPlayer = (value: boolean) => {
    socket.emit('change-is-player', value);
    if (user) {
      const newUser: User = {
        ...user,
        isPlayer: value,
      };
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const handleClickCard = (card: Card) => {
    const newCards = cards.map((item) => ({
      ...item,
      selected: card.value === item.value,
    }));

    setCards(newCards);
    socket.emit('user-vote', { roomId, value: card.value });
  };

  const handleShow = () => {
    if (!show && !showTimer) {
      socket.emit('show', { roomId, user });
    }
  };

  const handleClear = () => {
    socket.emit('clear', { roomId });
  };

  const handleOpenChat = () => {
    setOpenChat(!openChat);
    setNotificationChat(false);
  };

  const handleSubmitChat = (message: string): void => {
    socket.emit('send-message', { roomId, message });
  };

  const playSound = (): void => {
    const audio = new Audio('/sounds/string.mp3');
    audio.play();
  };

  React.useEffect(() => {
    const userSaved = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null;

    const userLogged = userSaved || user;

    if (userLogged) {
      setUser(userLogged);
      socket.emit('join-room', { roomId, user: userLogged });
    }

    socket.on('user-joined', (state) => {
      setUsers(state.users);
      setMessages(state.messages);
      const newUser = state.users.find(
        (item: User) => item.id === userLogged?.id
      );
      if (newUser) {
        setUser(newUser);
      }
    });

    socket.on('user-left', (users: Array<User>) => {
      setUsers(users);
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

    socket.on('show', () => {
      setShowTimer(true);
    });

    socket.on('messages', (messages) => {
      setMessages(messages);
      setNotificationChat(true);
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.id !== user?.id) {
        playSound();
      }
    });

    socket.on('room-not-found', () => {
      setRoomNotFound(true);
    });
  }, [roomId]);

  React.useEffect(() => {
    return () => {
      socket.emit('user-left');
    };
  }, []);

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
        {roomNotFound && <RoomNotFound />}
        {!user && <AddUser onSubmit={handleJoin} />}

        <Header checked={!!user?.isPlayer} onChange={handleChangeIsPlayer} />

        {filterUsers(users, false).length > 0 && (
          <ListNoUsers users={filterUsers(users, false)} />
        )}

        {show && <Results users={filterUsers(users)} />}

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

export default Room;
