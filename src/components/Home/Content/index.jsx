import React, { PureComponent } from 'react';
import MyNavLink from '../../MyNavLink';
import renderRoutes from '../../../utils/renderRoutes';
import { homeRouters } from '../../../router.js';

import { CheckOutlined, UserOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './index.css';

export default class Content extends PureComponent {
    render() {
        return (
            <div className="contentBox">
                <div className="nav">
                    <ul>
                        <li>
                            <MyNavLink
                                to="/home/going"
                                activeClassName="selectHomeNav"
                                className="homeNav"
                            >
                                <div className="iconBox">
                                    <DoubleRightOutlined />
                                </div>
                                <div className="text">进行中</div>
                                {/* 进行中 */}
                            </MyNavLink>
                        </li>
                        <li>
                            <MyNavLink
                                to="/home/finished"
                                activeClassName="selectHomeNav"
                                className="homeNav"
                            >
                                <div className="iconBox">
                                    <CheckOutlined />
                                </div>
                                <div className="text">已完成</div>
                            </MyNavLink>
                        </li>
                        <li>
                            <MyNavLink
                                to="/home/me"
                                activeClassName="selectHomeNav"
                                className="homeNav"
                            >
                                <div className="iconBox">
                                    <UserOutlined />
                                </div>
                                <div className="text">关于我</div>
                            </MyNavLink>
                        </li>
                    </ul>
                </div>
                <div className="show">
                    <div className="showBox">{renderRoutes(homeRouters)}</div>
                </div>
            </div>
        );
    }
}
