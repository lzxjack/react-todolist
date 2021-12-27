import { db, app, _ } from './cloudbase';
import { nanoid } from 'nanoid';

// 获得所有任务
export const getTasksAPI = () => {
    return db
        .collection('tasks')
        .limit(1000)
        .get()
        .then(res => {
            return { tasks: res.data, isTrue: true };
        })
        .catch(() => ({ tasks: [], isTrue: false }));
};

// 添加任务
export const addTaskAPI = (isShort: boolean, content: string) => {
    return db
        .collection('tasks')
        .add({
            content,
            isShort,
            done: false,
        })
        .then(() => true)
        .catch(() => false);
};

// 完成任务
export const finishTaskAPI = (id: string) => {
    return db
        .collection('tasks')
        .doc(id)
        .update({
            done: true,
        })
        .then(() => true)
        .catch(() => false);
};

// 切换任务时效
export const changeTaskAPI = (id: string, isShort: boolean) => {
    return db
        .collection('tasks')
        .doc(id)
        .update({
            isShort,
        })
        .then(() => true)
        .catch(() => false);
};

// 更新任务
export const updateTaskAPI = (id: string, content: string) => {
    return db
        .collection('tasks')
        .doc(id)
        .update({
            content,
        })
        .then(() => true)
        .catch(() => false);
};

// 删除任务
export const deleteTaskAPI = (id: string) => {
    return db
        .collection('tasks')
        .doc(id)
        .remove()
        .then(() => true)
        .catch(() => false);
};

// 删除所有已完成任务
export const deleteDoneTasksAPI = () => {
    return db
        .collection('tasks')
        .where({
            done: true,
        })
        .remove()
        .then(() => true)
        .catch(() => false);
};

// 恢复已完成的任务
export const recoverTaskAPI = (id: string) => {
    return db
        .collection('tasks')
        .doc(id)
        .update({
            done: false,
        })
        .then(() => true)
        .catch(() => false);
};

export const upToCosAPI = (fileEnd: File, avatarFile: string) => {
    return app
        .uploadFile({
            cloudPath: `userAvatar/${nanoid()}.${fileEnd}`,
            filePath: avatarFile,
        })
        .then(res => ({ isTrue: true, res }))
        .catch(() => ({ isTrue: false, res: {} }));
};

export const updateAvatarAPI = (id: string, avatarUrl: string) => {
    return db
        .collection('config')
        .doc(id)
        .update({
            avatar: avatarUrl,
        })
        .then(() => true)
        .catch(() => false);
};

export const createConfigAPI = () => {
    return db
        .collection('config')
        .add({
            count: 0,
            avatar: '',
        })
        .then(res => ({
            isTrue: true,
            res,
        }))
        .catch(() => ({
            isTrue: false,
            res: {},
        }));
};

export const getConfigAPI = () => {
    return db
        .collection('config')
        .get()
        .then(res => ({
            isTrue: true,
            isFirst: !res.data.length,
            res,
        }))
        .catch(() => ({
            isTrue: false,
            isFirst: true,
            res: {},
        }));
};

export const editCountAPI = (id: string, num: number) => {
    return db
        .collection('config')
        .doc(id)
        .update({
            count: _.inc(num),
        })
        .then(() => true)
        .catch(() => false);
};
