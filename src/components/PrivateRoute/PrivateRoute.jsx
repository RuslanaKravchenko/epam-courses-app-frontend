import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import authSelectors from 'store/user/selectors';

const PrivateRoute = ({ children }) => {
	const isAdmin = useSelector(authSelectors.isAdmin);

	if (!isAdmin) {
		return <Navigate to='/courses' />;
	}

	return children;
};

PrivateRoute.propTypes = {
	children: PropTypes.element.isRequired,
};

export default PrivateRoute;
