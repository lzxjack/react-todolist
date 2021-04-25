import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MyNavLink from '../../MyNavLink';
import Login from '../../../pages/Login';
import Register from '../../../pages/Register';
import './index.css';

export default class Enter extends Component {
    render() {
        return (
            <div className="enter">
                <div className="enterBox">
                    <div className="enterHeader">
                        <MyNavLink to="/login" className="enterLogin">
                            登陆
                        </MyNavLink>
                        <MyNavLink to="/register" className="enterRegister">
                            注册
                        </MyNavLink>
                    </div>
                    <div className="enterBody">
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                    </div>
                </div>
            </div>
        );
    }
}
