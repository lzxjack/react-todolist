import { useEffect, lazy, Suspense } from 'react';
import Header from '../../components/Header';
import { getTasksAPI, createConfigAPI, getConfigAPI } from '../../utils/api';
import { connect } from 'react-redux';
import { TaskObj, storeState } from '../../utils/interface';
import {
  setAvatar,
  setShort,
  setLong,
  setDone,
  setConfigID,
  setCount
} from '../../redux/actions';
import { Routes, Route, Navigate } from 'react-router-dom';
import s from './index.module.scss';

interface Props {
  setAvatar?: Function;
  setShort?: Function;
  setLong?: Function;
  setDone?: Function;
  setCount?: Function;
  setConfigID?: Function;
}

const Task = lazy(() => import('../../pages/User/Task'));
const Done = lazy(() => import('../../pages/User/Done'));

const User: React.FC<Props> = ({
  setShort,
  setLong,
  setDone,
  setAvatar,
  setCount,
  setConfigID
}) => {
  const getAllTasks = async () => {
    const { tasks, isTrue } = await getTasksAPI();
    if (isTrue) {
      const short: TaskObj[] = tasks.filter(item => !item.done && item.isShort);
      const long: TaskObj[] = tasks.filter(item => !item.done && !item.isShort);
      const done: TaskObj[] = tasks.filter(item => item.done);
      setShort && setShort(short);
      setLong && setLong(long);
      setDone && setDone(done);
    }
  };
  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  interface FirstRes {
    id: string;
    requestId: string;
  }

  interface ConfigObj {
    avatar: string;
    count: number;
    _id: string;
    _openid: string;
  }

  interface NotFirstRes {
    data: ConfigObj[];
  }

  const getConfig = async () => {
    const { isTrue, isFirst, res } = await getConfigAPI();
    if (!isTrue) return;
    if (isFirst) {
      const { isTrue: _isTrue, res } = await createConfigAPI();
      if (!_isTrue) return;
      setConfigID && setConfigID((res as FirstRes).id);
    } else {
      const { avatar, count, _id } = (res as NotFirstRes).data[0];
      setAvatar && setAvatar(avatar);
      setCount && setCount(count);
      setConfigID && setConfigID(_id);
    }
  };

  useEffect(() => {
    getConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.UserBox}>
      <div className={s.header}>
        <Header />
      </div>
      <div className={s.body}>
        <div className={s.container}>
          <Suspense fallback={<></>}>
            <Routes>
              <Route path='short' element={<Task isShort={true} />} />
              <Route path='long' element={<Task isShort={false} />} />
              <Route path='done' element={<Done />} />
              <Route path='*' element={<Navigate to='short' replace />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: storeState) => ({
    short: state.short,
    long: state.long,
    done: state.done
  }),
  { setShort, setLong, setDone, setAvatar, setConfigID, setCount }
)(User);
