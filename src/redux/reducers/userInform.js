import {
    UPDATE_AVATAR_URL,
    UPDATE_NICK_NAME,
    UPDATE_AVATAR_TEMP_URL,
    UPDATE_USER_NAME,
    CLEAR_USER_INFO,
} from '../constant';

// 初始状态
const initState = {
    avatarUrl: '',
    avatarTempUrl: '',
    nickName: '',
    userName: '',
};

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case UPDATE_AVATAR_URL:
            return {
                avatarUrl: data,
                avatarTempUrl: preState.avatarTempUrl,
                nickName: preState.nickName,
                userName: preState.userName,
            };
        case UPDATE_AVATAR_TEMP_URL:
            return {
                avatarUrl: preState.avatarUrl,
                avatarTempUrl: data,
                nickName: preState.nickName,
                userName: preState.userName,
            };
        case UPDATE_NICK_NAME:
            return {
                avatarUrl: preState.avatarUrl,
                avatarTempUrl: preState.avatarTempUrl,
                nickName: data,
                userName: preState.userName,
            };
        case UPDATE_USER_NAME:
            return {
                avatarUrl: preState.avatarUrl,
                avatarTempUrl: preState.avatarTempUrl,
                nickName: preState.nickName,
                userName: data,
            };
        case CLEAR_USER_INFO:
            return {
                avatarUrl: '',
                avatarTempUrl: '',
                nickName: '',
                userName: '',
            };
        default:
            return preState;
    }
}
