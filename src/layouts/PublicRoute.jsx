import { Navigate } from 'react-router-dom';
import { constants } from '../constants/constants';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem(constants.AUTH_TOKEN);
  const userId = localStorage.getItem(constants.USER_ID);

  // If user is logged in, redirect to homepage
  if (token && userId) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
