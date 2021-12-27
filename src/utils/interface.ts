// 单个任务对象
export interface TaskObj {
    _id: string;
    _openid?: string;
    content: string;
    done: boolean;
    isShort: boolean;
}

// redux-store
export interface storeState {
    avatar: string;
    login: boolean;
    short: TaskObj[];
    long: TaskObj[];
    done: TaskObj[];
    configID: string;
    count: number;
}
