import React, { PureComponent, Fragment } from 'react';
import { CheckOutlined, UserOutlined, DoubleRightOutlined, BellOutlined } from '@ant-design/icons';
import MyNavLink from '../../MyNavLink';
import './index.css';

export default class Nav extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="nav">
                    <ul>
                        <li>
                            <MyNavLink to="/home/shortterm" className="homeNav">
                                <div className="iconBox">
                                    <DoubleRightOutlined />
                                </div>
                                <div className="text">近期任务</div>
                            </MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to="/home/longterm" className="homeNav">
                                <div className="iconBox">
                                    <BellOutlined />
                                </div>
                                <div className="text">长期任务</div>
                            </MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to="/home/finished" className="homeNav">
                                <div className="iconBox">
                                    <CheckOutlined />
                                </div>
                                <div className="text">已完成</div>
                            </MyNavLink>
                        </li>
                        <li>
                            <MyNavLink to="/home/me" className="homeNav">
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
