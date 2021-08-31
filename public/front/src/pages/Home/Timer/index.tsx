import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface Props {
  callback: () => void;
}

const Timer: React.FC<Props> = ({ callback }): ReactElement => {
  const classes = useStyles();

  const [time, setTime] = React.useState(3);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(interval);
      callback();
    }

    return () => {
      clearInterval(interval);
    };
  });

  return <div className={classes.root}>{time}</div>;
};

export default Timer;
