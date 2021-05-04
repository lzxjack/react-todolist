import Login from './pages/Login';
import Register from './pages/Register';

const routes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/',
        component: Login,
    },
];

export default routes;
