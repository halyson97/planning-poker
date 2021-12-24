import React, { ReactElement } from 'react';

const Disconnected: React.FC = (): ReactElement => {
  return (
    <div>
      <h1>Disconnected</h1>
      <p>You are disconnected from the server</p>
    </div>
  );
};

export default Disconnected;
