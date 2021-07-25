import React, { useRef, useState, useEffect } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const UpdateProfile = () => {
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
		// validation

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
			<Card>
				<Card.Body>
					<h2 className='text-center mb-4'>Update Profile</h2>
					{/* kada refresujemo stranicu nas currentUser je nula */}
					{currentUser && currentUser.email}
					{error && <Alert variant='danger'>{error}</Alert>}
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								ref={emailRef}
								required
								defaultValue={currentUser.email}
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								ref={passwordRef}
								required
								placeholder='Leave blank to keep the same'
							/>
						</Form.Group>
						<Form.Group id='password-confirm'>
							<Form.Label>Password Confirmation</Form.Label>
							<Form.Control type='password' ref={passwordConfirmRef} required />
						</Form.Group>
						<p>Must have at list 6 caracters</p>
						<Button className='w-100 mt-5' type='submit' disabled={loading}>
							Update
						</Button>
					</Form>
				</Card.Body>
			</Card>
			<div className='w-100 text-center mt-2'>
				<Link to='/'>Cancel</Link>
			</div>
		</>
	);
};

export default UpdateProfile;
