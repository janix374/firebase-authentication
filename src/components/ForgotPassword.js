import React, { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ForgotPassword = () => {
	const emailRef = useRef();
	const { resetPassword } = useAuth();
	const [error, setError] = useState('');
	const [loading, setloading] = useState(false);
	const [message, setMessage] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		// validation

		try {
			setMessage('');
			setError('');
			setloading(true);
			await resetPassword(emailRef.current.value);
			setMessage('Check your inbox for further instruction');
		} catch (error) {
			setError('Fail to reset password');
		}

		setloading(false);
	}

	return (
		<>
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Password Reset</h2>
					{/* kada refresujemo stranicu nas currentUser je nula */}
					{error && <Alert variant='danger'>{error}</Alert>}
					{message && <Alert variant='success'>{message}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control type='email' ref={emailRef} required />
						</Form.Group>
						<Button className='w-100 mt-5' type='submit' disabled={loading}>
							Reset Password
						</Button>
						<div className='w-100 text-center mt-3'>
							<Link to='/login'>Log in</Link>
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

export default ForgotPassword;
