import React, { PureComponent } from 'react';
import renderRoutes from './utils/renderRoutes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { appRoutes } from './router.js';
import Footer from './components/Footer';
import { auth } from './utils/cloudBase';
import { login, logout } from './redux/actions/userState';
import './App.css';

class App extends PureComponent {
    componentDidMount() {
        // App组件挂载后，判断登录状态
        if (auth.hasLoginState()) {
            // 已经登录
            this.props.login();
        } else {
            // 未登录
            this.props.logout();
        }
        // 无论是否登录，都尝试跳转到/home页，由路由鉴权作进一步判断
        this.props.history.replace('/home');
    }
    render() {
        return (
            <div className="background">
                <div className="appBox">
                    {/* 路由鉴权：渲染/welcome页面 or /home页面 */}
                    {renderRoutes(appRoutes, this.props.userState, '/welcome')}
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
        }),
        // 操作状态的方法
        { login, logout }
    )(App)
);
