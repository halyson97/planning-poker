import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { User } from '../../../interfaces/user';

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
    borderColor: '#7057de',
  },
});

interface Props {
  users: User[];
}

const ListUsers: React.FC<Props> = ({ users }): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {users.map((user) => (
        <div key={user.id} className={classes.item}>
          <div
            className={`${classes.itemCard} ${user.card && classes.card}`}
          ></div>
          <div className={classes.itemName}>{user.username}</div>
        </div>
      ))}
    </div>
  );
};

export default ListUsers;
