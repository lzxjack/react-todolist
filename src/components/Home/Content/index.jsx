import React, { PureComponent } from 'react';
// import { Route } from 'react-router-dom';
import renderRoutes from '../../../utils/renderRoutes';
import { homeRouters } from '../../../router.js';
import './index.css';

export default class Content extends PureComponent {
    render() {
        return <div className="contentBox">{renderRoutes(homeRouters)}</div>;
    }
}
