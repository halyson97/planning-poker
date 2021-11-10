import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel, Switch } from '@material-ui/core';

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
    </div>
  );
};

export default Buttons;
