import React, { PureComponent } from 'react';
import MyNavLink from '../MyNavLink';
import routes from '../../router.js';
import renderRoutes from '../../utils/renderRoutes';
import './index.css';

export default class Welcome extends PureComponent {
    render() {
        return (
            <div class="welcome">
                {/* 左侧图片区 */}
                <div className="display">
                    <span className="intro">使用TodoList，做一个时间管理大师</span>
                </div>
                {/* 右侧登录区 */}
                <div className="enter">
                    <div className="enterBox">
                        {/* 路由链接 */}
                        <div className="enterHeader">
                            <MyNavLink activeClassName="select" to="/login" className="enterLogin">
                                登陆
                            </MyNavLink>
                            <MyNavLink
                                activeClassName="select"
                                to="/register"
                                className="enterRegister"
                            >
                                注册
                            </MyNavLink>
                        </div>
                        {/* 路由展示区 */}
                        <div className="enterBody">{renderRoutes(routes)}</div>
                    </div>
                </div>
            </div>
        );
    }
}
