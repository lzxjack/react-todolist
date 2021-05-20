// 判断用户登录状态
export const LOGIN = 'login';
export const LOGOUT = 'logout';

// 用户信息
export const UPDATE_AVATAR_URL = 'updateAvatarUrl';
export const UPDATE_AVATAR_TEMP_URL = 'updateAvatarTempUrl';
export const UPDATE_NICK_NAME = 'updateNickName';
export const UPDATE_USER_NAME = 'updateUserName';
export const CLEAR_USER_INFO = 'clearUserInfo';

// 用户个人数据（任务计数、黑暗模式数据）
// 记录用户累计完成任务的总数
export const ADD = 'add';
export const MIN = 'min';
export const INIT_FROM_DB = 'initFromDB';
export const INIT_ID = 'initID';
export const CLEAR_USER_DATA = 'clearUserData';
// 黑暗模式
export const SWITCH_DARK = 'switchDark';
export const INIT_DARK = 'initDark';

// 对任务相关的操作
export const INIT_TASK = 'initTask';
export const ADD_TASK = 'addTask';
export const DELETE_TASK = 'deleteTask';
export const FINISH_TASK = 'finishTask';
export const RETURN_TASK = 'returnTask';
export const EDIT_TASK = 'editTask';
export const DELETE_ALL_DONE = 'deleteAllDone';
export const TRANS_TASK = 'transTask';
export const CLEAR_TASK = 'clearTask';
