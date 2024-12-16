import Header from './Header';
import Input from '../../Components/Inputs/Input';
import AuthButton from '../../Components/Buttons/AuthButton';
import { Link } from 'react-router-dom';
import { forgetPasswordSchema } from '../../Common/Validations';
import { useFormik } from 'formik';
import { useForgotPasswordQuery } from '../../ApiQueries/Authentication/AuthQuerys';

const ForgetPassword = () => {
  const { mutateAsync: forgot_password, isPending } = useForgotPasswordQuery()

  const initialValues = {
    email: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values) => {
      const details = { 'data': values?.email }
      try {
        await forgot_password(details)
        formik.resetForm()
      } catch (error) {
        console.log('error: ', error);
      }
    }
  });

  return (
    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit} noValidate>
      <Header head="Forgot Your Password ?" subhead="Enter your email address to reset your password." />

      <div className="w-full">
        <Input label="Email Address" placeholder="Email" className="border-green" type="email" name="email" handleChange={formik.handleChange} value={formik.values.email} errors={formik?.errors?.email} touched={formik.touched.email} />
        <div className="gap-4 flex">
          <AuthButton label="Continue" type="submit" />
        </div>
      </div>

      <div className="text-center text-text_grey text-sm">
        Remembering your password?
        <Link to="/" className="px-1 text-red font-medium">
          Back to Login
        </Link>
      </div>
    </form>
  );
};

export default ForgetPassword;
