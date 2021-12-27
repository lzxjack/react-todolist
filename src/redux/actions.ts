import {
    SET_LOGIN,
    SET_SHORT,
    SET_LONG,
    SET_DONE,
    SET_AVATAR,
    ADD_COUNT,
    SUB_COUNT,
    SET_COUNT,
    SET_CONFIG_ID,
} from './constant';

import { TaskObj } from '../utils/interface';

export const setLogin = (data: boolean) => ({
    type: SET_LOGIN,
    data,
});

export const setAvatar = (data: string) => ({
    type: SET_AVATAR,
    data,
});

export const setShort = (data: TaskObj[]) => ({
    type: SET_SHORT,
    data,
});

export const setLong = (data: TaskObj[]) => ({
    type: SET_LONG,
    data,
});

export const setDone = (data: TaskObj[]) => ({
    type: SET_DONE,
    data,
});

export const setConfigID = (data: string) => ({
    type: SET_CONFIG_ID,
    data,
});

export const addCount = (data: number) => ({
    type: ADD_COUNT,
    data,
});

export const subCount = (data: number) => ({
    type: SUB_COUNT,
    data,
});

export const setCount = (data: number) => ({
    type: SET_COUNT,
    data,
});
