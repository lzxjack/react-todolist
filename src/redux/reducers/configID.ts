import { SET_CONFIG_ID } from '../constant';

interface Action {
    type: string;
    data: string;
}

// 设定初始状态
const initState: string = '';

export default function addReducer(preState = initState, action: Action) {
    const { type, data } = action;
    switch (type) {
        case SET_CONFIG_ID:
            return data;
        default:
            return preState;
    }
}
