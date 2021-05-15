import React, { PureComponent, Fragment } from 'react';
import { UserOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';
import { notification, Button, message } from 'antd';
import {
    updateAvatarUrl,
    updateNickName,
    updateAvatarTempUrl,
} from '../../../../redux/actions/userInform';
import { DEFAULT_AVATAR_URL } from '../../../../utils/constant';
import { appTcb, user } from '../../../../utils/cloudBase';
import './index.css';

class AboutMe extends PureComponent {
    state = { avatarCheck: false, fileID: '' };
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
        const avatarFile = this.inputAvatar.files[0];
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
        // 2. 判断图片大小是否>2M
        if (avatarFile.size / 1024 / 1024 > 1) {
            // 图片大于2M，提醒用户，中止操作
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
    };
    // 将图片链接上传到用户信息中
    updateAvatar = async () => {
        // avatarCheck为false，用户未选择头像
        if (!this.state.avatarCheck) {
            message.info('请先选择头像，再进行上传！');
            return;
        }
        await user
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
            message.info('请输入昵称！');
            return;
        }
        const nickNameReg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        // console.log(nickNameReg.test(nickName));
        if (!nickNameReg.test(nickName)) {
            message.warning('昵称只能出现汉字或字母哦~');
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
        await user
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
    onEnter = e => {
        if (e.keyCode === 13) this.updateNickName();
    };
    render() {
        return (
            <Fragment>
                <div className="Me">
                    <UserOutlined />
                    &nbsp;Me
                </div>
                <div className="avatarHead">
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

                    <div
                        className="upToCOSBtn"
                        onClick={() => {
                            this.inputAvatar.click();
                        }}
                    >
                        选择
                        <input
                            type="file"
                            ref={c => (this.inputAvatar = c)}
                            accept="image/*"
                            className="upToCOSInput"
                            onChange={this.beforeUpload}
                        />
                    </div>

                    <div className="updateAvatarBtn" onClick={this.updateAvatar}>
                        上传
                    </div>
                </div>
                <div className="nickNameHead">
                    <span>昵称</span>
                </div>
                <div className="updateInfoBox">
                    <div className="nickNameBox">
                        <input
                            type="text"
                            placeholder={this.props.nickName ? this.props.nickName : '怎么称呼呢？'}
                            className="inputNickName"
                            ref={c => (this.inputNickName = c)}
                            onKeyUp={this.onEnter}
                        />
                        <div className="updateNickNameBtn" onClick={this.updateNickName}>
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
    }),
    { updateAvatarUrl, updateAvatarTempUrl, updateNickName }
)(AboutMe);
