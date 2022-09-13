import React, { ReactElement } from 'react';
import { v4 as uuid } from 'uuid';
import { Manager } from 'socket.io-client';

import config from './config/config';
import Loading from './components/Loading';
import Disconnected from './components/Disconnected';

const manager = new Manager(config.urlServer);
const socket = manager.socket('/room');

const Connect: React.FC = ({ children }): ReactElement => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [isDisconnected, setIsDisconnected] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const id = localStorage.getItem('id') || uuid();
    localStorage.setItem('id', id);

    socket.on('is-connected', () => {
      setTimeout(() => {
        setIsConnected(true);
        setIsLoading(false);
      }, 3000);
    });
    socket.on('is-disconnected', () => {
      setIsDisconnected(true);
      setIsLoading(false);
    });

    socket.emit('verify-connect', { id });

    return () => {
      if (isConnected) {
        socket.emit('on-disconnect', { id });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isDisconnected) {
    return <Disconnected />;
  }

  return <React.Fragment>{isConnected && children}</React.Fragment>;
};

export default Connect;
