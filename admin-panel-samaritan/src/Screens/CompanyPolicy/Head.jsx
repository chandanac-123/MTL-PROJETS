import { Link } from 'react-router-dom';
import logo from '../../assets/master-logo.svg';

const Head = ({ title }) => {
  return (
    <div className="bg-yellow h-80">
      <div className="flex pt-5 pl-8 pb-16">
        <img loading="lazy" src={logo} alt="" className="w-40" />
      </div>
      <div className="flex w-full text-center justify-center items-center flex-nowrap font-extrabold text-2xl text-brown">{title}</div>
    </div>
  );
};

export default Head;
