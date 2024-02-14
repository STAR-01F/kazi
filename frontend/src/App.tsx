import React, {Suspense} from 'react';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {Grid} from '@mui/material';
import Header from '@components/header/Header';
import {AuthProvider} from '@services/firebase/context/Auth';
import WithAuth from '@services/firebase/hoc/WithAuth';
import WithUnauth from '@services/firebase/hoc/WithUnauth';
import LandingPage from '@pages/login/landing';

// Dynamic imports
const Jobpage = React.lazy(() => import('@pages/job'));
const Homepage = React.lazy(() => import('@pages/home'));
const SignInSide = React.lazy(() => import('@pages/login/signin'));
const SignUp = React.lazy(() => import('@pages/login/signup'));
const Profilepage = React.lazy(() => import('@pages/profile'));

const Layout = () => {
  return (
    <>
      <Header />
      <Grid
        container
        width={'100vw'}
        height={{xs: 'calc(100vh - 65px)'}}
        justifyContent={'center'}
        sx={{overflowY: 'auto'}}
      >
        <Outlet />
      </Grid>
    </>
  );
};

const RegistrationLayout = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        width={'100vw'}
        height={'100vh'}

        sx={{overflowY: 'auto'}}
      >
        <LandingPage />
  
        <Grid item sm={12} md={6}>
          <Outlet />
        </Grid>

      </Grid>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        element: (
          <WithUnauth>
            <RegistrationLayout />
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
            <Layout />
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
