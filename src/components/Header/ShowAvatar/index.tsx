import s from './index.module.scss';
import { connect } from 'react-redux';
import { storeState } from '../../../utils/interface';

interface Props {
    avatar?: string;
}

const ShowAvatar: React.FC<Props> = ({ avatar }) => (
    <div className={s.ShowAvatarBox}>{avatar ? <img src={avatar} alt="avatar" /> : null}</div>
);

export default connect(
    (state: storeState) => ({
        avatar: state.avatar,
    }),
    null
)(ShowAvatar);
