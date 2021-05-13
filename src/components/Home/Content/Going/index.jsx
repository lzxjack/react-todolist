import React, { Component, Fragment } from 'react';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    CheckOutlined,
    CloseOutlined,
    DoubleRightOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { db } from '../../../../utils/cloudBase';
import { add } from '../../../../redux/actions/doneSum';
import './index.css';

const _ = db.command;

class Going extends Component {
    // 状态初始化
    // state = { isLoading: true };

    state = { going: [], isLoading: true };

    componentDidMount() {
        // 首先获得所有未完成的任务
        this.getGoingTask();
        // this.setState({ isLoading: false });
    }

    // 获得所有正在进行的任务
    getGoingTask = () => {
        db.collection('tasks')
            .where({
                done: _.eq(false),
            })
            .get()
            .then(res => {
                // 将返回的结果存放在state中
                // this.setState({ going: res.data });
                this.setState({ going: res.data, isLoading: false });
            });
    };
    // 添加任务
    addTask = e => {
        // console.log(this.inputTask.value);
        // 判断用户按下回车
        if (e.keyCode === 13) {
            // 判断输入框会否为空
            if (this.inputTask.value.trim() === '') {
                // 清空输入框
                this.inputTask.value = '';
                message.info('请输入todo...');
                return;
            }
            // 更新数据库
            db.collection('tasks')
                .add({
                    content: this.inputTask.value.trim(),
                    done: false,
                })
                .then(async res => {
                    // 获取旧状态
                    const { going } = this.state;
                    const { id } = await res;
                    const addOne = { _id: id, content: this.inputTask.value.trim(), done: false };
                    // 更新状态
                    this.setState({ going: [...going, addOne] });
                    // 清空输入框
                    this.inputTask.value = '';
                    message.success('添加成功！');
                });
        }
    };
    // 从状态中删除相应id任务
    deleteTaskInState = id => {
        // 获取旧状态
        const { going } = this.state;
        // 将相应id的数据去除，返回新的数据
        const newGoing = going.filter(taskObj => {
            return taskObj._id !== id;
        });
        // 新数据更新状态，渲染页面
        this.setState({ going: newGoing });
    };

    // 删除任务
    deleteTask = id => {
        // 1. 首先删除state中的相应数据，重新渲染页面
        this.deleteTaskInState(id);
        // 提醒用户
        message.success('删除成功！');
        // 2. 再从数据库中删除数据
        db.collection('tasks').doc(id).remove();
    };

    // 完成任务
    finishTask = id => {
        // 1. 首先删除state中的相应数据，重新渲染页面
        this.deleteTaskInState(id);
        // 提醒用户
        message.success('完成啦！');
        // 累计完成总数+1
        this.props.add();
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
    updateEditTask = (id, e) => {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            this.updateTaskById(id);
        }
    };
    // 发送请求，根据相应id更改task内容
    updateTaskById = id => {
        const task = document.getElementById(`${id}`);
        // 先在状态中更改相应的值，早点渲染页面
        // 获取旧状态
        const { going } = this.state;
        going.forEach(taskObj => {
            if (taskObj._id === id) taskObj.content = task.value;
        });
        // 新数据更新状态，渲染页面
        this.setState({ going });
        task.blur();
        message.success('修改成功！');
        // 发送请求，修改数据库中的值
        db.collection('tasks').doc(id).update({
            content: task.value,
        });
    };
    render() {
        return (
            <Fragment>
                <div className="Going">
                    <DoubleRightOutlined />
                    &nbsp;Going
                    {this.state.going.length === 0 ? null : (
                        <span>&nbsp;——&nbsp;{this.state.going.length}</span>
                    )}
                </div>
                <div className="inputBox">
                    <input
                        type="text"
                        ref={c => (this.inputTask = c)}
                        onKeyUp={this.addTask}
                        placeholder="Add some todos?"
                        className="inputTask"
                        autoFocus
                    />
                </div>
                {this.state.isLoading ? null : this.state.going.length === 0 ? (
                    <div className="goingNull">
                        <div className="goingNullIcon">
                            <SmileOutlined />
                        </div>
                        <div className="goingNullText">Great, 你已完成所有任务！</div>
                    </div>
                ) : (
                    <ul className="goingTaskBox">
                        {this.state.going.map(taskObj => {
                            return (
                                <li key={taskObj._id}>
                                    <div
                                        className="goingDoneBtn"
                                        onClick={this.finishTask.bind(this, taskObj._id)}
                                    >
                                        <CheckOutlined />
                                    </div>
                                    {/* <div
                                        ref={c => (this.showTask = c)}
                                        onDoubleClick={this.editTask.bind(this, index, taskObj)}
                                        className={
                                            this.state.index === index
                                                ? 'hidden'
                                                : 'goingTaskContent'
                                        }
                                    >
                                        {taskObj.content}
                                    </div> */}
                                    <input
                                        type="text"
                                        onBlur={this.returnContent.bind(this, taskObj)}
                                        className="goingTaskEdit"
                                        id={taskObj._id}
                                        defaultValue={taskObj.content}
                                        onKeyUp={this.updateEditTask.bind(this, taskObj._id)}
                                    />
                                    <div
                                        className="goingDeleteBtn"
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
        // 状态
        state => ({}),
        // 操作状态的方法
        { add }
    )(Going)
);
