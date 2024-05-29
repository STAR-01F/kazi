import React, {Suspense} from 'react';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {Grid} from '@mui/material';
import Header from '@components/header/Header';
import {AuthProvider} from '@services/firebase/context/Auth';
import {JobsProvider} from '@services/firebase/context/Jobs';
import WithAuth from '@services/firebase/hoc/WithAuth';
import WithUnauth from '@services/firebase/hoc/WithUnauth';
import LandingPage from '@components/landing/landing';
import PageCircular from '@components/progress/PageCircular';
import Homepage from '@pages/home';
import {FeedbackProvider} from '@context/Feedback';
import {UserProfileProvider} from '@services/firebase/context/UserProfile';
import VerifyEmail from '@pages/verify-email';
import ErrorPage from '@pages/404';

// Dynamic imports
const Jobpage = React.lazy(() => import('@pages/job'));
// const Homepage = React.lazy(() => import('@pages/home'));
const SignInSide = React.lazy(() => import('@pages/signin/signin'));
const SignUp = React.lazy(() => import('@pages/signup/signup'));
const Profilepage = React.lazy(() => import('@pages/profile'));
// const WelcomePage = React.lazy(() => import('@pages/welcome'));
const PasswordReset = React.lazy(() => import('@pages/password-reset'));

const Layout = () => {
  return (
    <>
      <Header />
      <Grid
        container
        width={'100vw'}
        height={{xs: 'calc(100vh - 65px)'}}
        justifyContent={'center'}
        sx={{
          overflowY: 'scroll',
        }}
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
        spacing={0}
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
      <FeedbackProvider>
        <AuthProvider>
          <Outlet />
        </AuthProvider>
      </FeedbackProvider>
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
              <Suspense fallback={<PageCircular />}>
                <SignInSide />
              </Suspense>
            ),
          },
          {
            path: 'signup',
            element: (
              <Suspense fallback={<PageCircular />}>
                <SignUp />
              </Suspense>
            ),
          },
          {
            path: 'verify-email',
            element: (
              <Suspense fallback={<PageCircular />}>
                <VerifyEmail />
              </Suspense>
            ),
          },
          {
            path: 'password-reset',
            element: (
              <Suspense fallback={<PageCircular />}>
                <PasswordReset />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: (
          <WithAuth>
            <UserProfileProvider>
              <JobsProvider>
                <Layout />
              </JobsProvider>
            </UserProfileProvider>
          </WithAuth>
        ),
        children: [
          {
            path: 'profile',
            element: (
              <Suspense fallback={<PageCircular />}>
                <Profilepage />
              </Suspense>
            ),
          },
          // {
          //   path: 'welcome',
          //   element: (
          //     <Suspense fallback={<div>Loading...</div>}>
          //       <WelcomePage />
          //     </Suspense>
          //   ),
          // },
          {
            index: true,
            element: (
              // <Suspense fallback={<PageCircular />}>
              <Homepage />
              // </Suspense>
            ),
          },
          {
            path: 'job/:id',
            element: (
              <Suspense fallback={<PageCircular />}>
                <Jobpage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
