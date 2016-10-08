import React, { Component } from 'react';

import { combineReducers, createStore, applyMiddleware } from 'redux';  
import { Provider } from 'react-redux';  
import createLogger from 'redux-logger'
import thunk from 'redux-thunk';  
import rootReducers from '../reducers/rootReducers'
import { View,Text } from 'react-native';

import App from './app';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);  
const store = createStoreWithMiddleware(rootReducers);


export default class Wrapper extends Component {  
  render() {
    return (
      
      <Provider store={store}>
        <App/>
      </Provider>
      
      
    );
  }
}
