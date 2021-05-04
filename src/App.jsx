import React, { PureComponent, Fragment } from 'react';
import renderRoutes from './utils/renderRoutes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import routes from './router.js';
import Footer from './components/Footer';
import { auth } from './utils/cloudBase';
import { login, logout } from './redux/actions/userState';

// const auth = app.auth();

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
        this.props.history.replace('/home');
        // console.log(this.props);
    }
    render() {
        return (
            <Fragment>
                {renderRoutes(routes, this.props.userState, '/welcome')}
                <Footer />
            </Fragment>
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
