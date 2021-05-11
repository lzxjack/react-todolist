import { combineReducers } from 'redux';

// import sum from './count';
// import flagState from './flag';
import userState from './userState';
import userInform from './userInform';

export default combineReducers({
    userState,
    userInform,
});
