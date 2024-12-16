import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../Components/CustomInput/InputField';
import { useSearchParams } from "react-router-dom";
import { useCheckValidity, useResetPasswordQuery } from '../../ApiQuery/Authentication/AuthQuery';
import AuthButton from '../../Components/CustomButtons/AuthButton';
import AuthHead from './AuthHead';

const ResetPassword = () => {

  const { mutateAsync: reset_password, isPending } = useResetPasswordQuery()
  let [searchParams, setSearchParams] = useSearchParams();
  const uidb64 = searchParams.get('uibd64')
  const token = searchParams.get('token')
  const isValid = searchParams.get('token_valid')
  const {data,isLoading, isFetching} =useCheckValidity({id: uidb64,token})

  const initialValues = {
    password: '',
    uidb64: uidb64,
    token: token
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password is required'),
    changepassword: Yup.string()
      .min(8, 'Minimum 8 symbols')
      .max(50, 'Maximum 50 symbols')
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const details = { 'password': values?.password, "token": values?.token, 'uidb64': values?.uidb64 }
        const data = await reset_password(details)
      } catch (err) {
        setStatus(err?.response?.data?.message || "Something went wrong !")

      }
    },
  })


  return (
    <form className='flex  flex-col items-center mt-20 mobile:mt-44' onSubmit={formik.handleSubmit} noValidate>
      <AuthHead head="Set New Password" subhead="Create a new secure password for your account" />

      {data &&  !data?.link_validity ? <div className="p-4 font-medium mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
      Sorry. the password reset has been expired. Please request a new link to reset your password
      </div> :
        formik.status ? <div className="p-4 font-medium mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
          {formik.status}
        </div> : ""}

      <div className='w-90'>
        <InputField
          label='New Password'
          placeholder='Password'
          type='password'
          name='password'
          errors={formik.errors.password}
          touched={formik.touched.password}
          value={formik.values.password}
          handleChange={formik.handleChange}
        />

        <InputField
          label='Confirm Password'
          placeholder='Password'
          type='password'
          name='changepassword'
          errors={formik.errors.changepassword}
          touched={formik.touched.changepassword}
          value={formik.values.changepassword}
          handleChange={formik.handleChange}
        />

        <AuthButton
          type='submit'
          loading={isPending}
          label="Save Changes" />
      </div>
    </form>

  );
};

export default ResetPassword;
