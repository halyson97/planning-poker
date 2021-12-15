import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  TextField,
  Button,
  Switch,
  Typography,
} from '@material-ui/core';
import { User } from '../../../interfaces/user';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    zIndex: 1000,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    marginBottom: '10px',
  },
  button: {
    height: '35px',
    border: '1px solid #7057de',
    borderRadius: '5px',
    color: '#fff',
    background: '#7057de',
    cursor: 'pointer',
    marginTop: '10px',
  },
  buttonEnter: {
    height: '35px',
    border: '1px solid #7057de',
    borderRadius: '5px',
    color: '#7057de',
    background: '#fff',
    cursor: 'pointer',
    marginTop: 20,
  },
  link: {
    color: '#03a9f4',
    textDecoration: 'none',
    cursor: 'pointer',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 500,
    marginBottom: '20px',
    textAlign: 'center',
  },
  terms: {
    width: 300,
    padding: 5,
    boxSizing: 'border-box',
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});

interface Props {
  onSubmit: (name: string, isPlayer: boolean) => void;
  user: User | undefined;
}

const AddRoom: React.FC<Props> = ({ onSubmit, user }): ReactElement => {
  const classes = useStyles();

  const [name, setName] = React.useState(user?.username || '');
  const [isPlayer, setIsPlayer] = React.useState(true);
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(name, isPlayer);
  };

  const joinRoom = () => {
    window.location.hash = `#/join-room`;
  };

  React.useEffect(() => {
    setName(user?.username || '');
  }, [user]);

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="body1" component="h3" className={classes.title}>
          Criar sala
        </Typography>
        <TextField
          type="text"
          placeholder="Usuário"
          label="Usuário"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          variant="outlined"
          className={classes.input}
        />

        <FormControlLabel
          control={
            <Switch
              checked={isPlayer}
              onChange={(event) => setIsPlayer(event.target.checked)}
            />
          }
          label="Entrar como Jogador"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Criar sala
        </Button>

        <div className={classes.terms}>
          <Typography>
            Ao continuar você concorda com nossos{' '}
            <span className={classes.link}>termos de uso e privacidade</span>
          </Typography>
        </div>
        <Button
          color="primary"
          className={classes.buttonEnter}
          onClick={joinRoom}
        >
          Entrar em uma sala
        </Button>
      </form>
    </div>
  );
};

export default AddRoom;
