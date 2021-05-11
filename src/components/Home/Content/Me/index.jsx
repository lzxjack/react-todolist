import React, { PureComponent, Fragment } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { updateAvatarUrl, updateNickName } from '../../../../redux/actions/userInform';
import { DEFAULT_AVATAR_URL } from '../../../../utils/constant';
// import { auth } from '../../../../utils/cloudBase';
import './index.css';

class Me extends PureComponent {
    render() {
        return (
            <Fragment>
                <div className="Me">
                    <UserOutlined />
                    &nbsp;Me
                </div>
                <div className="updateAvatarBox">
                    <div className="meAvatarBox">
                        <img
                            src={
                                this.props.userInform.avatarUrl === ''
                                    ? DEFAULT_AVATAR_URL
                                    : this.props.userInform.avatarUrl
                            }
                            alt="头像"
                            className="meAvatar"
                        />
                    </div>
                    <div className="upToOSSBtn">上传</div>
                    <div className="updateAvatarBtn">更新</div>
                </div>
                <div className="updateInfoBox"></div>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        userInform: state.userInform,
    }),
    { updateAvatarUrl, updateNickName }
)(Me);
