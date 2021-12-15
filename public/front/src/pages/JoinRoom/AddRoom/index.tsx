import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';

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
  },
  button: {
    height: '35px',
    border: '1px solid #7057de',
    borderRadius: '5px',
    color: '#fff',
    background: '#7057de',
    cursor: 'pointer',
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
  error: {
    color: 'red',
    fontSize: '0.9rem',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
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
});

interface Props {
  onSubmit: (name: string) => void;
  error: boolean;
}

const AddRoom: React.FC<Props> = ({ onSubmit, error }): ReactElement => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(name);
  };

  const joinRoom = () => {
    window.location.hash = `#/create-room`;
  };

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="body1" component="h3" className={classes.title}>
          Entrar em uma sala
        </Typography>
        <TextField
          type="text"
          placeholder="Código da sala"
          label="Código da sala"
          value={name}
          onChange={(event) => setName(event.target.value.toUpperCase())}
          required
          variant="outlined"
          className={classes.input}
          inputProps={{ maxLength: 6, minLength: 6 }}
        />

        <div className={classes.error}>
          {error ? 'Sala não encontrada' : ''}
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Entrar na sala
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
          Criar sala
        </Button>
      </form>
    </div>
  );
};

export default AddRoom;
