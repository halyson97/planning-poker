import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControlLabel,
  IconButton,
  Switch,
  Tooltip,
} from '@material-ui/core';
import { MdVolumeUp, MdVolumeOff } from 'react-icons/md';
import { TypeGameEnum } from '../../../interfaces/typeGame';

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

  typeGame: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px solid #7057de',
    boxSizing: 'border-box',
    borderRadius: 5,
    marginRight: 10,
    transition: '0.4s',
    fontWeight: 600,
    height: 32,
  },
  typeGameItem: {
    width: 100,
    height: '100%',
    boxSizing: 'border-box',
    background: '#7057de',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      background: '#7057de',
      color: '#fff',
    },
    '&:first-child': {
      borderRight: '1px solid #fff',
    },
  },
  typeGameItemNotSelected: {
    background: '#fff',
    color: '#7057de',
  },
  disabled: {
    pointerEvents: 'none',
  },

  sounds: {
    padding: 5,
    boxSizing: 'border-box',
  },
});

interface Props {
  checked: boolean;
  isSoundActive: boolean;
  typeGame: TypeGameEnum;
  onChange: (value: boolean) => void;
  onChangeSounds: (value: boolean) => void;
  onChangeTypeGame: (type: TypeGameEnum) => void;
}

const Buttons: React.FC<Props> = ({
  checked,
  isSoundActive,
  onChange,
  typeGame,
  onChangeTypeGame,
  onChangeSounds,
}): ReactElement => {
  const classes = useStyles();

  const [isPlayer, setIsPlayer] = React.useState(checked);

  const handleChange = (value: boolean): void => {
    setIsPlayer(value);
    onChange(value);
  };

  const handleChangeTypeGame = (type: TypeGameEnum) => {
    if (type !== typeGame) {
      onChangeTypeGame(type);
    }
  };

  const exitRoom = () => {
    window.location.hash = `#/create-room`;
  };

  const handleChangeSounds = (value: boolean): void => {
    onChangeSounds(value);
  };

  React.useEffect(() => {
    setIsPlayer(checked);
  }, [checked]);

  return (
    <div className={classes.root}>
      <div className={classes.typeGame}>
        <div
          className={`${classes.typeGameItem} ${
            typeGame === TypeGameEnum.fibonacci &&
            classes.typeGameItemNotSelected
          } ${!checked && classes.disabled}`}
          onClick={() => handleChangeTypeGame(TypeGameEnum.default)}
        >
          Tradicional
        </div>
        <div
          className={`${classes.typeGameItem} ${
            typeGame === TypeGameEnum.default && classes.typeGameItemNotSelected
          } ${!checked && classes.disabled}`}
          onClick={() => handleChangeTypeGame(TypeGameEnum.fibonacci)}
        >
          Fibonacci
        </div>
      </div>
      <div className={classes.sounds}>
        <Tooltip title={isSoundActive ? 'Desativar som' : 'Ativar som'} arrow>
          <IconButton onClick={() => handleChangeSounds(!isSoundActive)}>
            {isSoundActive ? <MdVolumeUp /> : <MdVolumeOff />}
          </IconButton>
        </Tooltip>
      </div>
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
