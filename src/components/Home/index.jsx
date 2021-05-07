import React, { PureComponent, Fragment } from 'react';
import Outline from './Outline';
import Content from './Content';

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
