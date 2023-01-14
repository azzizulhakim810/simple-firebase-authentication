import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const AnotherForm = () => {

  // const[user, setUser] = useState({});
  // const googleProvider = new GoogleAuthProvider();
  // const githubProvider = new GithubAuthProvider();

//     const handleGoogleSignIn = () => {
//   signInWithPopup(auth, googleProvider)
//   .then((result) => {
//     const user = result.user;
//     setUser(user);
//     // console.log(user);
//   }) 
//   .catch((error) => {
//     console.log(error);
//   })
// }

// const handleGithubSignIn = () => {
//   signInWithPopup(auth, githubProvider)
//   .then(result => {
//     const user = result.user;
//     setUser(user);
//     // console.log(user);
//   })
//   .catch(error => {
//     console.log(error);
//   })
// }

// const handleGoogleSignOut = () => {
//   signOut(auth)
//   .then(() => {
//     setUser({});
//   })
//   .catch(error => {
//     setUser({});
//     console.log(error);
//   })
// }

// const handleEmailBlur = (e) => {
//   console.log(e.target.value);
// }
// const handlePasswordBlur = (e) => {
//   console.log(e.target.value);
// }
// const handleSubmitButton = (e) => {
//   e.preventDefault();
//   console.log('form submitted');
// }
  

    const handleRegistration = (event) => {
    event.preventDefault();
    console.log(event.target.email.value);
  }

  const handleEmailBlur = (event) => {
    const email = event.target.value;
    console.log(email);
  }

  const handlePasswordBlur = (event) => {
    const password = event.target.value;
    console.log(password); 
  }
  return (
        <div>
       
       <div className='text-center mt-5'>
       {/*
       {
        user.uid ? 
      <button onClick={handleGoogleSignOut}>Google Sign Out</button> : 
      <>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
      <button onClick={handleGithubSignIn}>Github Sign-In</button>
      </>
      }
      <h2>Name: {user.displayName}</h2>
      <small>Email: {user.email}</small> <br/>
      <img src={user.photoURL} alt="" />

       <form className='mt-5' onSubmit={handleSubmitButton}>

      <input onBlur={handleEmailBlur} type="email" name="email" id="" />
      <br />
      <input onBlur={handlePasswordBlur} type="password" name="password" id="" />
      <br />
      <input type="submit" value="submit" />
      
      </form> */}

      <form onSubmit={handleRegistration}>
        
        <input onBlur={handleEmailBlur} className='mb-2' type="email" name="email" id="" placeholder='Your Email' />
        <br />
        <input onBlur={handlePasswordBlur} className='mb-2' type="password" name="password" id="" placeholder='Your Password'/>
        <br />
        <button type="submit">Register</button>

      </form>

       </div>

      <div className='mt-5'>
        <h1 className='text-center'>
          Fill the form up & enter in the website
        </h1>

        <AnotherForm></AnotherForm>
      
      </div>

    </div>
  );
};

export default AnotherForm;