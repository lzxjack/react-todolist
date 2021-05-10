import React, { PureComponent, Fragment } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { auth } from '../../../../utils/cloudBase';
import './index.css';

const user = auth.currentUser;
export default class Me extends PureComponent {
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
                                user.avatarUrl === ''
                                    ? 'https://jack-img.oss-cn-hangzhou.aliyuncs.com/img/20210510203904.png'
                                    : user.avatarUrl
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
