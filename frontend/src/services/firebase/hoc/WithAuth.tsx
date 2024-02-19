import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import PageCircular from '@components/progress/PageCircular';

interface RequireAuthProps {
  children: React.ReactNode;
}
const WithAuth = ({children}: RequireAuthProps) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  if (loading) {
    return <PageCircular sx={{height: '100vh', width: '100vw'}} />;
  }

  if (!user) {
    return <Navigate to="/signin" state={{from: location}} replace />;
  }
  return children;
};

export default WithAuth;
