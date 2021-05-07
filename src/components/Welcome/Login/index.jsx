import React, { PureComponent } from 'react';
// import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import { auth } from '../../../utils/cloudBase';
import { connect } from 'react-redux';
import { login, logout } from '../../../redux/actions/userState';
import './index.css';

class Login extends PureComponent {
    // 邮箱地址登录
    emailLogin = () => {
        try {
            auth.signInWithEmailAndPassword(this.loginEmail.value, this.logonPwd.value).then(() => {
                // 登录成功后，调用login()，改变登录状态为true
                this.props.login();
                // 跳转到home页面
                this.props.history.replace('/home');
                // 提示消息
                message.success({
                    content: '登录成功！开始查看todo吧~',
                    className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    },
                    duration: 1.5,
                });
            });
        } catch (error) {
            console.log(error);
            // 登录失败，改变登录状态为false
            this.props.logout();
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
