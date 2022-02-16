import { useEffect, lazy, Suspense } from 'react';
import { auth } from './utils/cloudbase';
import { bodyStyle } from './utils/constant';
import { storeState } from './utils/interface';
import { connect } from 'react-redux';
import { setLogin } from './redux/actions';
import { Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import User from './pages/User';
import s from './App.module.scss';
import Footer from './components/Footer';

interface Props {
  login?: boolean;
  setLogin?: Function;
}

const User = lazy(() => import('./pages/User'));
const Login = lazy(() => import('./pages/Login'));

const App: React.FC<Props> = ({ login, setLogin }) => {
  useEffect(() => {
    auth.hasLoginState() && setLogin && setLogin(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem('isDark') === null) localStorage.setItem('isDark', '1');
    if (localStorage.getItem('isDark') === '0') {
      bodyStyle.setProperty('--deep', '#ffffff');
      bodyStyle.setProperty('--light', '#dfdfdf');
      bodyStyle.setProperty('--lighter', '#b8b8b8');
      bodyStyle.setProperty('--lightest', '#c4c4c4');
      bodyStyle.setProperty('--common-hover', 'rgb(127, 127, 231)');
      bodyStyle.setProperty('--font', '#222222');
    }
  }, []);

  return (
    <div className={s.AppBox}>
      <Routes>
        {login ? (
          <>
            <Route
              path='user/*'
              element={
                <Suspense fallback={<></>}>
                  <User />
                </Suspense>
              }
            />
            <Route path='*' element={<Navigate to='user/*' replace />} />
          </>
        ) : (
          <>
            <Route
              path='/'
              element={
                <Suspense fallback={<></>}>
                  <Login />
                </Suspense>
              }
            />
            <Route path='*' element={<Navigate to='/' replace />} />
          </>
        )}
      </Routes>
      <Footer/>
    </div>
  );
};

export default connect(
  (state: storeState) => ({
    login: state.login,
  }),
  { setLogin }
)(App);
