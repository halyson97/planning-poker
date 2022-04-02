import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MdClose } from 'react-icons/md';
import { User } from '../../../interfaces/user';

const useStyles = makeStyles({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    '@media (max-width:1000px)': {
      width: '100%',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  root: {
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    minHeight: '50px',
    border: '1px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    zIndex: 10000,
    opacity: 0,
    animation: `$fadein 2s forwards`,
    '@media (min-width:1000px)': {
      position: 'fixed',
      top: 55,
      right: 10,
    },
  },
  '@keyframes fadein': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  title: {
    fontWeight: 'bold',
    padding: 0,
    boxSizing: 'border-box',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
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
  close: {
    cursor: 'pointer',
    height: 24,
    width: 24,
    color: '#ff0000',
  },
});

interface Props {
  users: User[];
}

const Results: React.FC<Props> = ({ users }): ReactElement => {
  const classes = useStyles();

  const container = React.useRef<HTMLDivElement>(null);

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
      bigger: cards.length ? bigger : 0,
      minor: cards.length ? minor : 0,
      media: Number.isNaN(media) ? 0 : media,
      moda: moda.length ? moda : '0',
    });
  }, [users]);

  const handleHidden = () => {
    if (container.current) {
      container.current.style.display = 'none';
    }
  };

  const stopEvents = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className={classes.backdrop} ref={container} onClick={handleHidden}>
      <div className={classes.root} onClick={stopEvents}>
        <div className={classes.title}>
          <div>Resultado:</div>
          <div className={classes.close} onClick={handleHidden}>
            <MdClose />
          </div>
        </div>

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
          <div>Média:</div>
          <div className={classes.bold}>{state.media}</div>
        </div>
      </div>
    </div>
  );
};

export default Results;
