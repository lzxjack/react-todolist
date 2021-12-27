import { SET_LONG } from '../constant';

import { TaskObj } from '../../utils/interface';

interface TasksAction {
    type: string;
    data: TaskObj[];
}

// 设定初始状态
const initState: TaskObj[] = [];

export default function addReducer(preState = initState, action: TasksAction) {
    const { type, data } = action;
    switch (type) {
        case SET_LONG:
            return data;
        default:
            return preState;
    }
}
