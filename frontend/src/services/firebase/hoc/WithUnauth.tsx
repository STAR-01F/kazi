import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import PageCircular from '@components/progress/PageCircular';

interface RequireAuthProps {
  children: React.ReactNode;
}

const WithUnauth = ({children}: RequireAuthProps) => {
  const {user, loading} = useAuth();
  const location = useLocation();
  if (loading) {
    return <PageCircular sx={{height: '100vh', width: '100vw'}} />;
  }

  if (
    user &&
    (user.emailVerified || user.providerData[0].providerId === 'github.com')
  ) {
    return <Navigate to="/" state={{from: location}} replace />;
  }
  return children;
};

export default WithUnauth;
