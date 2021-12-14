import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { User } from '../../../interfaces/user';

const useStyles = makeStyles({
  root: {
    width: '250px',
    display: 'flex',
    position: 'absolute',
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    top: 55,
    right: 10,
    minHeight: '50px',
    border: '1px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    zIndex: 10000,
    opacity: 0,
    animation: `$fadein 2s forwards`,
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

  const container = React.useRef<HTMLDivElement>(null);

  const [state, setState] = React.useState({
    bigger: 0,
    minor: 0,
    moda: '0',
    media: 0,
  });

  const [isDown, setIsDown] = React.useState(false);
  const [offset, setOffset] = React.useState([55, 10]);

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

  const handleMouseDown = (e: React.MouseEvent): void => {
    setIsDown(true);
    if (container.current) {
      const { x, y } = container.current.getBoundingClientRect();

      setOffset([x - e.clientX, y - e.clientY]);
    }
  };

  const handleMouseUp = (): void => {
    setIsDown(false);
  };

  const handleMove = (e: any) => {
    e.preventDefault();
    if (isDown && container.current) {
      container.current.style.left = `${e.clientX + offset[0]}px`;
      container.current.style.top = `${e.clientY + offset[1]}px`;
    }
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

  return (
    <div
      className={classes.root}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMove}
      ref={container}
    >
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
