import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	profileClass: {
		marginTop: theme.spacing(4),
	},
}));

const Dashboard = () => {
	const classes = useStyles();
	const [error, setError] = useState('');
	const { currentUser, logout } = useAuth();
	const history = useHistory();
	async function handleLogout() {
		setError('');
		try {
			await logout();
			history.push('/login');
		} catch (error) {
			setError(error.message);
		}
	}
	return (
		<>
			<Grid container spacing={3} className={classes.profileClass}>
				<Grid item xs={12} sm={2}></Grid>
				<Grid item xs={12} sm={8}>
					<Typography component='h1' variant='h5'>
						Profile
					</Typography>

					{error && <Alert variant='danger'>{error}</Alert>}
					<Typography component='h1' variant='h5'>
						<strong>Email: </strong> {currentUser && currentUser.email}
					</Typography>
					<Typography component='h1' variant='h5'>
						<Link to='/updateportfolio'>Update</Link>
					</Typography>
				</Grid>
				<Grid item xs={12} sm={8}></Grid>
				<div>
					<Button variant='contained' color='secondary' onClick={handleLogout}>
						Log Out
					</Button>
				</div>
			</Grid>
		</>
	);
};

export default Dashboard;
