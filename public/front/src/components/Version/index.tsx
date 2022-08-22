import React, { ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
import animationData from './confetti.json';

const useStyles = makeStyles({
  version: {
    position: 'fixed',
    zIndex: 99999,
    bottom: 5,
    left: 5,
    fontSize: 12,
    color: '#777',
    background: 'red',
    padding: 10,
    boxSizing: 'border-box',
    cursor: 'pointer',
  },
  glass: {
    background: 'rgba( 255, 255, 255, 0.35 )',
    backdropFilter: 'blur( 5px )',
    borderRadius: 8,
    border: '1px solid rgba( 200, 200, 200, 0.18 )',
  },

  modal: {
    position: 'fixed',
    zIndex: 99999,
    bottom: 55,
    left: 5,
    opacity: 0,
    padding: 10,
    boxSizing: 'border-box',
    boxShadow: '#d3d9df 0px 0px 10px',
    width: 300,
    height: 300,
    color: '#444',
    animation: `$fadein 0.5s forwards`,
  },
  animation: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  title: {},
  resources: {},
  list: {
    listStyleType: 'circle',
  },

  '@keyframes fadein': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
});

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

interface Props {
  version: string;
  resources: string[];
}

const Version: React.FC<Props> = ({ version, resources }): ReactElement => {
  const classes = useStyles();

  const [showModal, setShowModal] = React.useState(true);

  return (
    <React.Fragment>
      {showModal && (
        <div className={`${classes.modal} ${classes.glass}`}>
          <div className={classes.animation}>
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
          <div className={classes.title}>Novidades</div>
          <div className={classes.resources}>
            <ul className={classes.list}>
              {resources.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <div
        className={`${classes.version} ${classes.glass}`}
        onMouseEnter={() => setShowModal(true)}
        onMouseLeave={() => setShowModal(false)}
      >
        {version}
      </div>
    </React.Fragment>
  );
};

export default Version;
