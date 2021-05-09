import React, { PureComponent, Fragment } from 'react';
// import Footer from '../Footer';
import Outline from './Outline';
import Content from './Content';
import './index.css';

export default class Home extends PureComponent {
    // componentDidMount() {
    //     console.log(
    //         JSON.parse(sessionStorage.getItem('user_info_todolist-3gayiz0cb9b8b263')).content.email
    //     );
    // }
    render() {
        return (
            <Fragment>
                <Outline />
                <Content />
            </Fragment>
        );
    }
}
