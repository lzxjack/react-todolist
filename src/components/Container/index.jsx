import React, { Component, Fragment } from 'react';
import cloudbase from '@cloudbase/js-sdk';
import './index.css';
import Welcome from './Welcome';
import User from './User';

const app = cloudbase.init({
    env: 'todolist-3gayiz0cb9b8b263',
});
const auth = app.auth();

export default class Container extends Component {
    state = { isLogin: auth.hasLoginState() };
    render() {
        return <Fragment>{this.state.isLogin ? <User /> : <Welcome />}</Fragment>;
    }
}
