import { useState } from 'react';
import { TaskObj } from '../../utils/interface';
import { getTasksAPI, addTaskAPI } from '../../utils/api';
import { message } from 'antd';
import { connect } from 'react-redux';
import { setShort, setLong } from '../../redux/actions';
import s from './index.module.scss';

interface Props {
    isShort: boolean;
    setShort?: Function;
    setLong?: Function;
}

const Input: React.FC<Props> = ({ isShort, setShort, setLong }) => {
    const [input, setInput] = useState('');

    const getAllTasks = async () => {
        const { tasks, isTrue } = await getTasksAPI();
        if (isTrue) {
            message.success('添加任务成功!');
            setInput('');
            if (isShort) {
                const short: TaskObj[] = tasks.filter(item => !item.done && item.isShort);
                setShort && setShort(short);
            } else {
                const long: TaskObj[] = tasks.filter(item => !item.done && !item.isShort);
                setLong && setLong(long);
            }
        }
    };

    const addTask = async (e: any) => {
        e.preventDefault();
        const content = input.trim();
        if (!content) {
            message.info('请输入任务内容!');
            setInput('');
            return;
        }
        const isTrue = await addTaskAPI(isShort, content);
        isTrue ? getAllTasks() : message.info('添加任务失败!');
    };

    return (
        <form onSubmit={(e: any) => addTask(e)} className={s.InputBox}>
            <input
                type="text"
                placeholder="Add a todo here..."
                value={input}
                onChange={e => setInput(e.target.value)}
            />
        </form>
    );
};

export default connect(null, { setShort, setLong })(Input);
