import React, { ReactElement } from 'react';
import Lottie from 'react-lottie';
import { makeStyles } from '@material-ui/core/styles';
import animationData from './connect.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
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

const Loading: React.FC = (): ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Lottie options={defaultOptions} height={236} width={540} />
      <div className={classes.text}>Conectando</div>
    </div>
  );
};

export default Loading;
