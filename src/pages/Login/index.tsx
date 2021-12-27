import { useState, KeyboardEvent } from 'react';
import { auth } from '../../utils/cloudbase';
import { notification, Button, message } from 'antd';
import { CheckOutlined, CloseOutlined, ExclamationOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { setLogin } from '../../redux/actions';
import s from './index.module.scss';

interface Props {
    setLogin?: Function;
}

const Login: React.FC<Props> = ({ setLogin }) => {
    const [isFront, setIsFront] = useState(true);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [remail, setRemail] = useState('');
    const [rpwd, setRpwd] = useState('');

    const emailReg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;

    const registerValidate = () => {
        if (!emailReg.test(remail)) {
            notification.open({
                message: '信息填写错误',
                description: '请输入正确的邮箱地址!',
                duration: 7,
                icon: <CloseOutlined />,
            });
            return false;
        }
        if (!pwdReg.test(rpwd)) {
            notification.open({
                message: '信息填写错误',
                description: '请输入正确的密码，8~16位，需包含字母、数字!',
                duration: 7,
                icon: <CloseOutlined />,
            });
            return false;
        }
        return true;
    };

    const loginValidate = () => {
        if (!email || !pwd) {
            message.info('请输入邮箱和密码!');
            return false;
        }
        return true;
    };

    const register = () => {
        if (!registerValidate()) return;
        auth.signUpWithEmailAndPassword(remail, rpwd)
            .then(() => {
                setIsFront(isFront => !isFront);
                setRemail('');
                setRpwd('');
                const key = `open${Date.now()}`;
                const btn = (
                    <Button type="primary" size="small" onClick={() => notification.close(key)}>
                        好的
                    </Button>
                );
                notification.open({
                    message: '验证信息已发送',
                    description: '已发送激活邮件，请及时前往填写的邮箱中查收并确认激活~',
                    btn,
                    key,
                    duration: 0,
                    icon: <CheckOutlined />,
                });
            })
            .catch(() => {
                notification.open({
                    message: '注册失败',
                    description: '邮箱地址不存在或邮箱地址已被注册!',
                    duration: 7,
                    icon: <ExclamationOutlined />,
                });
            });
    };

    const login = () => {
        if (!loginValidate()) return;
        auth.signInWithEmailAndPassword(email, pwd)
            .then(() => {
                setLogin && setLogin(true);
                notification.open({
                    message: '登录成功!',
                    description: '欢迎使用 TodoList',
                    duration: 2,
                    placement: 'bottomLeft',
                    icon: <CheckOutlined />,
                });
            })
            .catch(() => {
                notification.open({
                    message: '用户名登陆失败!',
                    description: '请检查用户名、密码是否正确!',
                    duration: 2,
                    icon: <CloseOutlined />,
                });
            });
    };

    const isEnter = (e: KeyboardEvent, type: string) => {
        if (e.code !== 'Enter') return;
        type === 'login' ? login() : register();
    };

    return (
        <div className={s.LoginBox}>
            <div className={s.container} style={isFront ? {} : { transform: 'rotateY(-90deg)' }}>
                {/* 登录 */}
                <div className={`${s.login} ${s.loginTrans}`}>
                    <div className={s.itemBox}>
                        <label className={s.key} htmlFor="loginEmail">
                            邮箱
                        </label>
                        <input
                            type="text"
                            className={s.value}
                            id="loginEmail"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyPress={(e: KeyboardEvent) => isEnter(e, 'login')}
                        />
                    </div>
                    <div className={s.itemBox}>
                        <label className={s.key} htmlFor="loginPwd">
                            密码
                        </label>
                        <input
                            type="password"
                            className={s.value}
                            id="loginPwd"
                            value={pwd}
                            onChange={e => setPwd(e.target.value)}
                            onKeyPress={(e: KeyboardEvent) => isEnter(e, 'login')}
                        />
                    </div>
                    <div className={s.btns}>
                        <button
                            className={`${s.btn} ${s.lightBtn}`}
                            onClick={() => setIsFront(isFront => !isFront)}
                        >
                            去注册
                        </button>
                        <button className={s.btn} onClick={login}>
                            登录
                        </button>
                    </div>
                </div>
                {/* 注册 */}
                <div className={s.register}>
                    <div className={s.itemBox}>
                        <label className={s.key} htmlFor="registerEmail">
                            邮箱
                        </label>
                        <input
                            type="text"
                            className={s.value}
                            id="registerEmail"
                            value={remail}
                            onChange={e => setRemail(e.target.value)}
                            onKeyPress={(e: KeyboardEvent) => isEnter(e, 'register')}
                        />
                    </div>
                    <div className={s.itemBox}>
                        <label className={s.key} htmlFor="registerPwd">
                            密码
                        </label>
                        <input
                            type="password"
                            className={s.value}
                            id="registerPwd"
                            value={rpwd}
                            onChange={e => setRpwd(e.target.value)}
                            onKeyPress={(e: KeyboardEvent) => isEnter(e, 'register')}
                        />
                    </div>
                    <div className={s.btns}>
                        <button
                            className={`${s.btn} ${s.lightBtn}`}
                            onClick={() => setIsFront(isFront => !isFront)}
                        >
                            去登录
                        </button>
                        <button className={s.btn} onClick={register}>
                            注册
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, { setLogin })(Login);
