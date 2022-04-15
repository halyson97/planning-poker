import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Tooltip } from '@material-ui/core';
import { User } from '../../../../interfaces/user';

const useStyles = makeStyles({
  contentMessage: {
    padding: '5px 10px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  contentMessageSameUser: {
    paddingTop: '0',
  },
  contentMessageUser: {
    justifyContent: 'flex-end',
  },

  contentAvatar: {
    width: 40,
    height: 40,
  },
  message: {
    fontSize: '0.9rem',
    wordWrap: 'break-word',
    background: '#e42565',
    color: '#fff',
    maxWidth: 'calc(100% - 50px)',
    padding: 10,
    boxSizing: 'border-box',
    borderRadius: 10,
    marginLeft: 10,
    boxShadow: '0px 0px 10px #e0e0e0',
    fontWeight: 'bold',
    paddingBottom: 20,
    paddingRight: 15,
    wordBreak: 'break-word',
    position: 'relative',
    minWidth: 60,
  },
  messageUser: {
    background: '#fff',
    boxShadow: '0px 0px 10px #e0e0e0',
    color: '#444',
  },
  messageShort: {
    textAlign: 'center',
  },

  hour: {
    fontSize: '0.58rem',
    fontWeight: 'bold',
    position: 'absolute',
    right: 8,
    bottom: 5,
  },
});

interface Props {
  message?: any;
  lastMessage?: any;
  user?: User;
  index: number;
}

const Message: React.FC<Props> = ({
  message,
  user,
  index,
  lastMessage,
}): ReactElement => {
  const classes = useStyles();

  const formatDate = (date: Date) => {
    const newDate = new Date(date);
    const hours =
      newDate.getHours() > 9 ? newDate.getHours() : `0${newDate.getHours()}`;
    const minutes =
      newDate.getMinutes() > 9
        ? newDate.getMinutes()
        : `0${newDate.getMinutes()}`;
    return `${hours}:${minutes}`;
  };

  const getAvatarName = (name: string) => {
    const nameArray = name.split(' ');
    if (nameArray.length > 1) {
      return (
        nameArray[0].charAt(0).toUpperCase() +
        nameArray[nameArray.length - 1].charAt(0).toUpperCase()
      );
    }

    return (
      nameArray[0].charAt(0).toUpperCase() +
      nameArray[0].charAt(1).toUpperCase()
    );
  };

  return (
    <div
      className={`${classes.contentMessage} ${
        message.id === user?.id && classes.contentMessageUser
      } ${
        index > 0 &&
        message.id === lastMessage?.id &&
        classes.contentMessageSameUser
      }`}
    >
      {message.id !== user?.id && (
        <div className={classes.contentAvatar}>
          {(index === 0 || (index > 0 && message.id !== lastMessage?.id)) && (
            <Tooltip title={message.user} placement="bottom" arrow>
              <Avatar style={{ background: message?.color }}>
                {getAvatarName(message.user)}
              </Avatar>
            </Tooltip>
          )}
        </div>
      )}
      <div
        className={`${classes.message} ${
          message.id === user?.id && classes.messageUser
        }
      ${message.text.length < 6 && classes.messageShort}`}
        style={
          message?.color && message.id !== user?.id
            ? {
                background: message?.color,
              }
            : undefined
        }
      >
        {message.text}
        <span className={classes.hour}>{formatDate(message.date)}</span>
      </div>
    </div>
  );
};

export default Message;
