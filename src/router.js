import Home from './components/Home';
import Welcome from './components/Welcome';
import Login from './components/Welcome/Login';
import Register from './components/Welcome/Register';

const routes = [
    {
        path: '/home',
        component: Home,
        requiresAuth: true,
    },
    {
        path: '/welcome',
        component: Welcome,
        requiresAuth: false,
        children: [
            {
                path: '/welcome/login',
                component: Login,
                requiresAuth: false,
            },
            {
                path: '/welcome/register',
                component: Register,
                requiresAuth: false,
            },
            {
                path: '/welcome',
                component: Login,
                requiresAuth: false,
            },
        ],
    },
    {
        path: '/',
        component: Welcome,
    },
];

export default routes;
