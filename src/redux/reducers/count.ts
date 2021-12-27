import { ADD_COUNT, SUB_COUNT, SET_COUNT } from '../constant';

interface Action {
    type: string;
    data: number;
}

// 设定初始状态
const initState: number = 0;

export default function addReducer(preState = initState, action: Action) {
    const { type, data } = action;
    switch (type) {
        case ADD_COUNT:
            return preState + 1;
        case SUB_COUNT:
            return preState - 1;
        case SET_COUNT:
            return data;
        default:
            return preState;
    }
}
