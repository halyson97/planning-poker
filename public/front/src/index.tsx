import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Connect from './Connect';

import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <Connect>
      <App />
    </Connect>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
