import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRout from './PrivateRout';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';

const App = () => {
	return (
		<Container
			className='d-flex algin-items-center justify-content-center'
			style={{ minHeight: '100vh' }}
		>
			<div className='w-100' style={{ maxWidth: '400px' }}>
				<Router>
					<AuthProvider>
						<Switch>
							<PrivateRout exact path='/' component={Dashboard} />
							<PrivateRout path='/update-portfolio' component={UpdateProfile} />
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
