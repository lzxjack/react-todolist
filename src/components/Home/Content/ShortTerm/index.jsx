import React, { PureComponent, Fragment } from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    CheckOutlined,
    CloseOutlined,
    DoubleRightOutlined,
    SmileOutlined,
    SwapOutlined,
} from '@ant-design/icons';
import { db } from '../../../../utils/cloudBase';
import { addCount } from '../../../../redux/actions/doneSum';
import {
    addTask,
    deleteTask,
    finishTask,
    editTask,
    transTask,
} from '../../../../redux/actions/tasks';

import './index.css';

// const _ = db.command;

class ShortTerm extends PureComponent {
    // 添加任务
    addTask = e => {
        // 判断用户按下回车
        if (e.keyCode === 13) {
            // 判断输入框是否为空
            if (this.inputShortTask.value.trim() === '') {
                // 清空输入框
                this.inputShortTask.value = '';
                message.info('请输入todo...');
                return;
            }
            // 更新数据库
            db.collection('tasks')
                .add({
                    content: this.inputShortTask.value.trim(),
                    isShort: true,
                    done: false,
                })
                .then(async res => {
                    // 得到返回的数据库中的ID值
                    const { id } = await res;
                    // 构造一个新的数据
                    const addOne = {
                        _id: id,
                        content: this.inputShortTask.value.trim(),
                        isShort: true,
                        done: false,
                    };
                    // 更新redux状态
                    this.props.addTask(addOne);
                    // 清空输入框
                    this.inputShortTask.value = '';
                    message.success('添加成功！');
                });
        }
    };

    // 删除任务
    deleteTask = id => {
        // 删除redux中的记录
        this.props.deleteTask(id);
        // 提醒用户
        message.success('删除成功！');
        // 2. 再从数据库中删除数据
        db.collection('tasks').doc(id).remove();
    };

    // 完成任务
    finishTask = id => {
        // 在redux中完成任务
        this.props.finishTask(id);
        // 提醒用户
        message.success('完成啦！');
        // 累计完成总数+1
        this.props.addCount();
        // 发送请求，数据库中count+1
        db.collection('doneSum')
            .doc(this.props.id)
            .update({
                count: db.command.inc(1),
            });
        // 2. 在数据库中修改相应id的done属性
        db.collection('tasks').doc(id).update({
            done: true,
        });
    };

    // 失去焦点，不更新content
    returnContent = taskObj => {
        document.getElementById(`${taskObj._id}`).value = taskObj.content;
    };
    // 判断用户按下回车
    updateEditTask = (taskObj, e) => {
        // 按下回车
        if (e.keyCode === 13) {
            // 调用修改任务的方法（原内容，id）
            this.updateTaskById(taskObj.content, taskObj._id);
        }
    };
    // 修改任务：发送请求，根据相应id更改task内容
    updateTaskById = (oldContent, id) => {
        // 根据id获取input元素
        const task = document.getElementById(`${id}`);
        // 用户输入的值，去掉首尾空格
        const value = task.value.trim();
        // 判断是否修改：原内容是否等于用户输入的值去掉首尾空格
        if (oldContent === value) {
            task.blur();
            message.info('无需更新！');
            return;
        }
        // 判断新输入的任务是否为空
        if (value === '') {
            task.blur();
            message.info('任务内容不能为空！');
            return;
        }
        // 在redux中编辑任务
        this.props.editTask({ id, value });
        task.blur();
        message.success('修改成功！');
        // 发送请求，修改数据库中的值
        db.collection('tasks').doc(id).update({
            content: value,
        });
    };
    // 转变任务时效
    transTask = id => {
        // 在redux中转变任务
        this.props.transTask(id);
        // 提醒用户
        message.success('任务时效已更新，请在长期任务中查看！');
        // 2. 在数据库中修改相应id的done属性
        db.collection('tasks').doc(id).update({
            isShort: false,
        });
    };
    render() {
        return (
            <Fragment>
                <div className="taskType">
                    <DoubleRightOutlined />
                    &nbsp;ShortTerm
                    {this.props.tasks.filter(taskObj => {
                        return taskObj.done === false && taskObj.isShort === true;
                    }).length === 0 ? null : (
                        <span>
                            &nbsp;——&nbsp;
                            {
                                this.props.tasks.filter(taskObj => {
                                    return taskObj.done === false && taskObj.isShort === true;
                                }).length
                            }
                        </span>
                    )}
                </div>
                <div className="inputBox">
                    <input
                        type="text"
                        ref={c => (this.inputShortTask = c)}
                        onKeyUp={this.addTask}
                        placeholder="Add some ShortTerm-todos?"
                        className="inputTask"
                        autoFocus
                    />
                </div>
                {this.props.tasks.filter(taskObj => {
                    return taskObj.done === false && taskObj.isShort === true;
                }).length === 0 ? (
                    <div className="taskNull">
                        <div className="taskNullIcon">
                            <SmileOutlined />
                        </div>
                        <div className="taskNullText">Great, 你已完成所有短期任务！</div>
                    </div>
                ) : (
                    <ul className="taskBox">
                        {this.props.tasks
                            .filter(taskObj => {
                                return taskObj.done === false && taskObj.isShort === true;
                            })
                            .map(taskObj => {
                                return (
                                    <li key={taskObj._id}>
                                        <div
                                            className="taskDoneBtn"
                                            onClick={this.finishTask.bind(this, taskObj._id)}
                                        >
                                            <CheckOutlined />
                                        </div>
                                        <input
                                            type="text"
                                            onBlur={this.returnContent.bind(this, taskObj)}
                                            className="taskEdit"
                                            id={taskObj._id}
                                            defaultValue={taskObj.content}
                                            onKeyUp={this.updateEditTask.bind(this, taskObj)}
                                        />
                                        <div
                                            className="transTaskBtn"
                                            onClick={this.transTask.bind(this, taskObj._id)}
                                        >
                                            <SwapOutlined />
                                        </div>
                                        <div
                                            className="taskDeleteBtn"
                                            onClick={this.deleteTask.bind(this, taskObj._id)}
                                        >
                                            <CloseOutlined />
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                )}
            </Fragment>
        );
    }
}

export default withRouter(
    connect(
        state => ({
            id: state.doneSum.id,
            tasks: state.tasks,
        }),
        { addCount, addTask, deleteTask, finishTask, editTask, transTask }
    )(ShortTerm)
);