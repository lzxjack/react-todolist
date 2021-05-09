import React, { PureComponent, Fragment } from 'react';
import { UserOutlined } from '@ant-design/icons';
import './index.css';

export default class Me extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="Me">
                    <UserOutlined />
                    &nbsp;Me
                </div>
            </Fragment>
        );
    }
}
