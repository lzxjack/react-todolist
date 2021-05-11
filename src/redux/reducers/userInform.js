import { UPDATE_AVATAR_URL, UPDATE_NICK_NAME } from '../constant';

// 初始状态
const initState = {
    avatarUrl: '000',
    nickName: '000',
};

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case UPDATE_AVATAR_URL:
            return { avatarUrl: data, nickName: preState.nickName };
        case UPDATE_NICK_NAME:
            return { avatarUrl: preState.avatarUrl, nickName: data };
        default:
            return preState;
    }
}
