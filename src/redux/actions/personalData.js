import {
    ADD,
    MIN,
    INIT_FROM_DB,
    INIT_ID,
    CLEAR_USER_DATA,
    SWITCH_DARK,
    INIT_DARK,
} from '../constant';

export const addCount = data => ({
    type: ADD,
    data,
});

export const minCount = data => ({
    type: MIN,
    data,
});

export const initFromDB = data => ({
    type: INIT_FROM_DB,
    data,
});

export const initID = data => ({
    type: INIT_ID,
    data,
});

export const clearUserData = data => ({
    type: CLEAR_USER_DATA,
    data,
});

export const switchDark = data => ({
    type: SWITCH_DARK,
    data,
});

export const initDark = data => ({
    type: INIT_DARK,
    data,
});
