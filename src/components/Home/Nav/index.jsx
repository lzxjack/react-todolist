import React, { PureComponent, Fragment } from 'react';
import { CheckOutlined, UserOutlined, DoubleRightOutlined } from '@ant-design/icons';
import MyNavLink from '../../MyNavLink';
import './index.css';

export default class Nav extends PureComponent {
    render() {
        return (
            <Fragment>
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
            </Fragment>
        );
    }
}
