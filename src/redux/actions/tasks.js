import {
    INIT_TASK,
    ADD_TASK,
    DELETE_TASK,
    FINISH_TASK,
    RETURN_TASK,
    EDIT_TASK,
    DELETE_ALL_DONE,
} from '../constant';

export const initTask = data => ({
    type: INIT_TASK,
    data,
});

export const addTask = data => ({
    type: ADD_TASK,
    data,
});

export const deleteTask = data => ({
    type: DELETE_TASK,
    data,
});

export const finishTask = data => ({
    type: FINISH_TASK,
    data,
});

export const returnTask = data => ({
    type: RETURN_TASK,
    data,
});

export const editTask = data => ({
    type: EDIT_TASK,
    data,
});

export const deleteAllDone = data => ({
    type: DELETE_ALL_DONE,
    data,
});
