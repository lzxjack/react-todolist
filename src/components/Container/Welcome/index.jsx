import React, { Component } from 'react';
import './index.css';
import Display from './Display';
import Enter from './Enter';

export default class Welcome extends Component {
    render() {
        return (
            <div className="welcome">
                <Display />
                <Enter />
            </div>
        );
    }
}
