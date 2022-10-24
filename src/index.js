import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import store from './redux/configStore';
import {PersistGate} from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";
import App from './App';

const persist = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persist}>
      <App/>
    </PersistGate>

  </Provider>
);
