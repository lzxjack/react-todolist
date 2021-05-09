import React, { PureComponent } from 'react';
// import { Route } from 'react-router-dom';
import MyNavLink from '../../MyNavLink';
import renderRoutes from '../../../utils/renderRoutes';
import { homeRouters } from '../../../router.js';
// import Going from './Going';
// import Finished from './Finished';
// import Me from './Me';
// import { db } from '../../../utils/cloudBase';

import { CheckOutlined, UserOutlined, DoubleRightOutlined } from '@ant-design/icons';
import './index.css';

export default class Content extends PureComponent {
    // state = { going: [] };

    // componentDidMount() {
    //     this.getAllTasks();
    // }
    // 获取所有数据
    // getAllTasks = () => {
    //     db.collection('tasks')
    //         .get()
    //         .then(res => {
    //             // 将返回的结果存放在state中
    //             this.setState({ going: res.data });
    //             // console.log(this.state.going);
    //         });
    // };

    render() {
        return (
            <div className="contentBox">
                {/* 左侧导航栏 */}
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
                            {/* <Link
                                to={{
                                    pathname: '/home/going',
                                    state: this.state.going,
                                }}
                                className="homeNav"
                            >
                                <div className="iconBox">
                                    <DoubleRightOutlined />
                                </div>
                                <div className="text">进行中</div>
                            </Link> */}
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
                {/* 右侧路由展示区 */}
                <div className="showBox">{renderRoutes(homeRouters)}</div>
                {/* <div className="showBox">
                    <Route path="/home/going" component={Going} />
                    <Route path="/home/finished" component={Finished} />
                    <Route path="/home/me" component={Me} />
                    <Redirect to="/home/going" />
                </div> */}
            </div>
        );
    }
}
