import { SET_LOGIN } from '../constant';

// 设定初始状态
const initState: boolean = false;

interface LoginAction {
    type: string;
    data: boolean;
}

export default function addReducer(preState = initState, action: LoginAction) {
    const { type, data } = action;
    switch (type) {
        case SET_LOGIN:
            return data;
        default:
            return preState;
    }
}
