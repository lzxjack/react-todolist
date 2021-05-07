import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
// import { message } from 'antd';
import { Popconfirm, message, Button } from 'antd';
import './index.css';

const text = '真的要退出登录吗？';
class Outline extends PureComponent {
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
                    <div className="dependTime"> 时间不早了，赶快睡觉吧！</div>
                </div>
                {/* <div className="logoutBtn" onClick={this.turnLogout}>
                    退出
                </div> */}
                <Popconfirm
                    placement="bottomRight"
                    title={text}
                    onConfirm={this.turnLogout}
                    okText="退出！"
                    cancelText="再看看！"
                >
                    <Button className="logoutBtn">退出</Button>
                </Popconfirm>
            </div>
        );
    }
}

export default withRouter(Outline);
