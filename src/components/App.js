import { Container } from '@material-ui/core';
import { AuthProvider } from '../contexts/AuthContext';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRout from './PrivateRout';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

const App = () => {
	return (
		<Container>
			<div>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRout exact path='/' component={Dashboard} />
							<PrivateRout path='/updateportfolio' component={UpdateProfile} />
							<Route path='/signup' component={Signup} />
							<Route path='/login' component={Login} />
							<Route path='/forgot-password' component={ForgotPassword} />
						</Switch>
					</AuthProvider>
				</Router>
			</div>
		</Container>
	);
};

export default App;
