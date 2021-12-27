import { MdDarkMode } from 'react-icons/md';
import { bodyStyle } from '../../../utils/constant';
import s from './index.module.scss';

const ModeToggle: React.FC = () => {
    // const [isDark, setIsDark] = useState(false);
    const toggle = () => {
        const isDark = localStorage.getItem('isDark');
        if (isDark === '1') {
            bodyStyle.setProperty('--deep', '#ffffff');
            bodyStyle.setProperty('--light', '#dfdfdf');
            bodyStyle.setProperty('--lighter', '#b8b8b8');
            bodyStyle.setProperty('--lightest', '#c4c4c4');
            bodyStyle.setProperty('--common-hover', 'rgb(127, 127, 231)');
            bodyStyle.setProperty('--font', '#222222');
            localStorage.setItem('isDark', '0');
        } else {
            bodyStyle.setProperty('--deep', '#1a1a1a');
            bodyStyle.setProperty('--light', '#272727');
            bodyStyle.setProperty('--lighter', '#777777');
            bodyStyle.setProperty('--lightest', '#d1d1d1');
            bodyStyle.setProperty('--common-hover', 'rgb(65, 65, 116)');
            bodyStyle.setProperty('--font', '#d0d0d0');
            localStorage.setItem('isDark', '1');
        }
    };
    return (
        <div className={s.ToggleBtn} onClick={toggle}>
            <MdDarkMode />
        </div>
    );
};

export default ModeToggle;
