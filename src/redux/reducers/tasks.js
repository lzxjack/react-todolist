import {
    INIT_TASK,
    ADD_TASK,
    DELETE_TASK,
    FINISH_TASK,
    RETURN_TASK,
    EDIT_TASK,
    DELETE_ALL_DONE,
    TRANS_TASK,
} from '../constant';

// 初始状态
const initState = [];

export default function addReducer(preState = initState, action) {
    const { type, data } = action;
    switch (type) {
        case INIT_TASK:
            // 传数组
            return data;
        case ADD_TASK:
            // 传数组
            // return [data, ...preState];
            return [...preState, data];
        case DELETE_TASK: {
            // 传id
            const newTask = preState.filter(taskObj => {
                return taskObj._id !== data;
            });
            return newTask;
        }
        case DELETE_ALL_DONE: {
            const newTask = preState.filter(taskObj => {
                return taskObj.done === false;
            });
            return newTask;
        }
        case FINISH_TASK: {
            // 传id
            const newTask = preState.map(taskObj => {
                if (taskObj._id === data) taskObj.done = true;
                return taskObj;
            });
            return newTask;
        }
        case RETURN_TASK: {
            // 传id
            const newTask = preState.map(taskObj => {
                if (taskObj._id === data) taskObj.done = false;
                return taskObj;
            });
            return newTask;
        }
        case TRANS_TASK: {
            // 传id
            const newTask = preState.map(taskObj => {
                if (taskObj._id === data) taskObj.isShort = !taskObj.isShort;
                return taskObj;
            });
            return newTask;
        }
        case EDIT_TASK: {
            // 传data对象
            // data:{id:xxx,value:xxx}
            const newTask = preState.map(taskObj => {
                // 找到对应的id值，修改相应的数据
                // value已经去掉首尾空格了
                if (taskObj._id === data.id) taskObj.content = data.value;
                return taskObj;
            });
            return newTask;
        }
        default:
            return preState;
    }
}
