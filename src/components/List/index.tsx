import { TaskObj, storeState } from '../../utils/interface';
import { message } from 'antd';
import { VscCheck, VscChromeClose, VscArrowSwap } from 'react-icons/vsc';
import {
    getTasksAPI,
    finishTaskAPI,
    changeTaskAPI,
    updateTaskAPI,
    deleteTaskAPI,
    editCountAPI,
} from '../../utils/api';
import { connect } from 'react-redux';
import { setShort, setLong, setDone, addCount } from '../../redux/actions';
import s from './index.module.scss';

interface Props {
    isShort: boolean;
    short: TaskObj[];
    long: TaskObj[];
    setShort?: Function;
    setLong?: Function;
    setDone?: Function;
    addCount?: Function;
    configID?: string;
}

const List: React.FC<Props> = ({
    short,
    long,
    isShort,
    setShort,
    setLong,
    setDone,
    addCount,
    configID,
}) => {
    const getAllTasks = async (text: string, type: string) => {
        const { tasks: _tasks, isTrue } = await getTasksAPI();
        if (!isTrue) return;
        const short: TaskObj[] = _tasks.filter(item => !item.done && item.isShort);
        const long: TaskObj[] = _tasks.filter(item => !item.done && !item.isShort);
        const done: TaskObj[] = _tasks.filter(item => item.done);
        switch (type) {
            case 'short': {
                setShort && setShort(short);
                break;
            }
            case 'long': {
                setLong && setLong(long);
                break;
            }
            case 'short-long': {
                setShort && setShort(short);
                setLong && setLong(long);
                break;
            }
            case 'short-done': {
                setShort && setShort(short);
                setDone && setDone(done);
                break;
            }
            case 'long-done': {
                setLong && setLong(long);
                setDone && setDone(done);
                break;
            }
            default:
                break;
        }
        message.success(`${text}任务成功!`);
    };

    const finishTask = async (id: string) => {
        const isTrue = await finishTaskAPI(id);
        if (isTrue) {
            const _isTrue = await editCountAPI(configID as string, 1);
            _isTrue && addCount && addCount();
            getAllTasks('完成', isShort ? 'short-done' : 'long-done');
        } else {
            message.info('完成任务失败!');
        }
    };

    const changeTask = async (id: string) => {
        const isTrue = await changeTaskAPI(id, !isShort);
        isTrue ? getAllTasks('切换', 'short-long') : message.info('切换任务失败!');
    };

    const removeTask = (id: string, content: string) => {
        (document.getElementById(`${id}`) as HTMLInputElement).value = content;
    };

    const updateTask = async (e: any, id: string, oldContent: string) => {
        e.preventDefault();
        const newContent = (document.getElementById(`${id}`) as HTMLInputElement).value.trim();
        if (newContent === oldContent) {
            message.info('无需更新!');
            return;
        }
        if (newContent === '') {
            message.info('内容不能为空!');
            return;
        }
        const isTrue = await updateTaskAPI(id, newContent);
        isTrue ? getAllTasks('更新', isShort ? 'short' : 'long') : message.info('更新任务失败!');
    };

    const deleteTask = async (id: string) => {
        const isTrue = await deleteTaskAPI(id);
        isTrue ? getAllTasks('删除', isShort ? 'short' : 'long') : message.info('删除任务失败!');
    };

    return (
        <ul className={s.ListBox}>
            {(isShort ? short : long).map(item => (
                <li key={item._id}>
                    <div className={s.left} onClick={() => finishTask(item._id)}>
                        <VscCheck />
                    </div>
                    <div className={s.change} onClick={() => changeTask(item._id)}>
                        <VscArrowSwap />
                    </div>
                    <form onSubmit={(e: any) => updateTask(e, item._id, item.content)}>
                        <input
                            type="text"
                            id={item._id}
                            className={s.center}
                            defaultValue={item.content}
                            onBlur={() => removeTask(item._id, item.content)}
                        />
                    </form>
                    <div className={s.right} onClick={() => deleteTask(item._id)}>
                        <VscChromeClose />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default connect(
    (state: storeState) => ({
        short: state.short,
        long: state.long,
        configID: state.configID,
    }),
    { setShort, setLong, setDone, addCount }
)(List);
