import { VscChromeClose } from 'react-icons/vsc';
import { connect } from 'react-redux';
import {
    setLogin,
    setAvatar,
    setShort,
    setLong,
    setDone,
    setCount,
    setConfigID,
} from '../../../redux/actions';
import { bodyStyle } from '../../../utils/constant';
import s from './index.module.scss';

interface Props {
    setLogin?: Function;
    setAvatar?: Function;
    setShort?: Function;
    setLong?: Function;
    setDone?: Function;
    setCount?: Function;
    setConfigID?: Function;
}

const LogoutBtn: React.FC<Props> = ({
    setLogin,
    setAvatar,
    setShort,
    setLong,
    setDone,
    setCount,
    setConfigID,
}) => {
    const clearLogin = () => {
        localStorage.removeItem('x-tcb-trace_todolist-3gayiz0cb9b8b263');
        localStorage.removeItem('access_token_expire_todolist-3gayiz0cb9b8b263');
        localStorage.removeItem('access_token_todolist-3gayiz0cb9b8b263');
        localStorage.removeItem('refresh_token_todolist-3gayiz0cb9b8b263');
        localStorage.removeItem('login_type_todolist-3gayiz0cb9b8b263');
        localStorage.removeItem('user_info_todolist-3gayiz0cb9b8b263');
    };

    const recoverDark = () => {
        bodyStyle.setProperty('--deep', '#1a1a1a');
        bodyStyle.setProperty('--light', '#272727');
        bodyStyle.setProperty('--lighter', '#777777');
        bodyStyle.setProperty('--lightest', '#d1d1d1');
        bodyStyle.setProperty('--common-hover', 'rgb(65, 65, 116)');
        bodyStyle.setProperty('--font', '#d0d0d0');
        localStorage.setItem('isDark', '1');
    };

    const logout = () => {
        setAvatar && setAvatar('');
        setShort && setShort([]);
        setLong && setLong([]);
        setDone && setDone([]);
        setCount && setCount(0);
        setConfigID && setConfigID('');
        clearLogin();
        recoverDark();
        setLogin && setLogin(false);
    };
    return (
        <div className={s.LogoutBtn} onClick={logout}>
            <VscChromeClose />
        </div>
    );
};

export default connect(null, {
    setLogin,
    setAvatar,
    setShort,
    setLong,
    setDone,
    setCount,
    setConfigID,
})(LogoutBtn);
