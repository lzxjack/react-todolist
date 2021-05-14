import React, { PureComponent, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Outline from './Outline';
import Content from './Content';
import Nav from './Nav';
import CenterBox from './CenterBox';
import { db } from '../../utils/cloudBase';
import { initFromDB, initID } from '../../redux/actions/doneSum';

class Home extends PureComponent {
    async componentDidMount() {
        // 判断用户是否第一次登陆
        let ifFirst = false;
        // 查询集合doneSum中有无文档
        await db
            .collection('doneSum')
            .where({})
            .get()
            .then(res => {
                // 如果没文档，则是第一次登陆
                // 否则ifFirst依然是false，不是第一次登陆
                // 不是第一次登陆，就将数据库中的count放入redux
                if (res.data.length === 0) {
                    ifFirst = true;
                } else {
                    this.props.initFromDB(res.data[0].count);
                    this.props.initID(res.data[0]._id);
                }
            });
        // 如果是第一次登陆，在集合doneSum中创建一个用于计数的文档
        if (ifFirst) {
            db.collection('doneSum')
                .add({
                    count: 0,
                })
                .then(res => {
                    // 第一次登陆初始count肯定是0，直接设置为0即可
                    this.props.initFromDB(0);
                    this.props.initID(res.id);
                });
        }
    }
    render() {
        return (
            <Fragment>
                <Nav />
                <CenterBox />
                <Outline />
                <Content />
            </Fragment>
        );
    }
}

export default withRouter(connect(() => ({}), { initFromDB, initID })(Home));
