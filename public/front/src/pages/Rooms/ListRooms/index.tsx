import React, { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { IoEnterOutline } from 'react-icons/io5';

import { Button, Typography } from '@material-ui/core';
import { TypeGameEnum } from '../../../interfaces/typeGame';

const useStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
  },
  header: {
    width: 300,
    padding: '20px 0px',
    boxSizing: 'border-box',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 500,
    textAlign: 'center',
  },

  rooms: {
    maxWidth: 450,
    width: 'calc(100% - 20px)',
    padding: '20px 0px',
    boxSizing: 'border-box',
  },
  room: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid #ccc',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    boxSizing: 'border-box',
    width: '100%',
    transition: '0.4s',
    color: '#555',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#f7f7f7',
      color: '#222',
    },
    '& svg': {
      transition: '0.5s',
    },
    '&:hover svg': {
      transform: 'translateX(10px)',
    },
  },
  roomInfo: {
    width: 'calc(100% - 80px)',
  },
  roomJoin: {
    width: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  users: {
    fontSize: '0.8rem',
  },

  notFound: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonEnter: {
    height: '35px',
    border: '1px solid #7057de',
    borderRadius: '5px',
    color: '#7057de',
    background: '#fff',
    cursor: 'pointer',
    marginTop: 40,
  },
});

interface Room {
  code: string;
  id: string;
  typeGame: TypeGameEnum;
  users: number;
}

interface Props {
  rooms: Room[];
  onClick: (roomId: string) => void;
}

const ListRooms: React.FC<Props> = ({ rooms, onClick }): ReactElement => {
  const classes = useStyles();

  const createRoom = () => {
    window.location.hash = `#/create-room`;
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography variant="body1" component="h3" className={classes.title}>
          Salas
        </Typography>
      </div>
      <div className={classes.rooms}>
        {rooms?.map((room) => (
          <div
            key={room.id}
            className={classes.room}
            onClick={() => onClick(room.id)}
          >
            <div className={classes.roomInfo}>
              <div>{room.code}</div>
              <div className={classes.users}>{room.users} jogadores</div>
            </div>
            <div className={classes.roomJoin}>
              <IoEnterOutline size={24} />
            </div>
          </div>
        ))}
        {!rooms?.length && (
          <div className={classes.notFound}>
            <div>Ninguém ta jogando agora</div>
            <div>Crie uma sala e jogue agora mesmo</div>
            <Button
              color="primary"
              className={classes.buttonEnter}
              onClick={createRoom}
            >
              Criar sala
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListRooms;
