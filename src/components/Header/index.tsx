import Nav from './Nav';
import LogoutBtn from './LogoutBtn';
import ModeToggle from './ModeToggle';
import ShowAvatar from './ShowAvatar';
import s from './index.module.scss';

const Header: React.FC = () => (
    <div className={s.HeaderBox}>
        <ShowAvatar />
        <Nav />
        <LogoutBtn />
        <ModeToggle />
    </div>
);

export default Header;
