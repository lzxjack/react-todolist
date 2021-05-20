import {
    ADD,
    MIN,
    INIT_FROM_DB,
    INIT_ID,
    CLEAR_USER_DATA,
    SWITCH_DARK,
    INIT_DARK,
} from '../constant';

// 初始状态
const initState = {
    count: 0,
    id: '',
    isDark: false,
};

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case ADD:
            return { count: preState.count + 1, id: preState.id, isDark: preState.isDark };
        case MIN:
            return { count: preState.count - 1, id: preState.id, isDark: preState.isDark };
        case INIT_FROM_DB:
            return { count: data, id: preState.id, isDark: preState.isDark };
        case INIT_ID:
            return { count: preState.count, id: data, isDark: preState.isDark };
        case CLEAR_USER_DATA:
            return { count: 0, id: '', isDark: false };
        case SWITCH_DARK:
            return { count: preState.count, id: preState.id, isDark: !preState.isDark };
        case INIT_DARK:
            return { count: preState.count, id: preState.id, isDark: data };
        default:
            return preState;
    }
}
