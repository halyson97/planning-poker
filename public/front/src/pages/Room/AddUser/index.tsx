import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  TextField,
  Button,
  Switch,
  Typography,
} from '@material-ui/core';

import { cardsBack, CardOption } from '../ListUsers/cards';

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
    padding: 10,
    boxSizing: 'border-box',
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
    margin: 'auto',
    marginTop: 20,
  },

  contentCards: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '10px 10px',
    maxWidth: 500,
    flexWrap: 'wrap',
    '@media (max-width:500px)': {
      justifyContent: 'center',
    },
  },
  card: {
    width: 70,
    height: 115.5,
    background: 'blue',
    borderRadius: 8,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: '0px 5px',
    cursor: 'pointer',
    transition: '0.1s',
    filter: 'grayscale(1)',
    '&:hover': {
      transform: 'scale(1.1)',
      filter: 'grayscale(0)',
    },
  },
  cardSelected: {
    transform: 'scale(1.1)',
    filter: 'grayscale(0)',
  },

  error: {
    color: 'red',
    animation: `$transform 0.5s forwards`,
  },

  '@keyframes transform': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.01)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
});

interface Props {
  onSubmit: (name: string, isPlayer: boolean, cardSelected: CardOption) => void;
}

const AddUser: React.FC<Props> = ({ onSubmit }): ReactElement => {
  const classes = useStyles();

  const [name, setName] = React.useState('');
  const [isPlayer, setIsPlayer] = React.useState(true);
  const [cardSelected, setCardSelected] = React.useState<CardOption>();
  const [error, setError] = React.useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!cardSelected) {
      setError(true);
      return;
    }
    onSubmit(name, isPlayer, cardSelected);
  };

  const handleCardSelected = (card: CardOption) => {
    setCardSelected(card);
    setError(false);
  };

  React.useEffect(() => {
    const userSaved = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user') || '')
      : null;

    if (userSaved) {
      setName(userSaved.username);
      setIsPlayer(userSaved.isPlayer);
    }
  }, []);

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <Typography variant="body1" component="h3" className={classes.title}>
          Informe o seu usuário
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

        <div>
          <Typography
            variant="body1"
            component="h4"
            className={error ? classes.error : undefined}
          >
            Selecione a sua carta
          </Typography>
          <div className={classes.contentCards}>
            {cardsBack?.map((card: CardOption) => (
              <div
                key={card.id}
                className={`${classes.card} ${
                  cardSelected?.id === card.id && classes.cardSelected
                }`}
                style={{
                  backgroundImage: `url(${card.card})`,
                }}
                onClick={() => handleCardSelected(card)}
              ></div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Entrar
        </Button>

        <div className={classes.terms}>
          <Typography>
            Ao continuar você concorda com nossos{' '}
            <span className={classes.link}>termos de uso e privacidade</span>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
