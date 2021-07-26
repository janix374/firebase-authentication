import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PropTypes from 'prop-types';

// Destructuring assignment { component: Component, ...rest }
const PrivateRout = ({ component: Component, ...rest }) => {
	const { currentUser } = useAuth();

	console.log(rest);
	return (
		<Route
			{...rest}
			render={(props) => {
				return currentUser ? (
					<Component {...props} />
				) : (
					<Redirect to='/login' />
				);
			}}
		></Route>
	);
};

PrivateRout.propTypes = {
	component: PropTypes.any,
};

export default PrivateRout;
