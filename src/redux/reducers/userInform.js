import { UPDATE_AVATAR_URL, UPDATE_NICK_NAME, UPDATE_AVATAR_TEMP_URL } from '../constant';

// 初始状态
const initState = {
    avatarUrl: '',
    avatarTempUrl: '',
    nickName: '',
};

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case UPDATE_AVATAR_URL:
            return {
                avatarUrl: data,
                avatarTempUrl: preState.avatarTempUrl,
                nickName: preState.nickName,
            };
        case UPDATE_AVATAR_TEMP_URL:
            return {
                avatarUrl: preState.avatarUrl,
                avatarTempUrl: data,
                nickName: preState.nickName,
            };
        case UPDATE_NICK_NAME:
            return {
                avatarUrl: preState.avatarUrl,
                avatarTempUrl: preState.avatarTempUrl,
                nickName: data,
            };
        default:
            return preState;
    }
}
