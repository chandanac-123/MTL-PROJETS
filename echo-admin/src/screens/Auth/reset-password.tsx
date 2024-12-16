'use client'
import { useResetPasswordQuery, useResetVerifyQuery } from '@/api-queries/auth/auth-queries';
import { Button } from '@/components/ui/button'
import { Password } from '@/components/ui/password'
import { resetPasswordSchema } from '@/utils/validations';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type FormValues = {
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordForm({ paramToken, inviteLink = false }: any) {
    // const paramToken = useSearchParams().get('token')
    const { mutateAsync: reset_password, isPending } = useResetPasswordQuery()
    // const { mutateAsync: verify_link, isSuccess} = useResetVerifyQuery()

    // useEffect(() => {
    //     verify_link({ 'token': paramToken })
    // }, [])

    const initialValues: FormValues = {
        password: '',
        confirmPassword: '',
    };

    const formik = useFormik<FormValues>({
        initialValues,
        validationSchema: resetPasswordSchema,
        onSubmit: async (values: any) => {
            const details = {
                'password': values?.password,
                'confirmPassword': values?.confirmPassword,
                'token': paramToken
            }
            try {
                await reset_password(details)
            } catch (error) {
            }
        }
    });

    return (

        <form onSubmit={formik.handleSubmit} noValidate className='flex flex-col w-full px-20 items-center'>
            <div className='bg-bg_secondary min-w-[520px] gap-8 rounded-xl p-8 flex flex-col'>
                <div className='flex flex-col gap-4'>
                    <Password
                        label='New Password'
                        placeholder='Enter new password'
                        type='password'
                        name='password'
                        handleChange={formik.handleChange}
                        value={formik.values.password}
                        errors={formik?.errors?.password}
                        touched={formik.touched.password} />
                    <Password
                        label='Confirm Password'
                        placeholder='Enter confirm password'
                        type='password'
                        name='confirmPassword'
                        handleChange={formik.handleChange}
                        value={formik.values.confirmPassword}
                        errors={formik?.errors?.confirmPassword}
                        touched={formik.touched.confirmPassword} />
                </div>
                <div className='flex justify-center mt-auto'>
                    <Button variant="default" label={inviteLink ? 'Create Account' : 'Change Password'} disabled={isPending} loader={true} />
                </div>
            </div>
        </form>

    )
}
