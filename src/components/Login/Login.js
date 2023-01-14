import {  FacebookAuthProvider, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

  const [successMessage, setSuccessMessage] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [collectEmail, setCollectEmail] = useState('');
  const [user, setUser] = useState({});

  const facebookProvider = new FacebookAuthProvider();


  const handleSignIn = (event) => {
    event.preventDefault();
    setSuccessMessage(false);

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if(!/.{8}/.test(password)) {
      setPasswordError('Enter at least 8 letters');
      return;
    }

    setPasswordError('');

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setSuccessMessage(true);
      form.reset();
    })
    .catch(error => {
      console.error('error', error);
      setPasswordError(error.message);
    })
  }

  const handleEmailBlur = (event) => {
    const email = event.target.value;
    setCollectEmail(email);
  }

  const handleResetEmail = () => {

    if(!collectEmail) {
      alert('Please enter a valid email address');
      return;
    }
    const auth = getAuth();
    sendPasswordResetEmail(auth, collectEmail)
    .then(() => {

    })
    .catch(error => {
      console.error('error', error);
    })
  }

  const auth = getAuth();
  const handleFacebookLogIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then(result => {
      const user = result.user;
      console.log(user);
      setUser(user);
    })
    .catch(error => console.error(error));
  }

  const handleFacebookLogOut = () => {
    signOut(auth)
    .then(() => {
      setUser({});
    })
    .catch(error => {
      setUser({});
    });
  }

  return (
    <div>

      <div className="w-4/6 mx-auto mt-5">
        <h1 className='text-2xl'>Login Form</h1>
        
        <div className='mb-4 mt-3'>
           { user.uid ? <button className='bg-blue-500 hover:bg-blue-800 text-white font-bold p-2 ps-3 pe-3 rounded' onClick={handleFacebookLogOut}>Facebook Log Out</button> : <button className='bg-blue-500 hover:bg-blue-800 text-white font-bold p-2 ps-3 pe-3 rounded' onClick={handleFacebookLogIn}>Facebook Login</button>
          }
          
        </div>

        <div>
          <img src={user.photoURL} alt="" />
          <h2>{user.displayName}</h2>
        </div>

  <form onSubmit={handleSignIn} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="YourName">
        Email
      </label>
      <input onBlur={handleEmailBlur} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="email" placeholder="Your Email" name='email' required/>
    </div>
    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" name='password'/>
      
      <p className="text-red-500 text-xs italic">{passwordError}</p>
      <p className="text-green-500 text-xs italic">{successMessage && <p>User has successfully logged in</p>}</p>
    
    </div>
    <div className="flex items-center justify-between">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
        Log In
      </button>
      <div>
      <small>New to this site? Please </small>
      <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" to='/register'>
        Register
      </Link>/<button onClick={handleResetEmail} className='text-red-400 hover:text-red-700 font-bold'><small>Forget?</small></button>
      </div>
    </div>
  </form>
  <p className="text-center text-gray-500 text-xs">
    &copy;2023 AH JIM. All rights reserved.
  </p>
</div>


    </div>
  );
};

export default Login;