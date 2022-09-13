import React, { ReactElement } from 'react';
import { Manager } from 'socket.io-client';

import { makeStyles } from '@material-ui/core/styles';

import config from '../../config/config';
import { TypeGameEnum } from '../../interfaces/typeGame';
import ListRooms from './ListRooms';

interface Room {
  code: string;
  id: string;
  typeGame: TypeGameEnum;
  users: number;
}

const manager = new Manager(config.urlServer);
const socket = manager.socket('/room');

const useStyles = makeStyles({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: '100vh',
    flexDirection: 'column',
    padding: 50,
    boxSizing: 'border-box',
  },
});

const Rooms: React.FC = (): ReactElement => {
  const classes = useStyles();

  const [rooms, setRooms] = React.useState<Room[]>([]);

  React.useEffect(() => {
    socket.on('rooms', (rooms) => {
      setRooms(rooms);
    });

    socket.emit('get-rooms');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const joinRoom = (roomId: string) => {
    window.location.hash = `#/rooms/${roomId}`;
  };

  return (
    <div className={classes.root}>
      <ListRooms rooms={rooms} onClick={joinRoom} />
    </div>
  );
};

export default Rooms;
