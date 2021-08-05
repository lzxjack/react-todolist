import React, { PureComponent } from 'react';
import { notification, Button } from 'antd';
import { auth } from '../../../utils/cloudBase';
import { CheckOutlined, CloseOutlined, InfoOutlined, ExclamationOutlined } from '@ant-design/icons';
import './index.css';

export default class Register extends PureComponent {
    // 邮箱错误的提示消息
    openEmailError = () => {
        notification.open({
            message: '信息填写错误！',
            description: '请输入正确的邮箱地址',
            duration: 7,
            icon: <CloseOutlined />,
        });
    };
    // 密码错误的提示消息
    openPwdError = () => {
        notification.open({
            message: '信息填写错误！',
            description: '请输入正确的密码，8~32位，需包含字母、数字',
            duration: 7,
            icon: <CloseOutlined />,
        });
    };
    // 密码确认错误的提示消息
    openPwdAgainError = () => {
        notification.open({
            message: '信息填写错误！',
            description: '两次输入的密码不一致',
            duration: 7,
            icon: <InfoOutlined />,
        });
    };
    // 注册邮箱地址失败的提示消息
    openRegisterFailed = () => {
        notification.open({
            message: '注册失败！',
            description: '邮箱地址不存在或邮箱地址已被注册！',
            duration: 7,
            icon: <ExclamationOutlined />,
        });
    };
    // 注册邮箱地址成功的提示消息
    openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                好的
            </Button>
        );
        notification.open({
            message: '验证信息已发送',
            description: '已发送激活邮件，请及时前往填写的邮箱中查收并确认激活~',
            btn,
            key,
            duration: 0,
            icon: <CheckOutlined />,
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
            this.openEmailError();
        }
        if (!pwdReg.test(this.newPwd.value)) {
            validateFlag = false;
            this.openPwdError();
        }
        if (this.newPwd.value !== this.newPwdAgian.value) {
            validateFlag = false;
            this.openPwdAgainError();
        }
        // 通过验证，validateFlag还是为true
        if (!validateFlag) return;

        auth.signUpWithEmailAndPassword(this.newEmail.value, this.newPwd.value)
            .then(() => {
                // console.log(res);
                // 发送验证邮件成功，提示消息
                this.openNotification();
                // 返回登录页面
                this.props.history.replace('/welcome/login');
            })
            .catch(() => {
                // 提示消息
                this.openRegisterFailed();
                // console.log(res);
            });
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
            <div className="registerBox">
                <input
                    className="registerInput"
                    ref={c => {
                        this.newEmail = c;
                    }}
                    type="text"
                    placeholder="请输入邮箱地址"
                />

                <input
                    className="registerInput"
                    ref={c => {
                        this.newPwd = c;
                    }}
                    type="password"
                    placeholder="请输入密码（8~32位，包含字母、数字）"
                />

                <input
                    className="registerInput"
                    ref={c => {
                        this.newPwdAgian = c;
                    }}
                    onKeyUp={this.onEnter}
                    type="password"
                    placeholder="请再次输入密码"
                />

                <div onClick={this.addUser} className="registerBtn">
                    注册
                </div>
            </div>
        );
    }
}
