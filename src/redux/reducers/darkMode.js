import { SWITCH_DARK } from '../constant';

// 初始状态
const initState = {
    isDark: false,
};

export default function addReducer(preState = initState, action) {
    const { type } = action;
    switch (type) {
        case SWITCH_DARK:
            // 取反
            return !preState.isDark;
        default:
            return preState;
    }
}
