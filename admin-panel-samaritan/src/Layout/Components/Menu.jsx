import { Link } from 'react-router-dom';
import posticon from '../../assets/post_approval.svg'
import { formatNumberToShort } from '../../Utiles/Helper';

const Menu = ({ image, label, path, pathName, hideText = false, onClick = false, postCount = 0 }) => {

  return (
    <Link className="text-text_grey font-inter font-semibold text-base inline-flex items-center gap-2 pl-1" to={path} onClick={onClick}>
      <img loading="lazy" alt="" src={!hideText && label == 'Posts Approval' && postCount != 0 ? posticon : image} />
      {hideText && <p className={`${pathName.startsWith(path ) ? 'text-red' : ''} whitespace-nowrap`}>{label}</p>}
      {hideText && label == 'Posts Approval' && postCount != 0 && <p className='bg-red ml-10 text-neutral w-[33px] h-[24px] rounded-2xl text-xs font-semibold items-center justify-center flex'>{formatNumberToShort(postCount)}</p>}
    </Link>
  );
};

export default Menu;
