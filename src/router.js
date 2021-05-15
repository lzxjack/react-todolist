import Home from './components/Home';
import Welcome from './components/Welcome';
import Login from './components/Welcome/Login';
import Register from './components/Welcome/Register';
import Going from './components/Home/Content/Going';
import Finished from './components/Home/Content/Finished';
import AboutMe from './components/Home/Content/AboutMe';

export const appRoutes = [
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

export const homeRouters = [
    {
        path: '/home/going',
        component: Going,
        requiresAuth: false,
    },
    {
        path: '/home/finished',
        component: Finished,
        requiresAuth: false,
    },
    {
        path: '/home/me',
        component: AboutMe,
    },
    {
        path: '/home',
        component: Going,
    },
];
