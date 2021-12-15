import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { MdPersonOutline } from 'react-icons/md';
import { User } from '../../../interfaces/user';

const useStyles = makeStyles({
  root: {
    width: 250,
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    top: 200,
    left: 10,
    minHeight: 50,
    border: '1px solid #ccc',
    borderRadius: 8,
    zIndex: 100,
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
  user: {
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
  icon: {
    transform: 'translateY(2px)',
    marginRight: 5,
  },
});

interface Props {
  users: User[];
}

const ListNoUsers: React.FC<Props> = ({ users }): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.title}>Observadores:</div>
      {users.map((user) => (
        <div key={user.id} className={classes.user}>
          <MdPersonOutline className={classes.icon} />
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default ListNoUsers;
