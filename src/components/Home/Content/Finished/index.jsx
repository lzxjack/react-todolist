import React, { PureComponent, Fragment } from 'react';
import { message, Popconfirm, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    RedoOutlined,
    CloseOutlined,
    LikeOutlined,
    CheckOutlined,
    DeleteOutlined,
    FrownOutlined,
    CodepenOutlined,
} from '@ant-design/icons';
import { db } from '../../../../utils/cloudBase';
import { minCount } from '../../../../redux/actions/doneSum';
import { deleteTask, returnTask, deleteAllDone } from '../../../../redux/actions/tasks';
import './index.css';

const deleteAllDoneCheck = '确认要删除所有已完成的任务吗？';
const _ = db.command;

class Finished extends PureComponent {
    // 删除任务
    deleteTask = id => {
        // 1. 删除redux中的数据
        this.props.deleteTask(id);
        // 提醒用户
        message.success('删除成功！');
        // 2. 再从数据库中删除数据
        db.collection('tasks').doc(id).remove();
    };

    // 撤销已完成
    backToGoing = id => {
        // 1. 首先修改redux中的数据
        this.props.returnTask(id);
        // 提醒用户
        message.success('已撤销完成的任务！');
        // 累计完成总数-1
        this.props.minCount();
        // 发送请求，数据库中count-1
        db.collection('doneSum')
            .doc(this.props.id)
            .update({
                count: _.inc(-1),
            });
        // 2. 在数据库中修改相应id的done属性
        db.collection('tasks').doc(id).update({
            done: false,
        });
    };
    // 删除所有已完成任务
    deleteAllDoneTask = () => {
        // 1. 删除redux中所有done:true的数据
        this.props.deleteAllDone();
        // 提醒用户
        message.success('已清空已完成的任务！');
        // 2. 删除数据库中的数据
        db.collection('tasks')
            .where({
                done: true,
            })
            .remove();
    };
    // 删除所有已完成任务（取消确认）
    deleteAllDoneCancel = () => {
        message.info('取消清空！');
    };
    render() {
        return (
            <Fragment>
                <div className="Finished">
                    <CheckOutlined />
                    &nbsp;已完成
                    {this.props.tasks.filter(taskObj => {
                        return taskObj.done === true;
                    }).length === 0 ? null : (
                        <span>
                            &nbsp;——&nbsp;
                            {
                                this.props.tasks.filter(taskObj => {
                                    return taskObj.done === true;
                                }).length
                            }
                        </span>
                    )}
                </div>
                {this.props.tasks.filter(taskObj => {
                    return taskObj.done === true;
                }).length === 0 ? (
                    <Fragment>
                        <div className="finishedText">
                            <span>
                                暂时没有已完成的任务...&nbsp;
                                <FrownOutlined />
                            </span>
                        </div>
                        <div className="finishedNull">
                            <div className="finishedNullIcon">
                                <CodepenOutlined />
                            </div>
                            <div className="finishedNullText">空空如也</div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="finishedText">
                            <span>
                                以下任务已经完成啦！ &nbsp;
                                <LikeOutlined />
                            </span>
                            <Tooltip placement="right" title="删除所有" zIndex="999">
                                <Popconfirm
                                    title={deleteAllDoneCheck}
                                    onConfirm={this.deleteAllDoneTask}
                                    onCancel={this.deleteAllDoneCancel}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined className="deleteAllDoneBtn" />
                                </Popconfirm>
                            </Tooltip>
                        </div>
                        <ul className="finishedTaskBox">
                            {this.props.tasks
                                .filter(taskObj => {
                                    return taskObj.done === true;
                                })
                                .map(taskObj => {
                                    return (
                                        <li key={taskObj._id}>
                                            <Tooltip placement="left" title="取消完成" zIndex="999">
                                                <div
                                                    className="finishedDoneBtn"
                                                    onClick={this.backToGoing.bind(
                                                        this,
                                                        taskObj._id
                                                    )}
                                                >
                                                    <RedoOutlined />
                                                </div>
                                            </Tooltip>

                                            <div className="finishedTaskContent">
                                                {taskObj.content}
                                            </div>
                                            <Tooltip placement="right" title="删除" zIndex="999">
                                                <div
                                                    className="finishedDeleteBtn"
                                                    onClick={this.deleteTask.bind(
                                                        this,
                                                        taskObj._id
                                                    )}
                                                >
                                                    <CloseOutlined />
                                                </div>
                                            </Tooltip>
                                        </li>
                                    );
                                })}
                        </ul>
                    </Fragment>
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
        { minCount, deleteTask, returnTask, deleteAllDone }
    )(Finished)
);
