import { useEffect, useState } from 'react';
import drag_icon from '../../assets/drag.svg';
import close_icon from '../../assets/close.svg';
import upload_icon from '../../assets/file-up.svg';
import edit_icon from '../../assets/edit.svg';
import { useFileUploadQuery, useProfileUpdateQuery } from '../../ApiQueries/Dashboard/DashboardQueries';

const CoverImageUpload = ({ image, formik, fileChange, disabled = false, errors, touched, profileImg = false, setUpdateImg }) => {
  const [imageUrl, setImageUrl] = useState(false);
  const { mutateAsync: fileupload, isPending } = useFileUploadQuery()
  const { mutateAsync: profileupdate, isPending:updatepending } = useProfileUpdateQuery()

  useEffect(() => {
    setImageUrl(image);
  }, [image]);

  const previewImage = () => {
    if (imageUrl && typeof imageUrl === 'object') {
      return URL.createObjectURL(imageUrl);
    } else {
      return imageUrl;
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setImageUrl(file);
    fileChange(file);
    if (profileImg) {
      const formData = new FormData();
      formData.append('file', file);
      try {
        const response = await fileupload(formData);
        const uploadedImageUrl = response.url;
        setUpdateImg(uploadedImageUrl);
        await profileupdate({ 'profilePic': uploadedImageUrl });
      } catch (error) {
        console.log('Error uploading file:', error);
      }
    }
  };

  const handleRemove = () => {
    formik.setFieldValue('coverImage', '');
    formik.setFieldValue('profile', '');
    setImageUrl(false);
  };

  return (
    <>
      {profileImg ? (
        <div className="w-[90px] relative  h-[90px] ">
          <input type="file" onChange={handleChange} id="img-upload" hidden accept=".png, .jpg, .jpeg" />
          <label htmlFor="img-upload" className="w-[90px] h-[90px] flex items-center justify-center cursor-pointer bg-btn_grey rounded-lg">
            {imageUrl ? <img loading="lazy" src={previewImage()} alt="" className="w-[90px] h-[90px] object-contain" /> : <img loading="lazy" src={upload_icon} alt=""/>}
          </label>
          <div className="flex justify-end gap-1 -mt-3 mr-2">
            {/* <button onClick={handleRemove} type="button" className='invisible'>
              <img loading="lazy" src={close_icon} alt="" className="shadow rounded-md" />
            </button> */}
            <label htmlFor="img-upload" className="cursor-pointer">
              <img loading="lazy" src={edit_icon} alt="" className="shadow rounded-md" />
            </label>
          </div>
        </div>
      ) : (
        <div className="w-full">
          {/* {imageUrl && (
            <button onClick={handleRemove} className="w-full flex justify-end" type="button">
              <img loading="lazy" src={close_icon} alt="" className="w-10" />
            </button>
          )} */}
          <label className="w-full flex items-center justify-center cursor-pointer rounded-lg p-2">
            <div className=" w-full rounded-xl outline outline-1 outline-outline_grey p-2" htmlFor="img-upload">
              <div className="flex flex-col gap-2 justify-center items-center mt-8 mb-8">
                <input type="file" onChange={handleChange} hidden accept=".png, .jpg, .jpeg" disabled={disabled} />
                {imageUrl ? <img loading="lazy" src={previewImage()} alt="" className="w-full h-48 object-contain" /> : <img loading="lazy" src={drag_icon} alt="" />}
                {!imageUrl && <h3 className="text-text_grey text-center">Choose files from computer</h3>}
                {!imageUrl && <h3 className="text-breadcrumb text-center font-normal text-xs">Image size: 636 x 368 pixels</h3>}
              </div>
            </div>
          </label>
          {touched && errors && (
            <div className="text-badge-red text-xs mt-1">
              <span role="alert">{errors}</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CoverImageUpload;
