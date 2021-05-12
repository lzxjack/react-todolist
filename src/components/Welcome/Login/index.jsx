import React, { PureComponent } from 'react';
// import { withRouter } from 'react-router-dom';
import { message, notification } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { auth } from '../../../utils/cloudBase';
import { connect } from 'react-redux';
import { login, logout } from '../../../redux/actions/userState';
import './index.css';

class Login extends PureComponent {
    // 打开登录失败的消息提醒框
    openLoginFailed = type => {
        notification[type]({
            message: '登陆失败！',
            description: '请检查邮箱地址、密码是否正确！',
        });
    };
    // 登录成功的消息提示
    openLoginSuccess = () => {
        notification.open({
            message: '登录成功！',
            description: '欢迎使用 TodoList',
            duration: 2,
            placement: 'bottomLeft',
            icon: <SmileOutlined />,
        });
    };
    // 邮箱地址登录
    emailLogin = () => {
        // 判断用户是否输入了密码
        if (this.logonPwd.value === '') {
            message.warning('请输入密码！');
            return;
        }
        try {
            auth.signInWithEmailAndPassword(this.loginEmail.value, this.logonPwd.value).then(() => {
                // 登录成功后，调用login()，改变登录状态为true
                this.props.login();
                // 跳转到home页面
                this.props.history.replace('/home');
                // 提示消息
                this.openLoginSuccess();
            });
        } catch (error) {
            // 登录失败，改变登录状态为false
            this.props.logout();
            this.openLoginFailed('error');
            this.logonPwd.value = '';
        }
    };
    onEnter = e => {
        // 判断是否按下回车
        if (e.keyCode === 13) {
            // 若按下回车，调用鼠标的点击事件
            this.emailLogin();
        }
    };
    render() {
        return (
            <div className="loginBox">
                <div className="loginEmail">
                    <input
                        ref={c => {
                            this.loginEmail = c;
                        }}
                        type="text"
                        placeholder="请输入邮箱地址"
                    />
                </div>
                <div className="loginPwd">
                    <input
                        ref={c => {
                            this.logonPwd = c;
                        }}
                        onKeyUp={this.onEnter}
                        type="password"
                        placeholder="请输入密码"
                    />
                </div>
                <div className="loginBtn" onClick={this.emailLogin}>
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
