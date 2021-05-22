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
                        <span className="intro">使用TodoList</span>
                        <span className="intro">做时间管理大师</span>
                    </div>
                    {/* 右侧登录区 */}
                    <div className="enter">
                        <div className="enterBox">
                            {/* 路由链接 */}
                            <div className="enterHeader">
                                <MyNavLink to="/welcome/login" className="welNav">
                                    登陆
                                </MyNavLink>
                                <MyNavLink to="/welcome/register" className="welNav">
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
