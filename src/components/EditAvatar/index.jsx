import { message } from 'antd';
import { useState, useRef } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { upToCosAPI, updateAvatarAPI } from '../../utils/api';
import { connect } from 'react-redux';
import { setAvatar } from '../../redux/actions';
import s from './index.module.scss';

const EditAvatar = ({ avatar, setAvatar, configID }) => {
    const [tempAvatar, setTempAvatar] = useState(avatar);
    const [loading, setLoading] = useState(false);
    const [avatarCheck, setAvatarCheck] = useState(false);

    const selectImg = useRef();

    const recover = () => {
        selectImg.current.value = '';
        setLoading(false);
    };

    const beforeUpload = async () => {
        setLoading(true);
        const avatarFile = await selectImg.current.files[0];
        const fileType = avatarFile.type;
        const fileEnd = fileType.split('/')[1];
        // 1. 判断是否是图片文件
        if (!(fileType === 'image/png' || fileType === 'image/bmp' || fileType === 'image/jpeg')) {
            message.info('请选择图片!');
            recover();
            return;
        }
        // 2. 判断图片大小是否>1M
        if (avatarFile.size / 1024 / 1024 >= 1) {
            message.info('图片大小需小于 1M !');
            recover();
            return;
        }
        const { isTrue, res } = await upToCosAPI(fileEnd, avatarFile);
        if (isTrue) {
            setTempAvatar(res.download_url.split('?')[0]);
            message.success('选择头像成功!');
            setAvatarCheck(true);
        } else {
            message.info('选择头像失败，请重试!');
        }
        recover();
    };

    const updateAvatar = async () => {
        if (!avatarCheck) {
            message.info('请先选择头像，再进行上传!');
            return;
        }
        const isTrue = await updateAvatarAPI(configID, tempAvatar);
        if (isTrue) {
            setAvatar(tempAvatar);
            message.info('更新头像成功!');
        } else {
            message.info('更新头像失败，请重试!');
        }
        setAvatarCheck(false);
    };

    return (
        <div className={s.EditAvatarBox}>
            {tempAvatar ? (
                <img src={tempAvatar} alt="avatar" className={s.avatar} />
            ) : (
                <div className={s.noAvatar}></div>
            )}
            <div className={s.btns}>
                <button onClick={() => selectImg.current.click()}>
                    选择
                    <input
                        type="file"
                        accept="image/*"
                        ref={selectImg}
                        className={s.upToCOSInput}
                        onChange={beforeUpload}
                    />
                </button>
                <button onClick={updateAvatar}>上传</button>
            </div>
            <div className={s.loading}>{loading ? <LoadingOutlined /> : null}</div>
        </div>
    );
};

export default connect(
    state => ({
        avatar: state.avatar,
        configID: state.configID,
    }),
    { setAvatar }
)(EditAvatar);
