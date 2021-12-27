import EditAvatar from '../../../components/EditAvatar';
import s from './index.module.scss';

const About: React.FC = () => {
    return (
        <>
            <div className={s.blankBox}>
                <span>About Me</span>
            </div>
            <EditAvatar />
        </>
    );
};

export default About;
