import { Divider } from 'antd'
import InputField from '../../Components/CustomInput/InputField'
import AuthButton from '../../Components/CustomButtons/AuthButton'
import { useProfileUpdateQuery, useUserProfileGetQuery } from '../../ApiQuery/UserManagement/UserQuery'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import UploadImage from '../../Components/CustomUpload/ImageUpload'
import { useState } from 'react';
import ContinueButton from '../../Components/CustomButtons/ContinueButton';

const BasicDetails = () => {
    const [editVal, setEdit] = useState(true)
    const { data, isPending } = useUserProfileGetQuery()
    const { mutateAsync: update, isPending: updatePending } = useProfileUpdateQuery()
    const initialValues = {
        full_name: data?.full_name || "",
        email: data?.email || '',
        phone_number: data?.phone_number || '',
        profile_img: data?.profile_photo || ''
    }

    const validationSchema = Yup.object().shape({
        full_name: Yup.string()
            .matches(/^[A-Za-z\s]+$/, 'Only letters and spaces are allowed')
            .min(3, 'Minimum 3 charecters')
            .max(50, 'Maximum 50 charecters')
            .required('This field is required'),
        email: Yup.string()
            .email('Invalid email address')
            .matches(/^(?!.*@[^,]*,)/)
            .required('Email is required'),
        phone_number: Yup.string()
            .max(10, 'Phone number is not valid')
            .matches(/^[789]\d{9,}$/, 'Phone number is not valid')
            .required('This field is required'),
    })

    const formik = useFormik({
        initialValues,
        validationSchema: validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const formData = new FormData();
            formData.append('full_name', values.full_name)
            formData.append('email', values.email)
            formData.append('phone_number', values.phone_number)
            if (typeof values?.profile_img === "object") {
                formData.append('profile_photo', values.profile_img)
            }
            setSubmitting(true)
            try {
                if (!editVal) {
                    const data = await update(formData)
                }
                setTimeout(() => {
                    setEdit(true)
                }, 500)
            } catch (error) {
                setStatus("Something went wrong !")
            }

        }
    })

    return (
        <div className="h-100 w-full  rounded-lg bg-color-white p-4">
            <h1 className='text-md font-medium '>Basic Details</h1>
            <Divider />
            <form onSubmit={formik.handleSubmit} noValidate>
                <div className='flex gap-4 w-full mobile:w-3/4 mb-8 '>
                    <label className='w-48 text-text-color-secondary font-medium '>Profile Image</label>
                    <UploadImage fileChange={(e) => formik?.setFieldValue('profile_img', e)} formik={formik} profilePic={data?.profile_photo} disabled={editVal} />
                </div>
                <div className='flex gap-4 w-full mobile:w-3/4'>
                    <label className='w-48 text-text-color-secondary font-medium '>Full Name</label>
                    <InputField
                        placeholder="Full name"
                        className="bg-search-bg-color border-none"
                        name='full_name'
                        errors={formik.errors.full_name}
                        value={formik.values.full_name}
                        touched={formik.touched.full_name}
                        handleChange={formik.handleChange}
                        disabled={editVal}
                    />
                </div>
                <div className='flex gap-4 w-full mobile:w-3/4'>
                    <label className='w-48 text-text-color-secondary font-medium '>Email Address</label>
                    <InputField
                        placeholder="Email"
                        className="bg-search-bg-color border-none"
                        name='email'
                        value={formik.values.email}
                        touched={formik.touched.email}
                        errors={formik.errors.email}
                        handleChange={formik.handleChange}
                        disabled={editVal}
                    />
                </div>
                <div className='flex gap-4 w-full mobile:w-3/4'>
                    <label className='w-48 text-text-color-secondary font-medium '>Phone Number</label>
                    <InputField
                        placeholder="Phone Number"
                        className="bg-search-bg-color border-none"
                        name='phone_number'
                        value={formik.values.phone_number}
                        touched={formik.touched.phone_number}
                        errors={formik.errors.phone_number}
                        handleChange={formik.handleChange}
                        disabled={editVal}
                    />
                </div>
                <div className='flex justify-end pt-6'>
                    {!editVal ?
                        <AuthButton
                            loading={updatePending}
                            type='submit'
                            label="Save Changes"
                            className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" /> :
                        <ContinueButton
                            onClick={() => setEdit(!editVal)}
                            label="Edit"
                            className="w-56 bg-primary rounded-md h-10 flex items-center justify-center text-color-white" />
                    }
                </div>
            </form>
        </div>
    )
}

export default BasicDetails