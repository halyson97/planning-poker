import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Fab,
  Badge,
  IconButton,
  TextField,
  Avatar,
  Tooltip,
} from '@material-ui/core';
import { MdMessage, MdClose, MdSend } from 'react-icons/md';
import { User } from '../../../interfaces/user';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  contentClosed: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  bagde: {
    top: 5,
    right: 5,
    height: 20,
    width: 20,
    borderRadius: 20,
  },
  contentOpened: {
    width: 350,
    height: '100vh',
    animation: `$fadein 0.5s forwards`,
    borderLeft: '1px solid #e0e0e0',
    boxShadow: '0px 0px 10px #e0e0e0',
    background: '#ebeef3',
    position: 'fixed',
    right: '0',
    top: '0',
    zIndex: 100,
  },
  close: {
    width: '100%',
    height: 48,
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 'bold',
  },
  titleHeader: {},

  contentMessages: {
    height: 'calc(100vh - 110px)',
    overflowY: 'auto',
    width: 350,
    paddingTop: 10,
    boxSizing: 'border-box',
  },
  contentMessage: {
    padding: '5px 10px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
  },
  contentMessageUser: {
    justifyContent: 'flex-end',
  },

  titleMessage: {
    fontSize: '0.8rem',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  hourMessage: {
    fontWeight: 'initial',
    marginLeft: 5,
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

  contentInput: {
    width: '100%',
    height: 62,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  input: {
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
    background: '#fff',
  },

  '@keyframes fadein': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
});

interface Props {
  messages?: any[];
  open?: boolean;
  notification?: boolean;
  handleOpen?: () => void;
  onSubmit: (value: string) => void;
  user?: User;
}

const Chat: React.FC<Props> = ({
  messages = [],
  open,
  notification,
  user,
  handleOpen,
  onSubmit,
}): ReactElement => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const elementMessages = React.useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    if (value?.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

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

  React.useEffect(() => {
    if (elementMessages.current) {
      elementMessages.current.scrollTop = elementMessages.current.scrollHeight;
    }
  }, [messages, open]);

  return open ? (
    <div className={classes.contentOpened}>
      <div className={classes.close}>
        <IconButton onClick={handleOpen}>
          <MdClose />
        </IconButton>
        <div className={classes.titleHeader}>Mensagens dos brabos</div>
      </div>
      <div className={classes.contentMessages} ref={elementMessages}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${classes.contentMessage} ${
              message.id === user?.id && classes.contentMessageUser
            }`}
          >
            {message.id !== user?.id && (
              <div className={classes.contentAvatar}>
                {(index === 0 ||
                  (index > 0 && message.id !== messages[index - 1].id)) && (
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
        ))}
      </div>

      <div className={classes.contentInput}>
        <TextField
          className={classes.input}
          placeholder="Enviar mensagem"
          fullWidth
          variant="standard"
          value={value}
          autoFocus
          onChange={(e) => setValue(e.target.value)}
          type="text"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSubmit}>
                <MdSend color={value ? '#000' : undefined} />
              </IconButton>
            ),
          }}
        />
      </div>
    </div>
  ) : (
    <div className={classes.contentClosed}>
      <Badge
        variant="dot"
        color="secondary"
        classes={{ badge: classes.bagde }}
        invisible={!notification}
      >
        <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <MdMessage size={24} />
        </Fab>
      </Badge>
    </div>
  );
};

export default Chat;
