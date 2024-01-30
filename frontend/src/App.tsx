import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Jobpage from './pages/job';
import Homepage from './pages/home';
import { Grid } from '@mui/material';

const Layout = () => {
    return (
        <Grid container width={'100vw'} height={'100vh'} padding={2}>
            <Outlet />
        </Grid> 

    );
};
const router = createBrowserRouter([
    {
        id: 'root',
        path: '/',
        Component: Layout,
        children: [
            {
                id: 'home',
                index: true,
                Component: Homepage,
            },
            {
                id: 'job',
                path: ':id',
                Component: Jobpage,
            },
            {
                path: '*',
                Component: () => <h1>404</h1>,
            },
            {
                path: 'login',
                Component: () => <h1>Login Page</h1>,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
