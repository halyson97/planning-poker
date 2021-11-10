import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

import ReactCardFlip from 'react-card-flip';

import { User } from '../../../interfaces/user';
import { getCard } from './cards';
import NotUsers from './NotUsers';

const cardBack = getCard();

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemCard: {
    width: '100px',
    height: '150px',
    border: '1px solid #cccccc',
    borderRadius: '8px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemName: {
    width: 100,
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  card: {
    background: '#7057de33',
    backgroundImage: `url(${cardBack})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
});

interface Props {
  users: User[];
  show: boolean;
}

const ListUsers: React.FC<Props> = ({ users, show }): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {users.map((user) => (
        <Tooltip
          open={!!user.message}
          title={`${user.message}`}
          arrow
          key={user.id}
        >
          <div className={classes.item}>
            <ReactCardFlip isFlipped={show} flipDirection="horizontal">
              <div
                className={`${classes.itemCard} ${user.card && classes.card}`}
              ></div>
              <div className={classes.itemCard}>{show && user.card}</div>
            </ReactCardFlip>

            <div className={classes.itemName}>{user.username}</div>
          </div>
        </Tooltip>
      ))}
      {!users.length && <NotUsers />}
    </div>
  );
};

export default ListUsers;
