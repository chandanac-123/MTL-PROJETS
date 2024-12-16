import React from 'react'
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';
import info_icon from '../../Static/Images/information-line.svg'

const MenuCard = ({ image, title, path, pathName, hideText = false, tooltip }) => {
  return (
    <div className='flex gap-3'>
      <Link className='text-secondary font-bold inline-flex items-center gap-2 pl-1' to={path} >
        <img alt='' src={image} />{hideText && <p className={`${pathName.startsWith('/' + path)? 'text-primary' : ''} whitespace-nowrap text-base`}>{title}</p>}
      </Link>
      {tooltip && hideText && <Tooltip title={tooltip}>
        <img src={info_icon} alt='' className='w-4' />
      </Tooltip>}

    </div>
  )
}

export default MenuCard