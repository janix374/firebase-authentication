import React, { useRef, useState, useEffect } from 'react';
import { Avatar, Typography, TextField, Grid, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import BackupIcon from '@material-ui/icons/Backup';
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

const Signup = () => {
	const classes = useStyles();
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup, currentUser } = useAuth();
	const [error, setError] = useState('');
	const [loading, setloading] = useState(false);
	const [submitting, setSubmitting] = useState(false);
	const history = useHistory();

	useEffect(() => {
		if (submitting) {
			history.push('/');
		}
	}, [submitting]);

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('password dont match');
		}

		try {
			setError('');
			setloading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			setSubmitting(true);
		} catch (error) {
			setError('Fail to create an account');
		}
		setloading(false);
	}

	return (
		<>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<BackupIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Sign Up
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
						Sign Up
					</Button>
				</form>
				<Typography component='h1' variant='h5'>
					Already have an account? <Link to='/login'>Log in</Link>
				</Typography>
			</div>
		</>
	);
};

export default Signup;
