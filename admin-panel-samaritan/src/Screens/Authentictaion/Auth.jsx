import { Outlet } from 'react-router-dom';
import auth_bg from '../../assets/auth_bg.svg';
import logo from '../../assets/logo.svg';

const Auth = () => {
  const backgroundStyle = {
    backgroundImage: `radial-gradient(circle at center, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.42) 50%), url(${auth_bg})`,
    backgroundSize: 'cover',
    // backgroundSize: 'contain',
    backgroundRepeat: ' no-repeat'
  };

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col w-full mobile:w-1/2 bg-bg_white justify-center items-center">
        <div className="flex-1 flex items-center p-5">
          <Outlet />
        </div>
        {/* <div className='text-text_grey text-center text-sm p-4'>
          Copyright © 2024 Samaritan. All rights reserved.<a href='https://metrictreelabs.com/' target='_blank'> Powered by Metric Tree Labs</a>
        </div> */}
      </div>

      <div className="hidden mobile:flex w-1/2 flex-col justify-around items-center gap-0" style={backgroundStyle}>
        <div className='flex flex-col justify-center items-center mt-20'>
          <img loading="lazy" src={logo} alt="" className="w-16 h-16 mb-4" />
          <h1 className="text-bg_white flex font-bold text-2xl font-inter">Samaritan</h1>
        </div>
        <div className=''>
          <h1 className="font-extrabold text-2xl text-center mb-5 text-bg_white font-inter">Elevate your Samaritan Experience</h1>
          <div className="text-bg_white text-center text-base font-normal font-inter">
            Seamlessly manage users, manage all the posts and orchestrate engaging <br />
            events - all from one centralized platform.Empowers your administration with <br />
            efficiency and precision, ensuring a smooth and enriching journey for every <br />
            Samaritan.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
