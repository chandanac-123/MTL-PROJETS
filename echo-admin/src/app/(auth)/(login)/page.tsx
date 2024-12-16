
import LoginForm from '@/screens/Auth/login'
import AuthHeader from '../header'

export default function Login() {

  return (
    <>
      <AuthHeader head='Login To' mainHead='Admin Panel' discription='Please enter your account details' />
      <LoginForm />
    </>
  )
}
