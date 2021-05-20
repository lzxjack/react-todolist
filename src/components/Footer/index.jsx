import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';

class Footer extends PureComponent {
    state = {
        poemWords: '',
        poemTitle: '',
    };
    componentDidMount() {
        // 今日诗词API
        const jinrishici = require('jinrishici');
        // 获取诗句，放入state
        jinrishici.load(result => {
            this.setState({ poemWords: result.data.content, poemTitle: result.data.origin.title });
        });
    }
    render() {
        return (
            <div className="footer" id={this.props.isDark ? 'footerDark' : ''}>
                <div className="todayPoem">
                    <span className="poemWords">{this.state.poemWords}</span>
                    <span className="poemTitle">&nbsp;——《{this.state.poemTitle}》</span>
                </div>
                <span>
                    <span className="appName">TodoList</span>
                    <span className="author">
                        &nbsp;——&nbsp;by&nbsp;
                        <a
                            className="authorName"
                            rel="noopener noreferrer"
                            href="https://lzxjack.top"
                            target="_blank"
                        >
                            飞鸟
                        </a>
                    </span>
                </span>
            </div>
        );
    }
}

export default withRouter(
    connect(
        state => ({
            isDark: state.personalData.isDark,
        }),
        {}
    )(Footer)
);
