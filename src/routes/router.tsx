import { Home, Popular, TopRated, NowPlaying, Show, Favorites } from '../pages';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import { ROUTES } from './constants';

const routes: RouteObject[] = [
    {
        path: '/', element: <PrivateRouter />, 
        children:[
            { path: ROUTES.HOME, element: <Home /> },
            { path: ROUTES.POPULAR, element: <Popular /> },
            { path: ROUTES.TOPRATED, element: <TopRated /> },
            { path: ROUTES.NOWPLAYING, element: <NowPlaying /> },
            { path: `${ROUTES.SHOW}:id`, element: <Show />},
            { path: ROUTES.FAVORITES, element: <Favorites /> }
            
        ]
    },
    {
        path: 'login', element: <PublicRouter />,
        children: [
            { path: '/login', element: <div>Login</div> },
        ]
    }
]

export const router = createBrowserRouter( routes );
