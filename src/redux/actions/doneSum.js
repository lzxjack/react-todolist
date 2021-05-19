import { ADD, MIN, INIT_FROM_DB, INIT_ID, CLEAR_COUNT } from '../constant';

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

export const clearCount = data => ({
    type: CLEAR_COUNT,
    data,
});
