import AuthHeader from '../header'
import ForgetPasswordForm from '@/screens/Auth/forget-password'

export default function ForgetPassword() {
  return (
    <>
      <AuthHeader
        miniHead='Forgot Password'
        discription={`Enter your registered email address and\n we will send a link to change password`} />
      <ForgetPasswordForm />
    </>
  )
}
