import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { MdShare } from 'react-icons/md';
import ModalShared from './Modal';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    left: 5,
    top: 5,
  },
});

interface Props {
  code: string;
}

const Shared: React.FC<Props> = ({ code }): ReactElement => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Tooltip title="Compartilhar sala" arrow placement="right">
          <IconButton onClick={() => setOpen(true)}>
            <MdShare />
          </IconButton>
        </Tooltip>
      </div>
      {open && <ModalShared code={code} onClose={() => setOpen(false)} />}
    </React.Fragment>
  );
};

export default Shared;
