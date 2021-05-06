import React, { PureComponent, Fragment } from 'react';
import { message } from 'antd';

export default class Home extends PureComponent {
    turnLogout = () => {
        // 清除sessionStorage
        sessionStorage.clear();
        // 提示消息
        message.success({
            content: '退出成功！',
            className: 'custom-class',
            style: {
                marginTop: '20vh',
            },
            duration: 1.5,
        });
        // 回到welcome页面
        this.props.history.replace('/welcome');
    };
    // componentDidMount() {
    //     console.log(
    //         JSON.parse(sessionStorage.getItem('user_info_todolist-3gayiz0cb9b8b263')).content.email
    //     );
    // }
    render() {
        return (
            <Fragment>
                <h2>Home</h2>
                <h2>
                    你好，
                    {
                        JSON.parse(sessionStorage.getItem('user_info_todolist-3gayiz0cb9b8b263'))
                            .content.email
                    }
                </h2>
                <button onClick={this.turnLogout}>退出登录</button>
            </Fragment>
        );
    }
}
