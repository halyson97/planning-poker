import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, TextField, Button, Switch } from '@material-ui/core';

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
});

interface Props {
  onSubmit: (name: string, isPlayer: boolean) => void;
}

const AddUser: React.FC<Props> = ({ onSubmit }): ReactElement => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [isPlayer, setIsPlayer] = React.useState(true);
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(name, isPlayer);
  };
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <TextField
          type="text"
          placeholder="Username"
          label="Username"
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
          label="Jogador"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default AddUser;
