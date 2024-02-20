import {Navigate, useLocation} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

interface RequireAuthProps {
  children: React.ReactNode;
}
const WithAuth = ({children}: RequireAuthProps) => {
  const {user, loading} = useAuth();
  const location = useLocation();

  // TODO: create a better loading screen
  if (loading) {
    return <div>loading...</div>;
  }

  if (!user || !user.emailVerified) {
    return <Navigate to="/signin" state={{from: location}} replace />;
  }
  return children;
};

export default WithAuth;
