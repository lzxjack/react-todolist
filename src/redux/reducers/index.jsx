import { combineReducers } from 'redux';

// import sum from './count';
// import flagState from './flag';
import userState from './userState';
import userInform from './userInform';
import doneSum from './doneSum';
import tasks from './tasks';
import darkMode from './darkMode';

export default combineReducers({
    userState,
    userInform,
    doneSum,
    tasks,
    darkMode,
});
