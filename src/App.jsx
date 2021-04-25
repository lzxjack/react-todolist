import React, { Component, Fragment } from 'react';
import Footer from './components/Footer';
import Container from './components/Container';

export default class App extends Component {
    render() {
        return (
            <Fragment>
                <Container />
                <Footer />
            </Fragment>
        );
    }
}
