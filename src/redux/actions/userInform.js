import { UPDATE_AVATAR_URL, UPDATE_NICK_NAME } from '../constant';

export const updateAvatarUrl = data => ({
    type: UPDATE_AVATAR_URL,
    data,
});

export const updateNickName = data => ({
    type: UPDATE_NICK_NAME,
    data,
});
