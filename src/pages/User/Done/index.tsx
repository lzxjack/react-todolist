import { message } from 'antd';
import { VscChromeClose, VscTrash } from 'react-icons/vsc';
import { GrRotateLeft } from 'react-icons/gr';
import { TaskObj, storeState } from '../../../utils/interface';
import {
    getTasksAPI,
    deleteTaskAPI,
    deleteDoneTasksAPI,
    recoverTaskAPI,
    editCountAPI,
} from '../../../utils/api';
import { connect } from 'react-redux';
import { setShort, setLong, setDone, subCount } from '../../../redux/actions';
import None from '../../../components/None';
import s from './index.module.scss';

interface Props {
    done?: TaskObj[];
    setShort?: Function;
    setLong?: Function;
    setDone?: Function;
    subCount?: Function;
    configID?: string;
    count?: number;
}

const Done: React.FC<Props> = ({ done, setShort, setLong, setDone, configID, subCount, count }) => {
    const getAllTasks = async (text: string, type: string) => {
        const { tasks: _task, isTrue } = await getTasksAPI();
        if (!isTrue) return;
        const short: TaskObj[] = _task.filter(item => !item.done && item.isShort);
        const long: TaskObj[] = _task.filter(item => !item.done && !item.isShort);
        const done: TaskObj[] = _task.filter(item => item.done);
        switch (type) {
            case 'done': {
                setDone && setDone(done);
                break;
            }
            case 'all': {
                setShort && setShort(short);
                setLong && setLong(long);
                setDone && setDone(done);
                break;
            }
            default:
                break;
        }
        message.success(`${text}任务成功!`);
    };

    const deleteTask = async (id: string) => {
        const isTrue = await deleteTaskAPI(id);
        isTrue ? getAllTasks('删除', 'done') : message.info('删除任务失败!');
    };

    const deleteDoneTasks = async () => {
        if (done && done.length === 0) {
            message.info('无需删除!');
            return;
        }
        const isTrue = await deleteDoneTasksAPI();
        isTrue ? getAllTasks('删除', 'done') : message.info('删除任务失败!');
    };

    const recoverTask = async (id: string) => {
        const isTrue = await recoverTaskAPI(id);
        if (isTrue) {
            const _isTrue = await editCountAPI(configID as string, -1);
            _isTrue && subCount && subCount();
            getAllTasks('恢复', 'all');
        } else {
            message.info('恢复任务失败!');
        }
    };

    return (
        <div className={s.DoneBox}>
            <div className={s.btnBox}>
                <div className={s.deleteAll} onClick={deleteDoneTasks}>
                    <VscTrash />
                </div>
                <span>Done: {count}</span>
                {/* <span>Add a todo here...</span> */}
            </div>

            {done && done.length ? (
                <ul>
                    {done.map((item: TaskObj) => (
                        <li key={item._id}>
                            <div className={s.left} onClick={() => recoverTask(item._id)}>
                                <GrRotateLeft />
                            </div>
                            <form>
                                <input
                                    type="text"
                                    className={s.center}
                                    value={item.content}
                                    disabled
                                />
                            </form>
                            <div className={s.right}>
                                <VscChromeClose onClick={() => deleteTask(item._id)} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <None />
            )}
        </div>
    );
};

export default connect(
    (state: storeState) => ({
        done: state.done,
        configID: state.configID,
        count: state.count,
    }),
    { setShort, setLong, setDone, subCount }
)(Done);
