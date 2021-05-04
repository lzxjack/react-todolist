import React, { PureComponent, Fragment } from 'react';
import Welcome from './components/Welcome';
import Footer from './components/Footer';

export default class App extends PureComponent {
    render() {
        return (
            <Fragment>
                <Welcome />
                <Footer />
            </Fragment>
        );
    }
}
