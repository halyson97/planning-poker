import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import { MdShare, MdContentCopy, MdDoneAll, MdClose } from 'react-icons/md';

const useStyles = makeStyles({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    position: 'relative',
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    boxSizing: 'border-box',
    transition: '0.3s',
    minHeight: 50,
    border: '1px solid #ccc',
    borderRadius: 8,
    height: 180,
    zIndex: 100,
    backgroundColor: '#fff',
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
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 5,
    cursor: 'pointer',
    color: '#ff0000',
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
  onClose: () => void;
}

const ModalShared: React.FC<Props> = ({ code, onClose }): ReactElement => {
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

  const stopEvents = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.root} onClick={stopEvents}>
        <div className={classes.title}>Sala:</div>
        <div className={classes.close}>
          <MdClose onClick={onClose} size={20} />
        </div>
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
              <Tooltip title="Compartilhar URL" arrow placement="top">
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
              <Tooltip title="Compartilhar código" arrow placement="top">
                <IconButton onClick={copyCodeToClipboard}>
                  <MdContentCopy />
                </IconButton>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalShared;
