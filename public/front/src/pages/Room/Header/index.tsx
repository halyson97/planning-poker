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
    height: '35px',
    border: '1px solid #e75155',
    borderRadius: '5px',
    color: '#e75155',
    background: '#fff',
    cursor: 'pointer',
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
      <Button
        color="primary"
        className={classes.buttonEnter}
        onClick={exitRoom}
      >
        Sair da sala
      </Button>
    </div>
  );
};

export default Buttons;
