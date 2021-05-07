import React, { PureComponent } from 'react';

import { AlignLeftOutlined, UserOutlined } from '@ant-design/icons';
import './index.css';

export default class Content extends PureComponent {
    render() {
        return (
            <div className="contentBox">
                <div className="nav">
                    <ul>
                        <li>
                            <AlignLeftOutlined />
                            <span className="test">&nbsp;&nbsp;任务</span>
                        </li>
                        <li>
                            <UserOutlined />
                            <span className="test">&nbsp;&nbsp;关于</span>
                        </li>
                    </ul>
                </div>
                <div className="show">{/* <div className="test"></div> */}</div>
            </div>
        );
    }
}
