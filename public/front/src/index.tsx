import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Version from './components/Version';
import Connect from './Connect';

import * as serviceWorker from './serviceWorkerRegistration';

const resources = ['Som quando todos os votos são iguais', 'Versão'];

ReactDOM.render(
  <React.StrictMode>
    <Connect>
      <App />
    </Connect>
    <Version version="v0.9.0" resources={resources} />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
