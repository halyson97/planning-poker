/* eslint-disable no-param-reassign */
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { Manager } from 'socket.io-client';
import { v4 as uuid } from 'uuid';

import config from '../../config/config';
import { User } from '../../interfaces/user';
import { Card } from '../../interfaces/cards';

import AddUser from './AddUser';
import ListNoUsers from './ListNoUsers';
import Header from './Header';
import ListUsers from './ListUsers';
import Cards from './Cards';

import { defaultCards, fibonacciCards } from './cards';
import Timer from './Timer';
import Buttons from './Buttons';
import RoomNotFound from './RoomNotFound';
import Chat from './Chat';
import Results from './Results';
import Shared from './Shared';
import { CardOption } from './ListUsers/cards';
import { getRandomColor } from '../../utils/colors';
import { TypeGameEnum } from '../../interfaces/typeGame';

const manager = new Manager(config.urlServer);
const socket = manager.socket('/room');

const Room: React.FC = (): ReactElement => {
  const [user, setUser] = React.useState<User>();
  const [users, setUsers] = React.useState<User[]>([]);
  const [typeGame, setTypeGame] = React.useState<TypeGameEnum>(
    TypeGameEnum.default
  );
  const { roomId } = useParams<{ roomId: string }>();

  const [cards, setCards] = React.useState<Card[]>(defaultCards);

  const [isSoundActive, setSoundActive] = React.useState(
    localStorage.getItem('sounds') === 'ENABLED'
  );

  const [show, setShow] = React.useState(false);
  const [showTimer, setShowTimer] = React.useState(false);
  const [roomNotFound, setRoomNotFound] = React.useState(false);
  const [roomCode, setRoomCode] = React.useState('');

  const [openChat, setOpenChat] = React.useState(false);
  const [notificationChat, setNotificationChat] = React.useState(false);
  const [messages, setMessages] = React.useState([]);

  const audio = React.useMemo(() => new Audio('/sounds/string.mp3'), []);
  const musicAllEquals = React.useMemo(
    () => new Audio('/sounds/music.mp3'),
    []
  );

  const stopAudio = React.useCallback((media: HTMLAudioElement): void => {
    media.pause();
    media.currentTime = 0;
  }, []);

  React.useEffect(() => {
    if (!isSoundActive && audio && musicAllEquals) {
      stopAudio(audio);
      stopAudio(musicAllEquals);
    }
  }, [isSoundActive, audio, musicAllEquals, stopAudio]);

  const handleChangeTypeGame = (type: TypeGameEnum) => {
    setTypeGame(type);
    socket.emit('change-type-game', { roomId, user, typeGame: type });
  };

  const handleJoin = (
    name: string,
    isPlayer: boolean,
    cardSelected: CardOption
  ): void => {
    const newUser: User = {
      username: name,
      isPlayer,
      cardSelected,
      color: getRandomColor(),
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

  const handleChangeIsSounds = (value: boolean) => {
    setSoundActive(value);
    localStorage.setItem('sounds', value ? 'ENABLED' : 'DISABLED');
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
    if (localStorage.getItem('sounds') === 'ENABLED') {
      audio.play();
    }
  };

  const playSoundAllEquals = (): void => {
    if (localStorage.getItem('sounds') === 'ENABLED') {
      musicAllEquals.play();
    }
  };

  const allEqual = (values: string[]): boolean => {
    return values.every((value) => value === values[0]);
  };

  const handleShowTime = () => {
    setShow(true);
    setShowTimer(false);

    const cards = users.map((user) => user.card).filter((card) => !!card);

    if (cards.length > 1 && allEqual(cards as string[])) {
      playSoundAllEquals();
    }
  };

  React.useEffect(() => {
    const userSaved = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null;

    if (userSaved?.cardSelected) {
      setUser(userSaved);
      socket.emit('join-room', { roomId, user: userSaved });
    }

    socket.on('user-joined', (state) => {
      setUsers(state.users);
      setMessages(state.messages);
      setRoomCode(state.roomCode);
      setTypeGame(state.typeGame);
      const newUser = state.users.find(
        (item: User) => item.id === userSaved?.id
      );
      if (newUser) {
        setUser(newUser);
      }
    });

    socket.on('user-left', (users: Array<User>) => {
      setUsers(users);
    });

    socket.on('clear', ({ typeGame }: { typeGame: TypeGameEnum }) => {
      setShow(false);
      setShowTimer(false);

      const useCards =
        typeGame === TypeGameEnum.fibonacci ? fibonacciCards : defaultCards;
      const newCards = useCards.map((item) => {
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
      if (
        lastMessage?.type === 'message' &&
        lastMessage?.id !== userSaved?.id
      ) {
        playSound();
      }
    });

    socket.on('change-type-game', (typeGame: TypeGameEnum) => {
      setTypeGame(typeGame);
      localStorage.setItem('typeGame', typeGame);
    });

    socket.on('room-not-found', () => {
      setRoomNotFound(true);
    });

    return () => {
      socket.off('user-joined');
      socket.off('user-left');
      socket.off('clear');
      socket.off('show');
      socket.off('messages');
      socket.off('change-type-game');
      socket.off('room-not-found');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  React.useEffect(() => {
    if (typeGame) {
      const options = {
        [TypeGameEnum.default]: defaultCards,
        [TypeGameEnum.fibonacci]: fibonacciCards,
      };
      setCards(options[typeGame]);
    }
  }, [typeGame]);

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

        <Header
          checked={!!user?.isPlayer}
          isSoundActive={isSoundActive}
          onChangeSounds={handleChangeIsSounds}
          onChange={handleChangeIsPlayer}
          typeGame={typeGame}
          onChangeTypeGame={handleChangeTypeGame}
        />

        {filterUsers(users, false).length > 0 && (
          <ListNoUsers users={filterUsers(users, false)} />
        )}

        <Shared code={roomCode} />

        {show && <Results users={filterUsers(users)} />}

        <ListUsers users={filterUsers(users)} show={show} />

        <div>
          <div
            style={{
              height: 45,
            }}
          >
            {showTimer && <Timer callback={handleShowTime} />}
          </div>
          {!!user?.isPlayer && Boolean(filterUsers(users).length) && (
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
        user={user}
      />
    </div>
  );
};

export default Room;
