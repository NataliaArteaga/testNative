import 'react-native-gesture-handler';
import * as React from 'react';
import Router from './config/Router';
import { Provider } from "react-redux"
import store from "./store"
import SQLite from 'react-native-sqlite-storage';

global.db = SQLite.openDatabase(
  {
    name: 'SQLite.db',
  },
  () => { },
  error => {
    console.log("ERROR: " + error);
  }
);

const App = () => {
  return ( 
      <Provider store={store}>
        <Router></Router>
      </Provider>   
  );
}

export default App;
