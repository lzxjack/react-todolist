import React, { Component, Fragment } from 'react';
import cloudbase from '@cloudbase/js-sdk';
import './index.css';

const app = cloudbase.init({
    env: 'todolist-3gayiz0cb9b8b263',
});

export default class Login extends Component {
    login = () => {
        try {
            app.auth()
                .signInWithEmailAndPassword(this.uname.value, this.psd.value)
                .then(loginState => {
                    // alert('登录成功');
                    this.uname.value = '';
                    this.psd.value = '';
                    console.log(loginState);
                    // 将服务端返回的token保存在sessionStorage中
                    window.sessionStorage.setItem('token', loginState._cache.keys.accessTokenKey);
                    // console.log(this.props.history);
                    // 通过编程式导航跳转到登录后的页面
                    this.props.history.push('/user');
                });
        } catch (error) {
            console.log(error);
        }
    };
    render() {
        return (
            <Fragment>
                <div className="avatarBox">
                    <img
                        className="avatar"
                        src="https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20210426084551.png"
                        alt="头像"
                    />
                </div>
                <div className="loginInput">
                    <div className="loginUname">
                        <span>登录名</span>
                        <input
                            ref={c => (this.uname = c)}
                            type="text"
                            placeholder="请输入邮箱地址/用户名"
                        />
                    </div>
                    <div className="loginPsd">
                        <span>密码</span>
                        <input ref={c => (this.psd = c)} type="password" placeholder="请输入密码" />
                    </div>
                </div>
                <div className="loginBtn" onClick={this.login}>
                    登录
                </div>
            </Fragment>
        );
    }
}
