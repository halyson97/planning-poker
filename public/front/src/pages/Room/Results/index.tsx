import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../../../interfaces/user';

const useStyles = makeStyles({
  root: {
    width: '250px',
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    top: 55,
    right: 10,
    minHeight: '50px',
    border: '1px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    padding: 0,
    boxSizing: 'border-box',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  item: {
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingLeft: 10,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    height: 30,
  },
  bold: {
    fontWeight: 'bold',
    paddingLeft: 5,
    boxSizing: 'border-box',
  },
  media: {
    color: 'green',
    fontSize: '1.3em',
  },
});

interface Props {
  users: User[];
}

const Results: React.FC<Props> = ({ users }): ReactElement => {
  const classes = useStyles();

  const [state, setState] = React.useState({
    bigger: 0,
    minor: 0,
    moda: '0',
    media: 0,
  });

  const mode = (cards: number[]): string => {
    const counts = cards.reduce((acc, curr) => {
      acc[curr] = (acc[curr] || 0) + 1;
      return acc;
    }, {} as any);

    const values: number[] = Object.values(counts);
    const max = Math.max(...values);
    return Object.keys(counts)
      .filter((key) => Number(counts[key]) === max)
      .join(' e ');
  };

  React.useEffect(() => {
    const cards: number[] = users
      .filter((user) => user.card)
      .map((user) => Number(user.card));
    const bigger = Math.max(...cards);
    const minor = Math.min(...cards);
    const moda = mode(cards);
    const media = Number(
      (cards.reduce((a, b) => a + b, 0) / cards.length).toFixed(2)
    );

    setState({
      ...state,
      bigger,
      minor,
      moda,
      media,
    });
  }, [users]);

  return (
    <div className={classes.root}>
      <div className={classes.title}>Resultado:</div>

      <div className={classes.item}>
        <div>Maior:</div>
        <div className={classes.bold}>{state.bigger}</div>
      </div>
      <div className={classes.item}>
        <div>Menor:</div>
        <div className={classes.bold}>{state.minor}</div>
      </div>
      <div className={classes.item}>
        <div>Moda:</div>
        <div className={classes.bold}>{state.moda}</div>
      </div>
      <div className={`${classes.item} ${classes.media}`}>
        <div>Media:</div>
        <div className={classes.bold}>{state.media}</div>
      </div>
    </div>
  );
};

export default Results;
