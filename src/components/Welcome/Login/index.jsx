import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { message } from 'antd';
import { auth } from '../../../utils/cloudBase';
import './index.css';

class Login extends PureComponent {
    emailLogin = () => {
        try {
            auth.signInWithEmailAndPassword(this.loginEmail.value, this.logonPwd.value).then(() => {
                message.success('登录成功！开始查看todo吧~');
                this.props.history.push('/home');
            });
        } catch (error) {
            console.log(error);
        }
    };
    render() {
        return (
            <div className="LoginBox">
                <div className="inputLogin">
                    <input
                        ref={c => {
                            this.loginEmail = c;
                        }}
                        type="text"
                        placeholder="请输入邮箱地址"
                        // value="965555169@qq.com"
                    />
                </div>
                <div className="inputPwd">
                    <input
                        ref={c => {
                            this.logonPwd = c;
                        }}
                        type="password"
                        placeholder="请输入密码"
                        // value="lzx965555169"
                    />
                </div>

                <div className="LoginBtn" onClick={this.emailLogin}>
                    登录
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
