import React, { useEffect, useState } from 'react';
import { Menu, Tooltip } from 'antd';
import './style.css';
import { Link } from 'react-router-dom';
import info_icon from '../../Static/Images/information-line.svg';

const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const MenuSubMenu = ({ open, menues, image, title, pathName, hideText = true, imgActive }) => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }

  const menuColorChange = () => {
    const path = pathName?.split('/')[1];
    const pathArray = menues?.map(e => e?.path?.split('/')[0]);
    return pathArray?.some(p => pathName.startsWith('/' + p));
  };

  useEffect(() => {
    if (!menuColorChange()) {
      setOpenKeys([]);
    }
  }, [pathName]);

  const itemMenu = getItem(hideText ? <p className={`${menuColorChange() ? 'text-primary' : ''}`}>{title}</p> : "", 'key1', <img src={menuColorChange() ? imgActive : image} alt="" />, menues?.map((item, index) => {
    return getItem(
      <div className='flex gap-3' key={index}>
        <Link className={`${pathName.startsWith('/' + item?.path) ? 'text-primary' : ''}`} to={'/' + item?.path}>{item?.label}</Link>
        {item.tooltip && <Tooltip className='flex gap-4 z-10' title={item.tooltip}>
          <img src={info_icon} alt='' />
        </Tooltip>}
      </div>,
      index.toString()
    );
  }));

  return (
    <Menu
      className={` ${open ? 'w-[80px]' : 'w-full'} menu-submenu `}
      expandIcon={hideText}
      mode={open ? "vertical" : "inline"}
      onOpenChange={onOpenChange}
      style={{
        width: 256,
      }}
      items={[itemMenu]}
      openKeys={openKeys}
    />
  );
};

export default MenuSubMenu;
