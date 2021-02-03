import 'react-native-gesture-handler';
import * as React from 'react';
import Router from './config/Router';
import { Provider } from "react-redux"
import store from "./store"


const App = () => {
  return ( 
      <Provider store={store}>
        <Router></Router>
      </Provider>   
  );
}

export default App;
