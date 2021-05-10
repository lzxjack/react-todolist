import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import moment from 'moment';
import './index.css';

const logoutCheck = '真的要退出登录吗？';
class Outline extends PureComponent {
    // 获取当前时间
    state = { time: '', timeText: '' };

    componentDidMount() {
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
        this.setState({ time, timeText });
    }
    // test = () => {
    //     console.log(this.state.hour);
    // };
    turnLogout = () => {
        // 清除sessionStorage
        sessionStorage.clear();
        // 提示消息
        // message.success({
        //     content: '退出成功！',
        //     className: 'custom-class',
        //     style: {
        //         marginTop: '20vh',
        //     },
        //     duration: 1.5,
        // });
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
                <div className="avatar"></div>
                <div className="words">
                    <div className="welcomeUser">
                        {this.state.time}，
                        {
                            JSON.parse(
                                sessionStorage.getItem('user_info_todolist-3gayiz0cb9b8b263')
                            ).content.email
                        }
                        ！
                    </div>
                    <div className="timeText"> {this.state.timeText}</div>
                </div>
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

export default withRouter(Outline);
