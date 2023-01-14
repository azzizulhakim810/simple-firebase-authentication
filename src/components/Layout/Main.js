import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div>
      <nav className='border-b-2 p-4 text-center text-lg'>
        <Link className='pr-5' to='/login'>Login</Link>
        <Link className='pl-5 decoration-d' to='/register'>Register</Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;