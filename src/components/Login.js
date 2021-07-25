import React, { useRef, useState, useEffect } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { login } = useAuth();
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
		// validation

		try {
			setError('');
			setloading(true);
			await login(emailRef.current.value, passwordRef.current.value);
			// history.push('/');
			setSubmitting(true);
		} catch (error) {
			setError('Fail to log in');
		}

		setloading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Log in for admin</h2>
					{/* kada refresujemo stranicu nas currentUser je nula */}
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' ref={passwordRef} required />
						</Form.Group>
						<p>Must have at list 6 caracters</p>
						<Button className='w-100 mt-5' type='submit' disabled={loading}>
							Log in
						</Button>
						<div className='w-100 text-center mt-3'>
							<Link to='/forgot-password'>Forgot Password?</Link>
						</div>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Need an account? <Link to='/signup'>Sign up</Link>
			</div>
		</>
	);
};

export default Login;
