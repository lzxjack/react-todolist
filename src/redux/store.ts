import { createStore } from 'redux';
import allReducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

export default createStore(allReducers, composeWithDevTools());
