import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Popconfirm, notification } from 'antd';
import { ArrowRightOutlined, RollbackOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { DEFAULT_AVATAR_URL } from '../../../utils/constant';
import { db } from '../../../utils/cloudBase';
import moment from 'moment';
import { logout } from '../../../redux/actions/userState';
import { clearUserData, switchDark } from '../../../redux/actions/personalData';
import { clearTask } from '../../../redux/actions/tasks';
import { clearUserInfo } from '../../../redux/actions/userInform';
import './index.css';

const logoutCheck = '真的要退出登录吗？';
class Outline extends PureComponent {
    state = {
        time: '',
        timeText: '',
        nowTime: '',
    };

    async componentDidMount() {
        // 先执行一次，避免'白屏'
        this.runPerTime();
        // 开启定时器，每秒执行一次，更新状态
        this.timeUpdate = setInterval(() => {
            this.runPerTime();
        }, 1000);
    }
    componentWillUnmount() {
        // 清除定时器
        clearInterval(this.timeUpdate);
    }
    // 定时器每秒执行的函数
    runPerTime = () => {
        const hour = moment().hours();
        const time =
            hour < 6
                ? '凌晨好'
                : hour < 9
                ? '早上好'
                : hour < 11
                ? '上午好'
                : hour < 13
                ? '中午好'
                : hour < 17
                ? '下午好'
                : hour < 19
                ? '傍晚好'
                : hour < 22
                ? '晚上好'
                : '夜深了';
        const timeText =
            hour < 6
                ? '三更灯火五更鸡，正是男儿读书时。'
                : hour < 9
                ? '早起的鸟儿有虫吃！'
                : hour < 11
                ? '一日之计在于晨。'
                : hour < 13
                ? '树阴满地日当午， 梦觉流莺时一声。'
                : hour < 17
                ? '点一杯下午茶吧。'
                : hour < 19
                ? '夕阳无限好，只是近黄昏。'
                : hour < 22
                ? '更深月色半人家，北斗阑干南斗斜。'
                : '时间不早了，早点休息吧。';
        const nowTime = moment().format('HH:mm:ss');
        this.setState({ time, timeText, nowTime });
    };
    // 退出登录的消息提示
    openLogoutNoti = () => {
        notification.open({
            message: '退出成功！',
            description: '已退出 TodoList',
            duration: 2,
            placement: 'bottomLeft',
            icon: <ArrowRightOutlined />,
        });
    };
    // 退出取消的消息提示
    openLogoutCancel = () => {
        notification.open({
            message: '取消退出！',
            description: '再看看吧~',
            duration: 2,
            placement: 'bottomLeft',
            icon: <RollbackOutlined />,
        });
    };
    // 切换黑暗模式成功的消息
    openSwitchDark = () => {
        notification.open({
            message: '天黑请闭眼~',
            duration: 2,
            placement: 'bottomLeft',
        });
    };
    // 切换白天模式成功的消息
    openSwitchSun = () => {
        notification.open({
            message: '天亮啦，请睁眼~',
            duration: 2,
            placement: 'bottomLeft',
        });
    };
    // 退出
    turnLogout = () => {
        // 清除localStorage
        localStorage.clear();
        // 改变登录状态
        this.props.logout();
        // 清空个人数据（任务计数、黑暗模式）
        this.props.clearUserData();
        // 清空任务
        this.props.clearTask();
        // 清空用户信息
        this.props.clearUserInfo();
        // 提示消息
        this.openLogoutNoti();
        // 回到welcome页面
        this.props.history.replace('/welcome');
    };
    // 切换黑暗模式
    switchDark = async () => {
        await this.props.switchDark();
        // 数据库中修改isDark
        db.collection('personalData')
            .doc(this.props.id)
            .update({
                isDark: this.props.isDark,
            })
            .then(() => {
                this.props.isDark ? this.openSwitchDark() : this.openSwitchSun();
            });
    };
    render() {
        return (
            <div className="outlineBox" id={this.props.isDark ? 'outlineBoxDark' : ''}>
                {/* 头像盒子 */}
                <div className="avatarBox">
                    <img
                        src={
                            this.props.avatarUrl === '' ? DEFAULT_AVATAR_URL : this.props.avatarUrl
                        }
                        alt="用户头像"
                        className="outlineAvatar"
                    />
                </div>
                {/* 左边文字 */}
                <div className="leftWords">
                    <div className="welcomeUser">
                        {this.state.time}，
                        {this.props.nickName === ''
                            ? JSON.parse(
                                  localStorage.getItem('user_info_todolist-3gayiz0cb9b8b263')
                              ).content.email
                            : this.props.nickName}
                        ！
                    </div>

                    <div className="timeText">{this.state.timeText}</div>
                </div>
                {/* 应用标题 */}
                <div className="appHead">TodoList</div>
                {/* 右边文字 */}
                <div className="rightWords">
                    <div className="timeBox"> {this.state.nowTime}</div>
                    <div className="doneCountText">
                        已完成任务
                        <span className="doneCount">&nbsp;{this.props.count}&nbsp;</span>
                        个，继续加油！
                    </div>
                </div>
                {/* 黑暗模式 */}
                <span
                    className={this.props.isDark ? 'icon-moon darkMode' : 'icon-sun sunMode'}
                    onClick={this.switchDark}
                ></span>
                {/* 退出按钮 */}
                <Popconfirm
                    placement="bottomRight"
                    title={logoutCheck}
                    onConfirm={this.turnLogout}
                    onCancel={this.openLogoutCancel}
                    okText="退出！"
                    cancelText="再看看！"
                >
                    <div className="logoutBtn" id={this.props.isDark ? 'logoutBtnDark' : ''}>
                        退出
                    </div>
                </Popconfirm>
            </div>
        );
    }
}

export default withRouter(
    connect(
        state => ({
            avatarUrl: state.userInform.avatarUrl,
            nickName: state.userInform.nickName,
            count: state.personalData.count,
            isDark: state.personalData.isDark,
            id: state.personalData.id,
        }),
        { logout, clearUserData, clearTask, clearUserInfo, switchDark }
    )(Outline)
);
