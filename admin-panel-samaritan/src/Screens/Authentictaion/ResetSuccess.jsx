import reset_success from '../../assets/reset-success.svg';
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from 'react-router-dom';

const ResetSuccess = () => {
  return (
    <form className="flex flex-col items-center">
      <div className="flex justify-center mb-12">
        <img loading="lazy" src={logo} alt="" />
      </div>
      <img loading="lazy" src={reset_success} alt="" className="w-32 inline-flex mb-4" />
      <h1 className="text-text_black font-bold mb-3 text-2xl font-merri_weather">Success!!!</h1>
      <div className="text-md text-text_grey font-normal mb-12">
        Your password has been changed successfully.You can
        <br /> now use your new password to login to your account.
      </div>
      <Link to="/" className="w-full mb-8 bg-green rounded-md h-10 flex items-center justify-center text-neutral">
        Login Now
      </Link>
    </form>
  );
};

export default ResetSuccess;
