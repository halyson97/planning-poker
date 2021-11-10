import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Lottie from 'react-lottie';
import animationData from './pokemon.json';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    animation: `$fadein 2s forwards`,
    opacity: 0,
  },
  '@keyframes fadein': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
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

const NotUsers: React.FC = (): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Lottie options={defaultOptions} height={300} width={300} />
      <div className={classes.text}>Aguardando jogadores</div>
    </div>
  );
};

export default NotUsers;
