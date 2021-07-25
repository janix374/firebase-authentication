import React, { useRef, useState, useEffect } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Signup = () => {
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
		// validation

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('password dont match');
		}

		try {
			setError('');
			setloading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			// history.push('/login');
			setSubmitting(true);
		} catch (error) {
			setError('Fail to create an account');
		}

		setloading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Sign Up</h2>
					{/* kada refresujemo stranicu nas currentUser je nula */}
					{currentUser && currentUser.email}
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
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type='password' ref={passwordConfirmRef} required />
						</Form.Group>
						<p>Must have at list 6 caracters</p>
						<Button className='w-100 mt-5' type='submit' disabled={loading}>
							Sign Up
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				Already have an account? <Link to='/login'>Log in</Link>
			</div>
		</>
	);
};

export default Signup;
