import React, { PureComponent } from 'react';
import { notification, message } from 'antd';
import { auth } from '../../../utils/cloudBase';
import './index.css';

export default class Register extends PureComponent {
    // 邮箱错误的提示消息
    openEmailError = type => {
        notification[type]({
            message: '信息填写错误！',
            description: '请输入正确的邮箱地址',
        });
    };
    // 密码错误的提示消息
    openPwdError = type => {
        notification[type]({
            message: '信息填写错误！',
            description: '请输入正确的密码，8~32位，需包含字母、数字',
        });
    };
    // 密码确认错误的提示消息
    openPwdAgainError = type => {
        notification[type]({
            message: '信息填写错误！',
            description: '两次输入的密码不一致',
        });
    };
    addUser = () => {
        // 表单验证状态
        let validateFlag = true;
        // 邮箱地址的表达式
        const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        // 密码的表达式
        const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,32}$/;
        // 邮箱不符合
        if (!emailReg.test(this.newEmail.value)) {
            // 状态改为false
            validateFlag = false;
            // 提示消息
            this.openEmailError('error');
        }
        if (!pwdReg.test(this.newPwd.value)) {
            validateFlag = false;
            this.openPwdError('error');
        }
        if (this.newPwd.value !== this.newPwdAgian.value) {
            validateFlag = false;
            this.openPwdAgainError('error');
        }
        // 通过验证，validateFlag还是为true
        if (validateFlag) {
            auth.signUpWithEmailAndPassword(this.newEmail.value, this.newPwd.value).then(() => {
                // 发送验证邮件成功，提示消息
                message.success({
                    content: '已发送激活邮件，请前往填写的邮箱中查收并确认激活~',
                    className: 'custom-class',
                    style: {
                        marginTop: '20vh',
                    },
                    duration: 1.5,
                });
                // 返回登录页面
                this.props.history.replace('/welcome/login');
            });
        }
    };
    onEnter = e => {
        // 判断是否按下回车
        if (e.keyCode === 13) {
            // 若按下回车，调用鼠标的点击事件
            this.addUser();
        }
    };
    render() {
        return (
            <div className="RegisterBox">
                <div className="inputUname">
                    <input
                        ref={c => {
                            this.newEmail = c;
                        }}
                        type="text"
                        placeholder="请输入邮箱地址"
                    />
                </div>
                <div className="inputPwd">
                    <input
                        ref={c => {
                            this.newPwd = c;
                        }}
                        type="password"
                        placeholder="请输入密码（8~32位，包含字母、数字）"
                    />
                </div>
                <div className="inputPwd">
                    <input
                        ref={c => {
                            this.newPwdAgian = c;
                        }}
                        onKeyUp={this.onEnter}
                        type="password"
                        placeholder="请再次输入密码"
                    />
                </div>

                <div onClick={this.addUser} className="RegisterBtn">
                    注册
                </div>
            </div>
        );
    }
}
