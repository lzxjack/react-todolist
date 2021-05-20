import { combineReducers } from 'redux';

// import sum from './count';
// import flagState from './flag';
import userState from './userState';
import userInform from './userInform';
import personalData from './personalData';
import tasks from './tasks';

export default combineReducers({
    userState,
    userInform,
    personalData,
    tasks,
});
