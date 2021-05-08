import React, { PureComponent, Fragment } from 'react';
import './index.css';

export default class Going extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="Going">Going</div>
                <input type="text" className="inputTask" />
            </Fragment>
        );
    }
}
