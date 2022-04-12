import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, FormControlLabel, Switch } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    padding: 20,
    boxSizing: 'border-box',
    top: 0,
    left: 0,
    height: '50px',
  },
  buttonEnter: {
    padding: 5,
    width: '100px',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #d32f2f',
    color: '#d32f2f',
    background: '#fff',
    cursor: 'pointer',
    fontWeight: 600,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#d32f2f',
      color: '#fff',
    },
  },
});

interface Props {
  checked: boolean;
  onChange: (value: boolean) => void;
}

const Buttons: React.FC<Props> = ({ checked, onChange }): ReactElement => {
  const classes = useStyles();

  const [isPlayer, setIsPlayer] = React.useState(checked);

  const handleChange = (value: boolean): void => {
    setIsPlayer(value);
    onChange(value);
  };

  const exitRoom = () => {
    window.location.hash = `#/create-room`;
  };

  React.useEffect(() => {
    setIsPlayer(checked);
  }, [checked]);

  return (
    <div className={classes.root}>
      <FormControlLabel
        control={
          <Switch
            checked={isPlayer}
            onChange={(e) => handleChange(e.target.checked)}
          />
        }
        label="Jogador"
      />
      <div color="primary" className={classes.buttonEnter} onClick={exitRoom}>
        Sair da sala
      </div>
    </div>
  );
};

export default Buttons;
