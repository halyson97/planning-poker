import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { MdShare, MdContentCopy, MdDoneAll } from 'react-icons/md';

const useStyles = makeStyles({
  root: {
    width: 250,
    display: 'flex',
    position: 'fixed',
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    top: 10,
    left: 10,
    minHeight: 50,
    border: '1px solid #ccc',
    borderRadius: 8,
    height: 180,
    zIndex: 100,
  },
  title: {
    fontWeight: 'bold',
    padding: 0,
    boxSizing: 'border-box',
    width: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  code: {
    display: 'flex',
    textAlign: 'center',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '2rem',
    fontWeight: 600,
    padding: '20px',
    boxSizing: 'border-box',
  },
  icons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    display: 'flex',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    color: 'green',
  },
  copy: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCopy: {
    paddingRight: 5,
    boxSizing: 'border-box',
    transform: 'translateY(2px)',
  },
});

interface Props {
  code: string;
}

const Shared: React.FC<Props> = ({ code }): ReactElement => {
  const classes = useStyles();

  const [urlCopied, setUrlCopied] = React.useState(false);
  const [codeCopied, setCodeCopied] = React.useState(false);

  const copyUrlToClipboard = (): void => {
    navigator.clipboard.writeText(window.location.href);
    setUrlCopied(true);
    setTimeout(() => {
      setUrlCopied(false);
    }, 1000);
  };

  const copyCodeToClipboard = (): void => {
    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 1000);
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>Sala:</div>
      <div className={classes.code} onClick={copyCodeToClipboard}>
        {code}
      </div>
      <div className={classes.icons}>
        <div className={classes.item}>
          {urlCopied ? (
            <div className={classes.copy}>
              <MdDoneAll size={24} className={classes.iconCopy} /> Copiado
            </div>
          ) : (
            <Tooltip title="Compartilhar URL" arrow>
              <IconButton onClick={copyUrlToClipboard}>
                <MdShare />
              </IconButton>
            </Tooltip>
          )}
        </div>
        <div className={classes.item}>
          {codeCopied ? (
            <div className={classes.copy}>
              <MdDoneAll size={24} className={classes.iconCopy} /> Copiado
            </div>
          ) : (
            <Tooltip title="Copiar código" arrow>
              <IconButton onClick={copyCodeToClipboard}>
                <MdContentCopy />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shared;
