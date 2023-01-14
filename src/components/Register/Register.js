import React from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  
  const [passwordError, setPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const handleRegistration = (event) => {
    event.preventDefault();
    setSuccessMessage(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    console.log(firstName, lastName, email, password);

    
    if(!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError('Ensure string has one special case letter')
      return;
    }

    if(!/(?=.*[0-9].*[0-9])/.test(password)) {
      setPasswordError('Ensure string has two digits')
      return;
    }

    if((!/.{8}/.test(password)) || (password.length < 10)) {
      setPasswordError('Ensure string is of length 8');
      return;
    }

    setPasswordError('');

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setSuccessMessage(true);
      form.reset();
      varifyEmail();
      updateUserName(firstName, lastName);

    })
    .catch(error => {
      console.error('error', error);
      setPasswordError(error.message);
    })


  }

  const auth = getAuth();
  const varifyEmail = () => {
    sendEmailVerification(auth.currentUser)
    .then(() => {
      alert('Please check your inbox to confirm')
    })
  }

  const updateUserName = (firstName, lastName) => {
    updateProfile(auth.currentUser, {
      displayName: (firstName + lastName)
    })
    .then(() => {
      console.log('Profile Updated');
    })
    .catch(error => {
      console.error('error', error);
    })
  }

  return (
    <div>
     <div className='w-4/6 mx-auto mt-5'>
     <h1 className='text-2xl'>Registration Form</h1>
      <Form className='shadow-lg p-5' onSubmit={handleRegistration}>

        <div className='flex justify-between items-center'>
        <Form.Group className="mb-3 mr-2" controlId="formBasicName1">
        <Form.Label>First Name</Form.Label>
        <Form.Control name='firstName' type="text" placeholder="First Name" required />
      </Form.Group>

        <Form.Group className="mb-3 ml-2" controlId="formBasicName2">
        <Form.Label>Last Name</Form.Label>
        <Form.Control name='lastName' type="text" placeholder="Last Name" required />
      </Form.Group>
        </div>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name='email' type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name='password' type="password" placeholder="Password" required />
      </Form.Group>
      <p className='text-danger'>{passwordError}</p>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" required/>
      </Form.Group>
      {successMessage && <p className='text-primary'>User Created Successfully</p>}

      <div className='flex justify-between items-center'>
      <Button variant="primary" type="submit">
        Register
      </Button>
    
      <div>
      <small>Already have an account? </small>
      <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to='/login'>
        Login.
      </Link>
      </div>
      </div>
      
    </Form>
    </div>
    </div>
  );
};

export default Register;