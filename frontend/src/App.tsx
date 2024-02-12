import React, {Suspense} from 'react';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {Grid} from '@mui/material';
import Header from '@components/header/Header';
import {AuthProvider} from './services/firebase/context/Auth';
import WithAuth from './services/firebase/hoc/WithAuth';
import WithUnauth from './services/firebase/hoc/WithUnauth';

// Dynamic imports
const Jobpage = React.lazy(() => import('./pages/job'));
const Homepage = React.lazy(() => import('./pages/home'));
const SignInSide = React.lazy(() => import('@pages/login/signin'));
const SignUp = React.lazy(() => import('@pages/login/signup'));
const Profilepage = React.lazy(() => import('./pages/profile'));

const Layout = () => {
  return (
    <>
      <Header />
      <Grid
        container
        width={'100vw'}
        height={{xs: 'calc(100vh - 65px)'}}
        sx={{overflowY: 'auto'}}
      >
        <Outlet />
      </Grid>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: '/',
    element: (
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
            path: 'signin',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <SignInSide />
              </Suspense>
            ),
          },
          {
            path: 'signup',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <SignUp />
              </Suspense>
            ),
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
            path: 'profile',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Profilepage />
              </Suspense>
            ),
          },
          {
            index: true,
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Homepage />
              </Suspense>
            ),
          },
          {
            path: 'job/:id',
            element: (
              <Suspense fallback={<div>Loading...</div>}>
                <Jobpage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <h1>404</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
