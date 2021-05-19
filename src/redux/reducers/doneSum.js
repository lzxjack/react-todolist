import { ADD, MIN, INIT_FROM_DB, INIT_ID, CLEAR_COUNT } from '../constant';

// 初始状态
const initState = {
    count: 0,
    id: '',
};

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case ADD:
            return { count: preState.count + 1, id: preState.id };
        case MIN:
            return { count: preState.count - 1, id: preState.id };
        case INIT_FROM_DB:
            return { count: data, id: preState.id };
        case INIT_ID:
            return { count: preState.count, id: data };
        case CLEAR_COUNT:
            return { count: 0, id: '' };
        default:
            return preState;
    }
}
