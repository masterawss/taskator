import React from "react";
import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

import {store, persistor} from './store'

import Routes from "./Routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}