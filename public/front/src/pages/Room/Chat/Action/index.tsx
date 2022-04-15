import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: '#777',
    padding: 3,
    boxSizing: 'border-box',
  },
});

interface Props {
  message?: any;
}

const Action: React.FC<Props> = ({ message }): ReactElement => {
  const classes = useStyles();

  return <div className={classes.root}>{message.text}</div>;
};

export default Action;
