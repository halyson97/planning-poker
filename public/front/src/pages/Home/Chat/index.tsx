import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Badge, IconButton, TextField } from '@material-ui/core';
import { MdMessage, MdClose, MdSend } from 'react-icons/md';

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
    background: '#fff',
  },
  close: {
    width: '100%',
    height: 48,
    display: 'flex',
    alignItems: 'center',
  },
  titleHeader: {},

  contentMessages: {
    height: 'calc(100vh - 110px)',
    overflowY: 'auto',
  },
  contentMessage: {
    padding: '5px 10px',
    boxSizing: 'border-box',
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
  message: {
    fontSize: '0.8rem',
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
    background: '#f1f3f4',
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
}

const Chat: React.FC<Props> = ({
  messages = [],
  open,
  notification,
  handleOpen,
  onSubmit,
}): ReactElement => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');

  const elementMessages = React.useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    onSubmit(value);
    setValue('');
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
          <div key={index} className={classes.contentMessage}>
            <div className={classes.titleMessage}>
              {message.user}
              <span className={classes.hourMessage}>
                {formatDate(message.date)}
              </span>
            </div>
            <div className={classes.message}>{message.text}</div>
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
                <MdSend />
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
