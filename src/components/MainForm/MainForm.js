import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const auth = getAuth();
const MainForm = () => {

  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmitLoader = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      
      
    }
    
    if(!/(?=(.*[!@#$%^&*()\-__+.]){1,})/.test(password)) {
      setValidated();
    }

    setValidated(true);

    // e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
    })
    .catch(error => {
      console.error(error);
    })
  }


  return (
    <div className='w-50 mx-auto'>
      <Form noValidate validated={validated} onSubmit={handleSubmitLoader} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control required onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
        <Form.Control.Feedback type="invalid">
              Please choose a email.
            </Form.Control.Feedback>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required onBlur={handlePasswordBlur} type="password" placeholder="Password" />
        <Form.Control.Feedback type="invalid">
              Please choose a password.
            </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check required type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default MainForm;