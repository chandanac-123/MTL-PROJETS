import { Divider } from 'antd'
import React from 'react'
import InputField from '../../Components/CustomInput/InputField'
import AuthButton from '../../Components/CustomButtons/AuthButton'
import { useChangePasswordQuery } from '../../ApiQuery/Authentication/AuthQuery'
import * as Yup from 'yup';
import { useFormik } from 'formik'

const ChangePassword = () => {
    const {mutateAsync:update,isPending}=useChangePasswordQuery()

    const initialValues={
        password:'',
        new_password:'',
        confirm_password:''
    }

    const validationSchema = Yup.object({
        password: Yup.string()
          .min(3, 'Minimum 3 symbols')
          .max(50, 'Maximum 50 symbols')
          .required('Enter current password'),
          new_password: Yup.string()
          .min(3, 'Minimum 3 symbols')
          .max(50, 'Maximum 8 symbols')
          .required('New password is required'),
          confirm_password: Yup.string()
          .min(3, 'Minimum 3 symbols')
          .max(50, 'Maximum 8 symbols')
          .required('Password confirmation is required')
          .oneOf([Yup.ref('new_password')], "Password and Confirm Password didn't match"),
      });


  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: async (values,{setStatus}) => {
      try {
        const details = { 'old_password': values?.password,'new_password':values?.new_password}
        const data = await update(details)
        formik.resetForm()
      } catch (err) {
        setStatus(err?.response?.data?.message||"Somthing went wrong !")

      }
    },
  })

    return (
        <div className="h-100 w-full gap-6 rounded-lg bg-color-white p-4">
            <h1 className='text-md font-medium '>Change Password</h1>
            <Divider />
            <form onSubmit={formik.handleSubmit} noValidate>
            <div className='flex gap-4 w-full mobile:w-3/4'>
                    <label className='w-52 text-text-color-secondary font-medium '>Current Password</label>
                    <InputField
                        placeholder="Current password"
                        className="bg-search-bg-color border-none"
                        name='password'
                        errors={formik.errors.password}
                        value={formik.values.password}
                        touched={formik.touched.password}
                        handleChange={formik.handleChange}
                    />
                </div>
                <div className='flex gap-4 w-full mobile:w-3/4'>
                    <label className='w-52 text-text-color-secondary font-medium '>New Password</label>
                    <InputField
                        placeholder="New password"
                        className="bg-search-bg-color border-none"
                        name='new_password'
                        errors={formik.errors.new_password}
                        value={formik.values.new_password}
                        touched={formik.touched.new_password}
                        handleChange={formik.handleChange}
                    />
                </div>
                <div className='flex gap-4 w-full mobile:w-3/4'>
                    <label className='w-52 text-text-color-secondary font-medium'>Confirm Password</label>
                    <InputField
                        placeholder="New password"
                        className="bg-search-bg-color border-none"
                        name='confirm_password'
                        errors={formik.errors.confirm_password}
                        value={formik.values.confirm_password}
                        touched={formik.touched.confirm_password}
                        handleChange={formik.handleChange}
                    />
                </div>
                <div className='flex justify-end pt-6'>
                    <AuthButton
                        loading={isPending}
                        type='submit'
                        label="Save Changes"
                        className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                </div>
                </form>
        </div>
    )
}

export default ChangePassword