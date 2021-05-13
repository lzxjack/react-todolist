import { ADD, MIN } from '../constant';

export const add = data => ({
    type: ADD,
    data,
});

export const min = data => ({
    type: MIN,
    data,
});
