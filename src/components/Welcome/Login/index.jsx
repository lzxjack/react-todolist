import React, { PureComponent } from 'react';
// import { withRouter } from 'react-router-dom';
import { message, notification } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { auth } from '../../../utils/cloudBase';
import { connect } from 'react-redux';
import { login, logout } from '../../../redux/actions/userState';
import './index.css';

class Login extends PureComponent {
    state = {
        loginType: 0,
    };

    // 打开邮箱登录失败的消息提醒框
    openEmailLoginFailed = () => {
        notification.open({
            message: '邮箱登陆失败！',
            description: '请检查邮箱地址、密码是否正确！',
            duration: 3,
            icon: <CloseOutlined />,
        });
    };
    // 打开用户名登录失败的消息提醒框
    openUserNameLoginFailed = () => {
        notification.open({
            message: '用户名登陆失败！',
            description: '请检查用户名、密码是否正确！',
            duration: 3,
            icon: <CloseOutlined />,
        });
    };
    // 登录成功的消息提示
    openLoginSuccess = () => {
        notification.open({
            message: '登录成功！',
            description: '欢迎使用 TodoList',
            duration: 2,
            placement: 'bottomLeft',
            icon: <CheckOutlined />,
        });
    };
    // 邮箱地址登录
    login = async () => {
        // 判断用户是否输入了密码
        if (this.logonPwd.value === '') {
            message.warning('请输入密码！');
            return;
        }

        if (this.state.loginType === 0) {
            // 邮箱地址登录
            await auth
                .signInWithEmailAndPassword(this.loginInput.value, this.logonPwd.value)
                .then(() => {
                    // 登录成功后，调用login()，改变登录状态为true
                    this.props.login();
                    // 跳转到home页面
                    this.props.history.replace('/home');
                    // 提示消息
                    this.openLoginSuccess();
                })
                .catch(() => {
                    // 登录失败，改变登录状态为false
                    this.props.logout();
                    this.openEmailLoginFailed();
                    this.logonPwd.value = '';
                });
        } else {
            // 用户名登录
            await auth
                .signInWithUsernameAndPassword(this.loginInput.value, this.logonPwd.value)
                .then(() => {
                    // 登录成功后，调用login()，改变登录状态为true
                    this.props.login();
                    // 跳转到home页面
                    this.props.history.replace('/home');
                    // 提示消息
                    this.openLoginSuccess();
                })
                .catch(() => {
                    // 用登录失败，改变登录状态为false
                    this.props.logout();
                    this.openUserNameLoginFailed();
                    this.logonPwd.value = '';
                });
        }
    };
    onEnter = e => {
        // 判断是否按下回车
        if (e.keyCode === 13) {
            // 若按下回车，调用鼠标的点击事件
            this.login();
        }
    };
    render() {
        return (
            <div className="loginBox">
                <div className="selecBox">
                    <label>
                        <input
                            name="loginType"
                            ref={c => (this.loginCheck = c)}
                            type="radio"
                            value={0}
                            checked={this.state.loginType === 0}
                            onChange={e => {
                                this.setState({ loginType: 0 });
                            }}
                        />
                        邮箱
                    </label>
                    <label>
                        <input
                            name="loginType"
                            ref={c => (this.userNameLoginCheck = c)}
                            type="radio"
                            value={1}
                            checked={this.state.loginType === 1}
                            onChange={e => {
                                this.setState({ loginType: 1 });
                            }}
                        />
                        用户名
                    </label>
                </div>
                <input
                    className="loginInput"
                    ref={c => {
                        this.loginInput = c;
                    }}
                    type="text"
                    placeholder={this.state.loginType === 0 ? '请输入邮箱地址' : '请输入用户名'}
                />

                <input
                    className="loginInput"
                    ref={c => {
                        this.logonPwd = c;
                    }}
                    onKeyUp={this.onEnter}
                    type="password"
                    placeholder="请输入密码"
                />
                <div className="loginBtn" onClick={this.login}>
                    登录
                </div>
            </div>
        );
    }
}

export default connect(
    // 状态
    state => ({
        userState: state.userState,
    }),
    // 操作状态的方法
    { login, logout }
)(Login);
