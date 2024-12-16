import React from 'react';
import Header from './Header';
import Input from '../../Components/Inputs/Input';
import AuthButton from '../../Components/Buttons/AuthButton';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import { useFormik } from 'formik';
import { useLoginQuery } from '../../ApiQueries/Authentication/AuthQuerys';
import { getInitialPath } from '../../Utiles/Helper';
import { loginSchema } from '../../Common/Validations';

const Login = () => {
  const { mutateAsync: login, isPending } = useLoginQuery();
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus }) => {
      try {
        const data = await login(values);
        if (data?.data?.login_status) {
          navigate(getInitialPath());
        }
      } catch (error) {
        setStatus(error?.response?.data?.message || 'Something went wrong !');
      }
    }
  });

  return (
    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit} noValidate>
      <Header head="Hello Again!!!" subhead="Login with your details to seamlessly manage your users" />

      {formik?.status && (
        <div className="p-4 font-medium mb-4 w-full text-sm text-red rounded-lg bg-bg_red text-center" role="alert">
          {formik?.status}
        </div>
      )}

      <div className="w-full">
        <Input label="Email Address" placeholder="Email" type="email" name="email" handleChange={formik.handleChange} value={formik.values.email} errors={formik?.errors?.email} touched={formik.touched.email} />
        <PasswordInput label="Password" placeholder="Password" name="password" handleChange={formik.handleChange} value={formik.values.password} errors={formik?.errors?.password} touched={formik.touched.password} />
        <AuthButton label="Continue" type="submit" loading={isPending} />
      </div>

      <div className="text-center text-text_grey font-inter font-medium text-sm">
        Trouble with logging in?
        <Link to="/forget-password" className="px-1 text-red font-medium">
          Request a new password
        </Link>
      </div>
    </form>
  );
};

export default Login;
