import { combineReducers } from 'redux';

import avatar from './avatar';
import login from './login';
import done from './done';
import long from './long';
import short from './short';
import count from './count';
import configID from './configID';

export default combineReducers({
    avatar,
    login,
    done,
    long,
    short,
    count,
    configID,
});
