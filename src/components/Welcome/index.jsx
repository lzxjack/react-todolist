import React, { PureComponent } from 'react';
import MyNavLink from '../MyNavLink';
import renderRoutes from '../../utils/renderRoutes';
import './index.css';

export default class Welcome extends PureComponent {
    render() {
        return (
            <div className="welcomeBox">
                <div className="welcome">
                    {/* 左侧图片区 */}
                    <div className="display">
                        <span className="intro">使用TodoList，</span>
                        <span className="intro">做一个时间管理大师。</span>
                    </div>
                    {/* 右侧登录区 */}
                    <div className="enter">
                        <div className="enterBox">
                            {/* 路由链接 */}
                            <div className="enterHeader">
                                <MyNavLink
                                    activeClassName="select"
                                    to="/welcome/login"
                                    className="linkLogin"
                                >
                                    登陆
                                </MyNavLink>
                                <MyNavLink
                                    activeClassName="select"
                                    to="/welcome/register"
                                    className="linkRegister"
                                >
                                    注册
                                </MyNavLink>
                            </div>
                            {/* 路由展示区 */}
                            <div className="enterBody">
                                {renderRoutes(this.props.route.children)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
