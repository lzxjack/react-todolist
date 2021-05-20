import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';

class CenterBox extends PureComponent {
    render() {
        // 只提供背景颜色的盒子
        return <div className="CenterBox" id={this.props.isDark ? 'CenterBoxDrak' : ''}></div>;
    }
}

export default withRouter(
    connect(
        state => ({
            isDark: state.personalData.isDark,
        }),
        {}
    )(CenterBox)
);
