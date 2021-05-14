import { ADD, MIN, INIT_FROM_DB, INIT_ID } from '../constant';

export const add = data => ({
    type: ADD,
    data,
});

export const min = data => ({
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
