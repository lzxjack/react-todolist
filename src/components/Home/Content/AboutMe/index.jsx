import React, { PureComponent, Fragment } from 'react';
import {
    UserOutlined,
    CloseOutlined,
    CheckOutlined,
    PictureOutlined,
    ToTopOutlined,
    ExclamationOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { notification, Button, message, Tooltip } from 'antd';
import {
    updateAvatarUrl,
    updateNickName,
    updateAvatarTempUrl,
    updateUserName,
} from '../../../../redux/actions/userInform';
import { LoadingOutlined } from '@ant-design/icons';
import { DEFAULT_AVATAR_URL } from '../../../../utils/constant';
import { appTcb, auth } from '../../../../utils/cloudBase';
import './index.css';

class AboutMe extends PureComponent {
    state = { avatarCheck: false, fileID: '', avatarLoading: false };
    // 头像格式错误的提醒消息
    openAvatarTypeError = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                好的
            </Button>
        );
        notification.open({
            message: '头像选取失败！',
            description: '请上传图片，仅支持 png、bmp、jpeg、jpg 格式的图片。',
            btn,
            key,
            duration: 0,
            icon: <CloseOutlined />,
        });
    };
    // 头像大小超出的提醒消息
    openAvatarSizeError = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                好的
            </Button>
        );
        notification.open({
            message: '头像选取失败！',
            description: '请上传小于或等于 1M 的图片。',
            btn,
            key,
            duration: 0,
            icon: <CloseOutlined />,
        });
    };
    // 选中图片之后的回调
    // 图片上传到云存储，并返回链接，展示图片
    beforeUpload = async () => {
        // 获取文件对象
        const avatarFile = await this.inputAvatar.files[0];
        // 图片加载中，avatarLoading改为true，页面渲染加载的效果
        this.setState({ avatarLoading: true });
        // 文件类型
        const fileType = avatarFile.type;
        // 文件后缀
        const fileEnd = fileType.split('/')[1];
        // 1. 判断是否是图片文件
        if (!(fileType === 'image/png' || fileType === 'image/bmp' || fileType === 'image/jpeg')) {
            // 不是图片文件，提醒用户，中止操作
            this.openAvatarTypeError();
            return;
        }
        // 2. 判断图片大小是否>1M
        if (avatarFile.size / 1024 / 1024 > 1) {
            // 图片大于1M，提醒用户，中止操作
            this.openAvatarSizeError();
            return;
        }

        // 3. 图片上传到云存储
        await appTcb
            .uploadFile({
                // 云存储的路径
                // nanoid()生成唯一随机数
                cloudPath: `userAvatar/${nanoid()}.${fileEnd}`,
                // 需要上传的文件，File 类型
                filePath: avatarFile,
            })
            .then(res => {
                // 返回文件 ID
                this.setState({ fileID: res.fileID });
            });

        // 4. 获得图片链接
        await appTcb
            .getTempFileURL({
                fileList: [this.state.fileID],
            })
            .then(res => {
                // 5. 根据图片链接展示图片
                // 图片链接放入redux中，驱动页面更新，预览头像
                // 将avatarCheck改为true，表示已经选择了图片文件，可以进行上传操作
                // this.setState({ avatarCheck: true, tempAvatarURL: res.fileList[0].tempFileURL });
                this.setState({ avatarCheck: true });
                this.props.updateAvatarTempUrl(res.fileList[0].tempFileURL);
            });
        // 加载完毕，改回false
        this.setState({ avatarLoading: false });
    };
    // 将图片链接上传到用户信息中
    updateAvatar = async () => {
        // avatarCheck为false，用户未选择头像
        if (!this.state.avatarCheck) {
            message.warning('请先选择头像，再进行上传！');
            return;
        }
        await auth.currentUser
            .update({
                avatarUrl: this.props.avatarTempUrl,
            })
            .then(() => {
                // 将state中的tempAvatarURL放入redux，redux状态改变，驱动Outline组件头像变化
                this.props.updateAvatarUrl(this.props.avatarTempUrl);
                // 将清空file，否则下次若选择同样的图片，不会触发onchange
                this.inputAvatar.value = '';
                // 上传头像完毕， avatarCheck重新设置为false,fileID清空
                this.setState({ avatarCheck: false, fileID: '' });
                // 提醒用户
                message.success('头像更新成功！');
            });
    };

    // 修改昵称
    updateNickName = async () => {
        // 取得输入的昵称，去掉首尾空格
        const nickName = this.inputNickName.value.trim();
        if (nickName === '') {
            // 清空输入框
            this.inputNickName.value = '';
            message.info('昵称不能为空~');
            return;
        }
        const nickNameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        // console.log(nickNameReg.test(nickName));
        if (!nickNameReg.test(nickName)) {
            message.warning('昵称只能出现汉字或字母~');
            return;
        }
        // 判断用户输入的nickname长度是否大于15
        if (nickName.length > 15) {
            message.warning('昵称过长，请输入15字以下的昵称~');
            return;
        }
        // 判断新旧昵称
        if (nickName === this.props.nickName) {
            // 判断用户输入的nickname 是否等于 现在的nickname
            message.warning('新旧昵称相同，无需修改~');
            return;
        }
        // 发送修改请求
        await auth.currentUser
            .update({
                nickName,
            })
            .then(() => {
                this.inputNickName.value = '';
                this.props.updateNickName(nickName);
                message.success('昵称更新成功！');
            });
    };
    // 监听是否按下回车
    nickOnEnter = e => {
        if (e.keyCode === 13) this.updateNickName();
    };
    // 监听是否按下回车
    userOnEnter = e => {
        if (e.keyCode === 13) this.updateUserName();
    };
    // 绑定用户名
    updateUserName = async () => {
        // 用户名
        const userName = this.inputUserName.value;
        if (userName === '') {
            // 清空输入框
            this.inputUserName.value = '';
            message.info('请输入用户名~');
            return;
        }
        let uerNameValidate = true;
        const userNameReg = /^\w*[a-z]+\w*$/i;
        // 判断格式：（字母）或（字母+数字），不能纯数字
        if (!userNameReg.test(userName)) {
            uerNameValidate = false;
            this.openUserNameTypeFail('error');
        }
        // 判断长度
        if (userName.length < 2 || userName.length > 20) {
            uerNameValidate = false;
            this.openUserNameLenFail('error');
        }
        // 不满足格式规则，中止
        if (!uerNameValidate) return;
        // 用户名已存在，中止
        if (await auth.isUsernameRegistered(userName)) {
            this.openUserNameRegistered('info');
            return;
        }
        // 发送请求，绑定用户名
        await auth.currentUser
            .updateUsername(userName)
            .then(() => {
                // 绑定成功，将用户名放入redux
                this.props.updateUserName(userName);
                // 清空输入框
                this.inputUserName.value = '';
                // 提示消息
                this.openUserNameSuccess('success');
            })
            .catch(() => {
                // 失败
                notification.open({
                    message: '绑定失败！',
                    description: '网络故障，请稍后重试！',
                    duration: 7,
                    icon: <ExclamationOutlined />,
                });
                return;
            });
    };
    // 用户名格式错误
    openUserNameTypeFail = () => {
        notification.open({
            message: '用户名格式错误！',
            description: '用户名可以包含数字和字母，但是不允许是纯数字。不允许出现符号。',
            duration: 7,
            icon: <CloseOutlined />,
        });
    };
    // 用户名长度错误
    openUserNameLenFail = () => {
        notification.open({
            message: '用户名格式错误！',
            description: '用户名长度在 2~20 之间。',
            duration: 7,
            icon: <CloseOutlined />,
        });
    };
    // 用户名已存在
    openUserNameRegistered = () => {
        notification.open({
            message: '用户名已存在！',
            description: '来晚啦，用户名已被注册，换一个吧！',
            duration: 7,
            icon: <ExclamationOutlined />,
        });
    };
    // 用户名绑定成功
    openUserNameSuccess = () => {
        const key = `open${Date.now()}`;
        const btn = (
            <Button type="primary" size="small" onClick={() => notification.close(key)}>
                好的
            </Button>
        );
        notification.open({
            message: '绑定成功！',
            description: '用户名绑定成功，可用用户名直接登录！',
            btn,
            key,
            duration: 0,
            icon: <CheckOutlined />,
        });
    };
    render() {
        return (
            <Fragment>
                <div className="Me">
                    <UserOutlined />
                    &nbsp;关于我
                </div>
                <div className="headName">
                    <span>头像</span>
                </div>
                <div className="updateAvatarBox">
                    <div className="meAvatarBox">
                        <img
                            src={
                                this.props.avatarTempUrl === ''
                                    ? DEFAULT_AVATAR_URL
                                    : this.props.avatarTempUrl
                            }
                            alt="头像"
                            className="meAvatar"
                        />
                    </div>
                    {this.state.avatarLoading ? (
                        <div className="loading">
                            <LoadingOutlined />
                        </div>
                    ) : null}
                    <Tooltip placement="bottom" title="选择头像">
                        <div
                            className="upToCOSBtn"
                            onClick={() => {
                                this.inputAvatar.click();
                            }}
                        >
                            <PictureOutlined />
                            <input
                                type="file"
                                ref={c => (this.inputAvatar = c)}
                                accept="image/*"
                                className="upToCOSInput"
                                onChange={this.beforeUpload}
                            />
                        </div>
                    </Tooltip>
                    <Tooltip placement="bottom" title="上传头像">
                        <div className="updateAvatarBtn" onClick={this.updateAvatar}>
                            <ToTopOutlined />
                        </div>
                    </Tooltip>
                </div>

                <div className="nickUserName">
                    <div className="headName">
                        <span>昵称</span>
                    </div>
                    <div className="updateInfoBox">
                        <input
                            type="text"
                            placeholder={this.props.nickName ? this.props.nickName : '怎么称呼呢？'}
                            className="inputName"
                            ref={c => (this.inputNickName = c)}
                            onKeyUp={this.nickOnEnter}
                        />
                        <div className="updateNameBtn" onClick={this.updateNickName}>
                            <CheckOutlined />
                        </div>
                    </div>
                </div>

                <div className="nickUserName">
                    <div className="headName">
                        <span>登录名</span>
                    </div>
                    <div className="updateInfoBox">
                        <input
                            type="text"
                            placeholder={
                                this.props.userName ? this.props.userName : '绑定后可用用户名登录'
                            }
                            className="inputName"
                            ref={c => (this.inputUserName = c)}
                            onKeyUp={this.userOnEnter}
                        />
                        <div className="updateNameBtn" onClick={this.updateUserName}>
                            <CheckOutlined />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        avatarUrl: state.userInform.avatarUrl,
        avatarTempUrl: state.userInform.avatarTempUrl,
        nickName: state.userInform.nickName,
        userName: state.userInform.userName,
    }),
    { updateAvatarUrl, updateAvatarTempUrl, updateNickName, updateUserName }
)(AboutMe);
