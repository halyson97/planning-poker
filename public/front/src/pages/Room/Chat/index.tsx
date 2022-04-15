import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Fab, Badge, IconButton, TextField } from '@material-ui/core';
import { MdMessage, MdClose, MdSend } from 'react-icons/md';
import { User } from '../../../interfaces/user';
import Message from './Message';
import Action from './Action';

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
          <React.Fragment key={index}>
            {message.type === 'message' ? (
              <Message
                index={index}
                message={message}
                user={user}
                lastMessage={index > 0 ? messages[index - 1] : undefined}
              />
            ) : (
              <Action message={message} />
            )}
          </React.Fragment>
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
