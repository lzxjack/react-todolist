import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.css';

class Footer extends PureComponent {
    state = {
        poemWords: '',
        poemAuthor: '',
    };
    componentDidMount() {
        // 今日诗词API
        const jinrishici = require('jinrishici');
        // 获取诗句，放入state
        jinrishici.load(result => {
            this.setState({
                poemWords: result.data.content,
                poemAuthor: result.data.origin.author,
            });
        });
    }
    render() {
        return (
            <div className="footer" id={this.props.isDark ? 'footerDark' : ''}>
                <span className="author">
                    TodoList&nbsp;©&nbsp;2021&nbsp;By&nbsp;
                    <a
                        className="authorName"
                        id={this.props.isDark ? 'authorNameDark' : ''}
                        rel="noopener noreferrer"
                        href="https://lzxjack.top"
                        target="_blank"
                    >
                        飞鸟
                    </a>
                    丨
                    <a
                        className="authorName"
                        id={this.props.isDark ? 'authorNameDark' : ''}
                        rel="noopener noreferrer"
                        href="https://github.com/lzxjack/react-todolist"
                        target="_blank"
                    >
                        「源代码」
                    </a>
                </span>
                <a
                    className="icpInfo"
                    id={this.props.isDark ? 'icpInfoDark' : ''}
                    href="https://beian.miit.gov.cn"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    浙ICP备2020043821号-2
                </a>
                <span className="poemWords">
                    {/* {this.state.poemWords}&nbsp;——《{this.state.poemTitle}》 */}"
                    {this.state.poemWords}"&nbsp;——&nbsp;{this.state.poemAuthor}
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
