import { ADD, MIN } from '../constant';

// 初始状态
const initState = 0;

export default function addReducer(preState = initState, action) {
    const { type } = action;
    switch (type) {
        case ADD:
            return preState + 1;
        case MIN:
            return preState - 1;
        default:
            return preState;
    }
}
