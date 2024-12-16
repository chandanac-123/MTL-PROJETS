'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Password } from '@/components/ui/password'
import { loginSchema } from '@/utils/validations'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { useFirebaseUpdateQuery, useLogin } from '@/api-queries/auth/auth-queries'
import { getInitialPath } from '@/utils/helper'
import { ToastMessages } from '@/constants/toast-messages'
import useFcmToken from '@/utils/useFCMToken'
interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter()
  const { mutateAsync: login, isPending } = useLogin()
  const [valid, setValid] = useState<boolean>(false)
  const { mutateAsync: firebaseUpdate } = useFirebaseUpdateQuery()
  const { fcmToken } = useFcmToken();


  const initialValues: FormValues = {
    email: '',
    password: ''
  };

  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values: any) => {
      try {
        await login(values)
        router.push(getInitialPath())
        if (fcmToken) {
          await firebaseUpdate({ fcmToken });
        }
      } catch (error: any) {
        if (error.response.data.message == ToastMessages.INVALIED_CREDENTIAL || error.response.data.message == ToastMessages.ENTRED_EMAIL_INCORRECT)
          setValid(true)
      }
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (e.target.value.trim()) {
      setValid(false);
    }
  };

  return (
    <form onSubmit={formik.handleSubmit} noValidate className='flex flex-col w-full px-20 items-center'>
      <div className='bg-bg_secondary min-w-[520px] rounded-xl p-8 flex flex-col'>
        <div className='flex flex-col gap-4 '>
          <Input
            label='Email Address'
            placeholder='Enter email address'
            type='email'
            name="email"
            handleChange={handleChange}
            value={formik.values.email}
            errors={formik?.errors?.email}
            touched={formik.touched.email} />
          <Password
            label='Password'
            placeholder='Enter password'
            type='password'
            name="password"
            handleChange={handleChange}
            value={formik.values.password}
            errors={formik?.errors?.password}
            touched={formik.touched.password} />
          <div className='flex justify-end'>
            <Button
              variant="link"
              label='Forgot Password'
              size='sm'
              type='button'
              onClick={() => router.push('/forget-password')} />
          </div>
          {valid && <div className='flex justify-center items-center bg-bg_error text-text_error text-xs h-8 rounded-xs my-4'>
            The email or password entered is incorrect
          </div>}
        </div>
        <div className='flex justify-center my-6'>
          <Button variant="default" label='Sign In' type='submit' disabled={isPending} loader={true} />
        </div>
      </div>
    </form>
  )
}
