/* eslint-disable react/no-unescaped-entities */
import React, { ReactElement } from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import animationData from './water.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  content: {
    width: '100%',
    height: 'calc(100vh - 50px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  text: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#777',
    marginTop: '30px',
    marginBottom: '30px',
  },
  subtext: {
    fontSize: '1.2rem',
    color: '#777',
  },
  footer: {
    height: '50px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  buttonEnter: {
    height: '35px',
    border: '1px solid #7057de',
    borderRadius: '5px',
    color: '#7057de',
    background: '#fff',
    cursor: 'pointer',
    marginTop: 30,
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

const Disconnected: React.FC = (): ReactElement => {
  const classes = useStyles();

  const reconnect = () => {
    window.location.reload();
  };

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Lottie options={defaultOptions} height={300} width={300} />
        <div className={classes.text}>Desconectado</div>
        <div className={classes.subtext}>
          O Poker dos Brabos está aberto em outra janela.
        </div>
        <div className={classes.subtext}>
          Clique em "Jogar aqui" para usar o Poker nesta janela.
        </div>
        <Button
          color="primary"
          className={classes.buttonEnter}
          onClick={() => reconnect()}
        >
          Jogar aqui
        </Button>
      </div>
      <div className={classes.footer}>Aproveite e se mantenha hidratado :D</div>
    </div>
  );
};

export default Disconnected;
