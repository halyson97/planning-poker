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
    margin: 5,
    borderRadius: 5,
    border: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
});

interface Props {
  handleShow: () => void;
  handleClear: () => void;
}

const Buttons: React.FC<Props> = ({
  handleShow,
  handleClear,
}): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div onClick={handleShow} className={classes.button}>
        Virar
      </div>
      <div onClick={handleClear} className={classes.button}>
        Limpar
      </div>
    </div>
  );
};

export default Buttons;
