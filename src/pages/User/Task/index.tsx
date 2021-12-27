import Input from '../../../components/Input';
import List from '../../../components/List';

interface Props {
    isShort: boolean;
}

const Task: React.FC<Props> = ({ isShort }) => (
    <>
        <Input isShort={isShort} />
        <List isShort={isShort} />
    </>
);

export default Task;
