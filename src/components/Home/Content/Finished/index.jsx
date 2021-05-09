import React, { PureComponent, Fragment } from 'react';
import { message } from 'antd';
import { RedoOutlined, CloseOutlined, LikeOutlined, CheckOutlined } from '@ant-design/icons';
import { db } from '../../../../utils/cloudBase';
import './index.css';

const _ = db.command;
export default class Finished extends PureComponent {
    // 状态初始化
    state = { finished: [] };

    componentDidMount() {
        // 首先获得所有已完成的任务
        this.getFinishedTask();
    }

    // 从状态中删除相应ID任务
    deleteTaskInState = id => {
        // 获取旧状态
        const { finished } = this.state;
        // 将相应id的数据去除，返回新的数据
        const newFinished = finished.filter(taskObj => {
            return taskObj._id !== id;
        });
        // 新数据更新状态，渲染页面
        this.setState({ finished: newFinished });
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

    // 获得所有已完成的任务
    getFinishedTask = () => {
        db.collection('tasks')
            .where({
                done: _.eq(true),
            })
            .get()
            .then(res => {
                // 将返回的结果存放在state中
                this.setState({ finished: res.data });
            });
    };

    // 撤销已完成
    backToGoing = id => {
        // 1. 首先删除state中的相应数据，重新渲染页面
        this.deleteTaskInState(id);
        // 提醒用户
        message.success('已撤销完成的任务！');
        // 2. 在数据库中修改相应id的done属性
        db.collection('tasks').doc(id).update({
            done: false,
        });
    };
    render() {
        return (
            <Fragment>
                <div className="Finished">
                    <CheckOutlined />
                    &nbsp;Finished
                </div>
                <div className="finishedText">
                    以下任务已经完成啦！
                    <LikeOutlined />
                </div>
                <ul className="finishedTaskBox">
                    {this.state.finished.map(taskObj => {
                        return (
                            <li key={taskObj._id}>
                                <div
                                    className="finishedDoneBtn"
                                    onClick={this.backToGoing.bind(this, taskObj._id)}
                                >
                                    <RedoOutlined />
                                </div>
                                <div className="finishedTaskContent">{taskObj.content}</div>
                                <div
                                    className="finishedDeleteBtn"
                                    onClick={this.deleteTask.bind(this, taskObj._id)}
                                >
                                    <CloseOutlined />
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </Fragment>
        );
    }
}
