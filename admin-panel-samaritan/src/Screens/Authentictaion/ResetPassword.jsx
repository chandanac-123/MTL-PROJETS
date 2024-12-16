import Header from './Header';
import AuthButton from '../../Components/Buttons/AuthButton';
import PasswordInput from '../../Components/Inputs/PasswordInput';
import { useFormik } from 'formik';
import { resetPasswordSchema } from '../../Common/Validations';
import { useResetPasswordQuery } from '../../ApiQueries/Authentication/AuthQuerys';
import { useSearchParams } from 'react-router-dom';

const ResetPassword = () => {
  const { mutateAsync: reset_password, isPending } = useResetPasswordQuery()
  let [searchParams, setSearchParams] = useSearchParams();
  const tagValue = searchParams.get('tag')
  const otpValue = searchParams.get('otp')
  const targetValue = searchParams.get('target')

  const initialValues = {
    password: '',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      const details = {
        'password': values.password,
        'data': targetValue,
        'otp': otpValue,
        'type': tagValue,
      }
      try {
        await reset_password(details)
      } catch (error) {
        console.log('error: ', error);
      }
    }
  });

  return (
    <form className="flex flex-col items-center" onSubmit={formik.handleSubmit} noValidate>
      <Header head="Set New Password" subhead="Create a new secure password for your account" />

      <div className="w-full">
        <PasswordInput label="New Password" placeholder="Password" className="border-green" type="password" name="password" handleChange={formik.handleChange} value={formik.values.password} errors={formik?.errors?.password} touched={formik.touched.password} />
        <PasswordInput label="Confirm Password" placeholder="Password" className="border-green" type="password" name="confirmPassword" handleChange={formik.handleChange} value={formik.values.confirmPassword} errors={formik?.errors?.confirmPassword} touched={formik.touched.confirmPassword} />
        <AuthButton label="Continue" type="submit" />
      </div>
    </form>
  );
};

export default ResetPassword;
