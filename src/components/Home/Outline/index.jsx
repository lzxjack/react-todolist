import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import { connect } from 'react-redux';
import { updateAvatarUrl, updateNickName } from '../../../redux/actions/userInform';
import { DEFAULT_AVATAR_URL } from '../../../utils/constant';
import moment from 'moment';
import { auth } from '../../../utils/cloudBase';
import './index.css';

const logoutCheck = '真的要退出登录吗？';
class Outline extends PureComponent {
    state = {
        time: '',
        timeText: '',
        nowTime: '',
        poemWords: '',
        poemTitle: '',
    };

    componentDidMount() {
        // console.log();
        // 今日诗词API
        const jinrishici = require('jinrishici');
        // 获取诗句，放入state
        jinrishici.load(result => {
            this.setState({ poemWords: result.data.content, poemTitle: result.data.origin.title });
        });
        // 先执行一次，避免'白屏'
        this.runPerTime();
        // 开启定时器，每秒执行一次，更新状态
        this.timeUpdate = setInterval(() => {
            this.runPerTime();
        }, 1000);
        // 获取用户API
        const user = auth.currentUser;
        // 将用户上的信息添加到redux状态中
        this.props.updateAvatarUrl(user.avatarUrl);
        this.props.updateNickName(user.nickName);
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

    turnLogout = () => {
        // 清除sessionStorage
        sessionStorage.clear();
        // 提示消息
        message.success('退出成功！');
        // 回到welcome页面
        this.props.history.replace('/welcome');
    };

    // 退出（取消）
    turnLogoutCancel = () => {
        message.info('取消退出！');
    };

    render() {
        return (
            <div className="outlineBox">
                <div className="avatarBox">
                    <img
                        src={
                            this.props.userInform.avatarUrl === ''
                                ? DEFAULT_AVATAR_URL
                                : this.props.userInform.avatarUrl
                        }
                        alt="用户头像"
                        className="outlineAvatar"
                    />
                </div>
                <div className="words">
                    <div className="welcomeUser">
                        {this.state.time}，
                        {this.props.userInform.nickName === ''
                            ? JSON.parse(
                                  sessionStorage.getItem('user_info_todolist-3gayiz0cb9b8b263')
                              ).content.email
                            : this.props.userInform.nickName}
                        ！
                    </div>
                    <div className="timeText"> {this.state.timeText}</div>
                </div>
                <div className="todayPoem">
                    <div className="poemWords">{this.state.poemWords}</div>
                    <div className="poemTitle">——《{this.state.poemTitle}》</div>
                </div>

                <div className="timeBox">{this.state.nowTime}</div>
                {/* 退出按钮 */}
                <Popconfirm
                    placement="bottomRight"
                    title={logoutCheck}
                    onConfirm={this.turnLogout}
                    onCancel={this.turnLogoutCancel}
                    okText="退出！"
                    cancelText="再看看！"
                >
                    <div className="logoutBtn">退出</div>
                </Popconfirm>
            </div>
        );
    }
}

export default withRouter(
    connect(
        // 状态
        state => ({
            userInform: state.userInform,
        }),
        // 操作状态的方法
        { updateAvatarUrl, updateNickName }
    )(Outline)
);
