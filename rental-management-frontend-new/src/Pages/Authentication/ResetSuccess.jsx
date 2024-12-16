import React from 'react';
import success_icon from '../../Static/Images/Success.png'
import { Link } from "react-router-dom";

const ResetSuccess = () => {


  return (
    <form className='flex flex-col items-center' noValidate>
      <div className='text-center mb-11'>
        <h1 className='text-primary font-bold mb-12 text-3xl'>RentEase.</h1>
        <img src={success_icon} alt='' className='w-32 inline-flex' />
        <h1 className='text-dark font-bold mb-3 text-2xl'>Success!!!</h1>
        <div className='text-md text-secondary font-medium'>Your password has been changed successfully. <br />
          You can now use your new password to login to your account. </div>
      </div>

      <div className='w-full'>
        <Link to='/' className='w-full mb-8 bg-primary rounded-md h-10 flex items-center justify-center text-color-white'>
          Login Now
        </Link>
      </div>
    </form>

  );
};

export default ResetSuccess;
