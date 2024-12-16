import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../Components/CustomInput/InputField';
import { useForgetPasswordQuery } from '../../ApiQuery/Authentication/AuthQuery';
import AuthButton from '../../Components/CustomButtons/AuthButton';
import { Link } from 'react-router-dom';
import AuthHead from './AuthHead';

const ForgetPassword = () => {
  const { mutateAsync: forgetPassword, isPending } = useForgetPasswordQuery()

  const initialValues = {
    email: '',
    redirect_url: `${window.location.origin}/reset-password`
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const data = await forgetPassword(values)
        setStatus({ success: "Sent a password reset link. Please check your Email Address" })
      } catch (err) {
        setStatus({ error: err?.response?.data?.detail?.data?.[0] ||err?.response?.data?.detail?.email?.[0]||"Something went wrong !"})
      }
    },
  })


  return (
    <form className='flex  flex-col items-center' onSubmit={formik.handleSubmit} noValidate>

      <AuthHead head="Forgot Your Password ?" subhead=" Enter your email address to reset your password." />

      {formik.status?.success && <div className="p-4 mb-4 w-90 text-sm text-primary rounded-lg bg-blue-50" role="alert">
        {formik.status?.success}
      </div>}

      {formik.status?.error && <div className="p-4 mb-4 w-90 text-sm text-red-700 rounded-lg bg-red-50" role="alert">
        {formik.status?.error}
      </div>}
      
      <div className='w-90'>
        <InputField
          label='Email Address'
          placeholder='Email'
          type='email'
          name='email'
          errors={formik.errors.email}
          touched={formik.touched.email}
          value={formik.values.email}
          handleChange={formik.handleChange}
        />
        <div className='flex'>
          <AuthButton
            type='submit'
            className='w-2/3 mb-8 bg-primary rounded-md h-10 flex items-center justify-center text-color-white'
            label="Request Reset Link"
          />
          <Link to='/' className='w-1/2 bg-color-gray rounded-md h-10 flex items-center justify-center ml-4'>
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
};

export default ForgetPassword;
