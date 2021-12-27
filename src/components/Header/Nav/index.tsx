import { NavLink } from 'react-router-dom';
import s from './index.module.scss';

const Nav: React.FC = () => {
    const navArr = [
        {
            name: '近期任务',
            path: 'short',
        },
        {
            name: '长期任务',
            path: 'long',
        },
        {
            name: '已完成',
            path: 'done',
        },
        {
            name: '关于我',
            path: 'about',
        },
    ];
    return (
        <div className={s.NavBox}>
            <div className={s.nav}>
                {navArr.map((item, index) => (
                    <NavLink
                        to={item.path}
                        key={index}
                        className={({ isActive }) => (isActive ? s.linkActive : s.link)}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>
        </div>
    );
};

export default Nav;
