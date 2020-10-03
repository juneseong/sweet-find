import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './root-reducer';

const store = (preloadedState = {}) => (
    createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
);

export default store;