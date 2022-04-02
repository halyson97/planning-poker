import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Card } from '../../../interfaces/cards';

const useStyles = makeStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    display: 'flex',
    alignItems: 'center',
    maxWidth: 1200,
    padding: '0px 10px',
    boxSizing: 'border-box',
    '&::-webkit-scrollbar': {
      height: 10,
      backgroundColor: '#f5f5f5',
    },
    '@media (min-width:602px)': {
      justifyContent: 'center',
    },
  },
  item: {
    width: '75px',
    minWidth: '75px',
    border: '1px solid #cccccc',
    height: '100px',
    borderRadius: '8px',
    margin: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  selected: {
    borderColor: '#7057de',
    background: '#7057de33',
  },
});

interface Props {
  cards: Card[];
  onClick: (card: Card) => void;
}

const Cards: React.FC<Props> = ({ cards, onClick }): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {cards.map((card) => (
        <div
          key={card.value}
          className={`${classes.item} ${card.selected && classes.selected}`}
          onClick={() => onClick(card)}
        >
          {card.value}
        </div>
      ))}
    </div>
  );
};

export default Cards;
