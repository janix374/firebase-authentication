import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, TextField, Grid, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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

const ForgotPassword = () => {
	const classes = useStyles();
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setloading] = useState(false);
	const [message, setMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setMessage('');
			setError('');
			setloading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instruction');
		} catch (error) {
			setError(error.message);
		}

		setloading(false);
	}

	return (
		<>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<AddCircleIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					Log in
				</Typography>
				{error && <Alert severity='error'>{error}</Alert>}
				{message && <Alert severity='success'>{message}</Alert>}
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
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
						disabled={loading}
					>
						Reset Password
					</Button>
				</form>
				<Typography component='h1' variant='h5' className={classes.otherLinks}>
					<Link to='/login'>Log in</Link>
				</Typography>
				<Typography component='h1' variant='h5' className={classes.otherLinks}>
					Need an account? <Link to='/signup'>Sign up</Link>
				</Typography>
			</div>
		</>
	);
};

export default ForgotPassword;
