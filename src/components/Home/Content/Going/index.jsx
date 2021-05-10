import React, { Component, Fragment } from 'react';
import { message } from 'antd';
import {
    CheckOutlined,
    CloseOutlined,
    DoubleRightOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import { db } from '../../../../utils/cloudBase';
import './index.css';

const _ = db.command;

export default class Going extends Component {
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
                message.warning('请输入todo...');
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
        // 2. 在数据库中修改相应id的done属性
        db.collection('tasks').doc(id).update({
            done: true,
        });
    };
    render() {
        return (
            <Fragment>
                <div className="Going">
                    <DoubleRightOutlined />
                    &nbsp;Going
                </div>
                <div className="inputBox">
                    <input
                        type="text"
                        ref={c => (this.inputTask = c)}
                        onKeyUp={this.addTask}
                        placeholder="Add some todos?"
                        className="inputTask"
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
                                    <div className="goingTaskContent">{taskObj.content}</div>
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
