import React, { PureComponent, Fragment } from 'react';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './components/Home';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import { auth } from './utils/cloudBase';
import { login, logout } from './redux/actions/userState';
import './App.css';

class App extends PureComponent {
    componentDidMount() {
        // App组件挂载后，更新登录状态到redux
        if (auth.hasLoginState()) {
            // 已经登录
            this.props.login();
        } else {
            // 未登录
            this.props.logout();
        }
    }
    render() {
        return (
            <div className="background" id={this.props.isDark ? 'backgroundDark' : ''}>
                <div className="appBox">
                    {/* 路由鉴权：渲染/welcome页面 or /home页面 */}
                    <Switch>
                        {this.props.userState ? (
                            <Fragment>
                                <Route path="/home" component={Home} />
                                <Redirect to="/home" />
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Route path="/welcome" component={Welcome} />
                                <Redirect to="/welcome" />
                            </Fragment>
                        )}
                    </Switch>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(
    connect(
        // 状态
        state => ({
            userState: state.userState,
            isDark: state.personalData.isDark,
        }),
        // 操作状态的方法
        { login, logout }
    )(App)
);
