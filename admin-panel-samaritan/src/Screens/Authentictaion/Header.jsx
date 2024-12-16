import logo from '../../assets/logo.svg';

const Header = ({ head, subhead }) => {
  return (
    <div className="text-center mb-8">
      <div className="flex justify-center mb-4">
        <img loading="lazy" src={logo} alt="" />
      </div>
      <h1 className="text-text_black font-bold mb-3 text-2xl font-merri_weather">{head}</h1>
      <div className="text-base text-text_grey font-normal font-inter">{subhead}</div>
    </div>
  );
};

export default Header;
