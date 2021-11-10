import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Lottie from 'react-lottie';
import animationData from './pokemon.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    opacity: 1,

    height: '100vh',
    position: 'fixed',
    background: '#fff',
    zIndex: 1000,
  },
  text: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#777',
    marginTop: '30px',
  },
  contentButtons: {
    display: 'flex',
    marginTop: '30px',
  },
  button: {
    height: '35px',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer',
    margin: '0px 10px',
  },
});

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const RoomNotFound: React.FC = (): ReactElement => {
  const classes = useStyles();

  const redirectTo = (url: string): void => {
    window.location.hash = url;
  };

  return (
    <div className={classes.root}>
      <Lottie options={defaultOptions} height={300} width={300} />
      <div className={classes.text}>Sala não encontrada</div>

      <div className={classes.contentButtons}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => redirectTo('/')}
        >
          Início
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => redirectTo('/create-room')}
        >
          Criar sala
        </Button>
      </div>
    </div>
  );
};

export default RoomNotFound;
