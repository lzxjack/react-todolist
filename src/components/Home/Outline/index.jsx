import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { Popconfirm, message } from 'antd';
import './index.css';

const logoutCheck = '真的要退出登录吗？';
class Outline extends PureComponent {
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
                        晚上好，
                        {
                            JSON.parse(
                                sessionStorage.getItem('user_info_todolist-3gayiz0cb9b8b263')
                            ).content.email
                        }
                        ！
                    </div>
                    <div className="dependTime"> 时间不早了，早点休息吧。</div>
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
