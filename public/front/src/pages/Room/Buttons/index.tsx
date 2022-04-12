import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    width: '100px',
    margin: 10,
    borderRadius: 5,
    border: '2px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  disabled: {
    color: '#999',
    cursor: 'not-allowed',
  },
  buttonShow: {
    borderColor: '#7057de',
    color: '#7057de',
    fontWeight: 600,
    transition: '0.3s',
    '&:hover': {
      background: '#7057de',
      color: '#fff',
    },
  },
  buttonClear: {
    borderColor: '#d32f2f',
    color: '#d32f2f',
    fontWeight: 600,
    transition: '0.3s',
    '&:hover': {
      backgroundColor: '#d32f2f',
      color: '#fff',
    },
  },
});

interface Props {
  handleShow: () => void;
  handleClear: () => void;
  disabled?: boolean;
}

const Buttons: React.FC<Props> = ({
  handleShow,
  handleClear,
  disabled,
}): ReactElement => {
  const classes = useStyles();

  const handleClickShow = (): void => {
    if (!disabled) {
      handleShow();
    }
  };

  const handleClickClear = (): void => {
    if (!disabled) {
      handleClear();
    }
  };

  return (
    <div className={classes.root}>
      <div
        onClick={handleClickShow}
        className={`${classes.button} ${classes.buttonShow} ${
          disabled && classes.disabled
        }`}
      >
        Virar
      </div>
      <div
        onClick={handleClickClear}
        className={`${classes.button} ${classes.buttonClear} ${
          disabled && classes.disabled
        }`}
      >
        Limpar
      </div>
    </div>
  );
};

export default Buttons;
