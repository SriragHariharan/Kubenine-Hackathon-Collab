//protected routes
import { Navigate } from 'react-router-dom';
import { constants } from '../constants/constants';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem(constants.AUTH_TOKEN);
  const userId = localStorage.getItem(constants.USER_ID);

  if (!token || !userId) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
