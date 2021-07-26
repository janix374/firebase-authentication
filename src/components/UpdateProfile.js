import React, { useRef, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Grid, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '0px auto',
		width: '400px',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	otherLinks: {
		marginTop: theme.spacing(2),
	},
}));

const UpdateProfile = () => {
	const classes = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { currentUser, updatePassword, updateEmail } = useAuth();
	const [error, setError] = useState('');
	const [loading, setloading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (submitting) {
			history.push('/');
		}
	}, [submitting]);

	function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('password dont match');
		}

		const promisess = [];
		setloading(true);
		setError('');

		if (emailRef.current.value !== currentUser.email) {
			promisess.push(updateEmail(emailRef.current.value));
		}
		if (passwordRef.current.value) {
			promisess.push(updatePassword(passwordRef.current.value));
		}

		Promise.all(promisess)
			.then(() => {
				history.push('/');
			})
			.catch(() => {
				setError(' Fail to update account');
			})
			.finally(() => {
				setloading(false);
			});
	}

	return (
		<>
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Update Profile
				</Typography>
				{error && <Alert severity='error'>{error}</Alert>}
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								id='email'
								label='Email Address'
								name='email'
								autoComplete='email'
								inputRef={emailRef}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='password'
								label='Password'
								type='password'
								id='password'
								autoComplete='current-password'
								inputRef={passwordRef}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant='outlined'
								required
								fullWidth
								name='confirm-password'
								label='Confirm Password'
								type='password'
								id='confirm-password'
								autoComplete='current-password'
								inputRef={passwordConfirmRef}
							/>
						</Grid>
						<Grid item xs={12}>
							<Typography component='h1' variant='h5'>
								Must have at list 6 caracters for password
							</Typography>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={loading}
					>
						Update
					</Button>
				</form>
				<Typography component='h1' variant='h5'>
					<Link to='/'>Cancel</Link>
				</Typography>
			</div>
		</>
	);
};

export default UpdateProfile;
