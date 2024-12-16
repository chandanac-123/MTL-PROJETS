import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../Components/CustomInput/InputField';
import { Link, useNavigate } from "react-router-dom";
import { useLoginQuery } from '../../ApiQuery/Authentication/AuthQuery';
import AuthButton from '../../Components/CustomButtons/AuthButton';
import AuthHead from './AuthHead';
import { Context } from '../../Utils/context/Context';
import { getInitialPath } from '../../Utils/utils';

const Login = () => {
  // const { firebaseToken } = useContext(Context);
  const navigate = useNavigate()
  const initialValues = {
    email: '',
    password: '',
  };

  const { mutateAsync: login, isPending } = useLoginQuery()

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .matches(/^(?!.*@[^,]*,)/)
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Invalid Password')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values, { setStatus }) => {
      let firebaseToken=localStorage.getItem('firebase-token')
      try {
        values.fcm_registration_id = firebaseToken
        const data = await login(values)
        if (data?.status_code === 200) {
          window.location.reload(() => {
            navigate(`/${getInitialPath()}`);
          });
        }
      } catch (err) {
        console.error(err)
        setStatus(err?.response?.data?.detail?.data?.[0] || err?.response?.data?.detail?.email?.[0] || "Something went wrong !")
      }
    },
  })

  return (
    <form className='flex  flex-col items-center' onSubmit={formik.handleSubmit} noValidate>
      <AuthHead head="Hello Again!!!" subhead="Login with your details to manage your properties" />

      {formik.status && <div className="p-4 font-medium mb-4 w-full text-sm text-red-800 rounded-lg bg-red-50 text-center" role="alert">
        {formik.status}
      </div>}

      <div className='w-90'>
        <InputField
          label='Email Address'
          placeholder='Email'
          type='email'
          name='email'
          errors={formik.errors.email}
          value={formik.values.email}
          touched={formik.touched.email}
          handleChange={formik.handleChange}
        />

        <InputField
          label='Password'
          placeholder='Password'
          type='password'
          name='password'
          errors={formik.errors.password}
          touched={formik.touched.password}
          value={formik.values.password}
          handleChange={formik.handleChange}
        />
        <AuthButton
          loading={isPending}
          type='submit'
          label='Continue'
        />
      </div>

      <div className='text-center text-secondary text-sm'>
        Trouble with logging in?
        <Link to='/forget-password' className='px-1 text-primary font-medium'>
          Request a new password
        </Link>
      </div>
    </form >

  );
};

export default Login;
