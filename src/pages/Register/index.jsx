import React, { PureComponent, Fragment } from 'react';
import './index.css';

export default class Register extends PureComponent {
    render() {
        return (
            <div className="LoginBox">
                {/* <Input size="large" placeholder="请输入邮箱地址" prefix={<UserOutlined />} />
                <Input.Password size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
                <Button type="primary" block>
                    登录
                </Button> */}
                <div className="inputUname">
                    <input type="text" placeholder="请输入邮箱地址" />
                </div>
                <div className="inputPwd">
                    <input type="password" placeholder="请输入密码" />
                </div>
                <div className="inputPwd">
                    <input type="password" placeholder="请再次输入密码" />
                </div>

                <div className="LoginBtn">注册</div>
            </div>
        );
    }
}
