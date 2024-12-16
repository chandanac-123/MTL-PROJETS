import { Divider } from 'antd';
import Input from '../../Components/Inputs/Input';
import SubmitButton from '../../Components/Buttons/SubmitButton';
import right_arrow from '../../assets/arrow-right.svg';
import { useUserProfileQuery } from '../../ApiQueries/Authentication/AuthQuerys';
import { useFormik } from 'formik';
import CoverImageUpload from '../../Components/Upload/CoverImageUpload';
import { useProfileUpdateQuery } from '../../ApiQueries/Dashboard/DashboardQueries';
import { useState } from 'react';
import { profileUpdateSchema } from '../../Common/Validations';

const BasicDetails = () => {
  const { data, isFetching } = useUserProfileQuery();
  const { mutateAsync: profileupdate, isPending } = useProfileUpdateQuery()
  const [updateImg, setUpdateImg] = useState(data?.profile?.profile_pic)

  const initialValues = {
    fullName: data?.profile?.full_name || '',
    email: data?.profile?.email || '',
    phone: data?.profile?.mobile || ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: profileUpdateSchema,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit: async (values) => {
      const details = {
        'name': values?.fullName,
        'email': values?.email,
        'mobile': values?.phone,
        'profilePic': updateImg
      }
      try {
        await profileupdate(details)
      } catch (error) {
        console.log('error: ', error);
      }
    }
  });

  return (
    <div className=" outline outline-1 rounded-lg w-full outline-outline_grey">
      <h3 className="text-head_grey font-semibold text-base pl-8 pt-8">Basic Details</h3>
      <Divider />
      <form className="p-8" onSubmit={formik.handleSubmit} noValidate>
        <div className="flex gap-4 flex-col sm:flex-row w-full">
          <label className="w-36 text-table_text font-semibold font-inter text-sm">Avatar</label>
          <CoverImageUpload setUpdateImg={setUpdateImg} formik={formik} fileChange={(e) => formik.setFieldValue('profile', e)} image={data?.profile?.profile_pic} profileImg={true} />
        </div>
        <div className="flex w-full font-normal text-xs font-inter text-img_text sm:pl-40 mt-4">Allowed file types: png, jpg, jpeg.</div>
        <div className="flex gap-1 flex-col sm:flex-row w-full mt-6">
          <label className="w-52 text-table_text font-semibold font-inter text-sm"> Full Name </label>
          <Input className="bg-btn_grey" value={formik.values.fullName} errors={formik?.errors.fullName} touched={formik?.touched.fullName} name="fullName" handleChange={formik.handleChange} />
        </div>
        <div className="flex gap-1 flex-col sm:flex-row w-full">
          <label className="w-52 text-table_text font-semibold font-inter text-sm"> Email Address</label>
          <Input className="bg-btn_grey" value={formik.values.email} errors={formik?.errors.email} touched={formik?.touched.email} name="email" handleChange={formik.handleChange} />
        </div>
        <div className="flex gap-1 flex-col sm:flex-row w-full">
          <label className="w-52 text-table_text font-semibold font-inter text-sm"> Phone Number</label>
          <Input className="bg-btn_grey" value={formik.values.phone} errors={formik?.errors.phone} touched={formik?.touched.phone} name="phone" handleChange={formik.handleChange} />
        </div>
        <div className="flex justify-end pt-2 w-full">
          <div>
            <SubmitButton label="Save Changes" icon={right_arrow} type='submit' />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;
