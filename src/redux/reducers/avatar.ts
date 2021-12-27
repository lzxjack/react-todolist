import { SET_AVATAR } from '../constant';

interface AvatarAction {
    type: string;
    data: string;
}

// 设定初始状态
const initState: string = '';

export default function addReducer(preState = initState, action: AvatarAction) {
    const { type, data } = action;
    switch (type) {
        case SET_AVATAR:
            return data;
        default:
            return preState;
    }
}
