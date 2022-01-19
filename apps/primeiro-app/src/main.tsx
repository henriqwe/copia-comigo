import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import './styles.css'

import App from './components/App/app';

ReactDOM.render(
  <StrictMode>
    <div className={"bg-gray-500 p-10"}>
      <App />
    </div>
  </StrictMode>,
  document.getElementById('root')
);
