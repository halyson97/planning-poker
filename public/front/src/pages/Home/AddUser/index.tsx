import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '200px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
  },
  button: {
    height: '35px',
    border: '1px solid #7057de',
    borderRadius: '5px',
    color: '#fff',
    background: '#7057de',
    cursor: 'pointer',
  },
});

interface Props {
  onSubmit: (name: string) => void;
}

const AddUser: React.FC<Props> = ({ onSubmit }): ReactElement => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    onSubmit(name);
  };
  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <input
          type="text"
          placeholder="username"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={classes.input}
          required
        />
        <button className={classes.button} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default AddUser;
