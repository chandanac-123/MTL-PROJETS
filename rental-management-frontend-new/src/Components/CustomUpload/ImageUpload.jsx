import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import edit_icon from '../../Static/Images/edit.svg'
import close_icon from '../../Static/Images/close.svg'
import add_icon from '../../Static/Images/add-icon.svg'



const UploadImage = ({ profilePic, formik, typeAdd, fileChange ,disabled=false}) => {
  const [imageUrl, setImageUrl] = useState(false);

  useEffect(() => {
    setImageUrl(profilePic)
  }, [profilePic])

  const previewImage = () => {
    if (typeof imageUrl === 'object') {
      return URL.createObjectURL(imageUrl)
    } else {
      return profilePic
    }

  }

  const handleRemove = () => {
    formik.setFieldValue('profile_img', '')
    setImageUrl(false)
  }

  const handleChange = (e) => {
    setImageUrl(e.target.files[0])
    fileChange(e.target.files[0])
    
  }


  return (
    <div className='w-[90px] relative  h-[90px] rounded-lg border border-gray-400'>
      <input onChange={handleChange} id='img-upload' hidden type='file' accept=".png, .jpg, .jpeg" disabled={disabled} />

      <label htmlFor="img-upload" className='w-[90px] h-full flex items-center justify-center cursor-pointer'>
        {imageUrl ? <img src={previewImage()} alt="" className='w-[60px] h-20' /> : <PlusOutlined />}
      </label>
      <div className='flex absolute -bottom-3 -translate-x-1/2  left-1/2 justify-center text-center -mt-6'>
        <button onClick={handleRemove} type='button' ><img src={typeAdd ? "" : close_icon} alt='' className="" /></button>
        <label htmlFor='img-upload' className='cursor-pointer'><img src={typeAdd ? add_icon : edit_icon} alt='' className="" /></label>
      </div>
    </div>
  );
};
export default UploadImage;

