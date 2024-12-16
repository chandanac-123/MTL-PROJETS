import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Submenu = ({ menues, image, label, open, pathName, hideText = false, imgActive }) => {
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
      type
    };
  }

  const menuColorChange = () => {
    const pathArray = menues?.map(e => e?.path);
    return pathArray?.some(p => pathName.startsWith(p));
  };

  useEffect(() => {
    if (!menuColorChange()) {
      setOpenKeys([]);
    }
  }, [pathName]);

  const itemMenu = getItem(
    hideText ? <p className={`${menuColorChange() ? 'text-red' : ''}`}>{label}</p> : '',
    'key1',
    <img src={menuColorChange() ? imgActive : image} alt="" />,
    menues?.map((item, index) => {
      return getItem(
        <Link className={`${pathName.startsWith(item.path) ? 'text-red' : 'text-text_grey'}`} to={item?.path} >
          {item?.label}
        </Link>,
        index
      );
    })
  );

  return <Menu onOpenChange={onOpenChange} openKeys={openKeys} className={` ${open ? 'w-20 ml-14' : 'w-full'} menu-submenu `} expandIcon={hideText} mode={open ? 'vertical' : 'inline'} items={[itemMenu]} />;
};

export default Submenu;
