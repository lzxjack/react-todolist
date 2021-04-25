import React, { Component } from 'react';
import './index.css';
import Display from './Display';
import Enter from './Enter';

export default class Container extends Component {
    render() {
        return (
            <div className="container">
                <Display />
                <Enter />
            </div>
        );
    }
}
