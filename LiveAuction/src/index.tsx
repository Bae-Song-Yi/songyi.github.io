import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const pathname = window.location.pathname;
// WARNING: 다른 root path 로 시작 되는 경우 수정 해야 함
if (!pathname.startsWith(process.env.PUBLIC_URL)) {
  window.location.href = '/Home/Error';
}

const store = configureStore();
const rootDom = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  rootDom,
);

registerServiceWorker();
