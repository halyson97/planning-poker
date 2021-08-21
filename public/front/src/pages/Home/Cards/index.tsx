import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Card } from '../../../interfaces/cards';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '75px',
    border: '1px solid #cccccc',
    height: '100px',
    borderRadius: '8px',
    margin: 10,
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
