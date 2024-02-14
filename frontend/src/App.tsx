import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import Jobpage from './pages/job';
import Homepage from './pages/home';
import {Grid} from '@mui/material';
import SignInSide from '@pages/login/signin';
import SignUp from '@pages/login/signup';
import Header from '@components/header/Header';
import Profilepage from './pages/profile';
import WithAuth from './services/firebase/hoc/WithAuth';
import WithUnauth from './services/firebase/hoc/WithUnauth';
import {AuthProvider} from './services/firebase/context/Auth';

const Layout = () => {
  return (
    <>
      <Header />
      <Grid
        container
        width={'100vw'}
        height={{xs: 'calc(100vh - 65px)'}}
        sx={{overflowY: 'auto'}}
        justifyContent={'center'}
      >
        <Outlet />
      </Grid>
    </>
  );
};
const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: () => (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        element: (
          <WithUnauth>
            <Outlet />
          </WithUnauth>
        ),
        children: [
          {
            id: 'signin',
            path: 'signin',
            Component: SignInSide,
          },
          {
            id: 'signup',
            path: 'signup',
            Component: SignUp,
          },
        ],
      },
      {
        element: (
          <WithAuth>
            <Outlet />
          </WithAuth>
        ),
        children: [
          {
            id: 'profile',
            path: 'profile',
            Component: Profilepage,
          },
          {
            id: 'home',
            index: true,
            Component: Homepage,
          },
          {
            id: 'job',
            path: 'job/:id',
            Component: Jobpage,
          },
        ],
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
