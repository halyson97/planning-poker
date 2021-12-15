import React, { ReactElement } from 'react';
import { io } from 'socket.io-client';

import config from '../../config/config';

import AddRoom from './AddRoom';

const socket = io(config.urlServer);

let timeout: ReturnType<typeof setTimeout>;

const JoinRoom: React.FC = (): ReactElement => {
  const [roomNotFound, setRoomNotFound] = React.useState(false);

  React.useEffect(() => {
    socket.on('room-found', (roomId) => {
      window.location.hash = `#/rooms/${roomId}`;
    });
    socket.on('room-not-found', () => {
      setRoomNotFound(true);
      timeout = setTimeout(() => {
        setRoomNotFound(false);
      }, 1500);
    });

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (code: string) => {
    socket.emit('find-room', { code });
    clearTimeout(timeout);
  };

  return (
    <div>
      <AddRoom onSubmit={handleSubmit} error={roomNotFound} />
    </div>
  );
};

export default JoinRoom;
