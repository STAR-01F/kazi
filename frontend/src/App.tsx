import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import Jobpage from './pages/job';
import Homepage from './pages/home';
import {Grid} from '@mui/material';
import Header from '@components/header/Header';
import Profilepage from './pages/profile';

const Layout = () => {
  return (
    <>
      <Header />
      <Grid container width={'100vw'} height={'100vh'} padding={2}>
        <Outlet />
      </Grid>
    </>
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
        id: 'profile',
        path: 'profile',
        Component: Profilepage,
      },
      {
        path: '*',
        Component: () => <h1>404</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
