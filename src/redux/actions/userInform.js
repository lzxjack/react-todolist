import {
    UPDATE_AVATAR_URL,
    UPDATE_NICK_NAME,
    UPDATE_AVATAR_TEMP_URL,
    UPDATE_USER_NAME,
    CLEAR_USER_INFO,
} from '../constant';

export const updateAvatarUrl = data => ({
    type: UPDATE_AVATAR_URL,
    data,
});

export const updateNickName = data => ({
    type: UPDATE_NICK_NAME,
    data,
});

export const updateAvatarTempUrl = data => ({
    type: UPDATE_AVATAR_TEMP_URL,
    data,
});

export const updateUserName = data => ({
    type: UPDATE_USER_NAME,
    data,
});

export const clearUserInfo = data => ({
    type: CLEAR_USER_INFO,
    data,
});
