import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'store/user/selectors';

const RequireAuth = () => {
	const isAuth = useSelector(authSelectors.isAuthenticated);

	if (!isAuth) {
		return <Navigate to='/login' />;
	}

	return <Outlet />;
};

export default RequireAuth;
